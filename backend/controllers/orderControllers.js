import pool from "../database/connectdatabase.js";

export const getOrders = async (req, res) => {
  try {
    const [data] = await pool.query(
      `SELECT * , status, paid FROM \`order_table\``
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    const dataWithDetails = await Promise.all(
      data.map(async (item) => {
        const [details] = await pool.query(
          `SELECT id_dishlist , quantity,price,note FROM order_details WHERE id_order = ?`,
          [item.id]
        );
        return { ...item, details };
      })
    );

    res.status(200).send({
      success: true,
      message: "success order All",
      data: dataWithDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error",
    });
  }
};

export const getOrderDetails = async (req, res) => {
  const orderId = req.params.id;
  const connection = await pool.getConnection();

  try {
    const [orderResult] = await connection.query(
      `SELECT id AS id_order,
       address, customer_note, customer_name, customer_phone,
        total_price, status, paid
       FROM order_table
       WHERE id = ?`,
      [orderId]
    );

    if (orderResult.length === 0) {
      return res.status(404).send({
        success: false,
        message: `Order with Id ${orderId} not found`,
      });
    }

    const order = orderResult[0];

    // Get order details
    const [detailsResult] = await connection.query(
      `SELECT id_dishlist, quantity, price, note
       FROM order_details
       WHERE id_order = ?`,
      [orderId]
    );

    // Format the response
    const response = {
      id: order.id_order,
      address: order.address,
      customer_note: order.customer_note,
      customer_name: order.customer_name,
      customer_phone: order.customer_phone,
      total_price: order.total_price,
      status: order.status,
      paid: order.paid,
      detail: detailsResult.map((detail) => ({
        id_dishlist: detail.id_dishlist,
        quantity: detail.quantity,
        price: detail.price,
        note: detail.note,
      })),
    };

    res.status(200).send({
      success: true,
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error retrieving order details",
    });
  } finally {
    connection.release();
  }
};

export const createOrder = async (req, res) => {
  const {
    user_id,
    address,
    customer_note,
    customer_name,
    customer_phone,
    list_order,
  } = req.body;

  if (
    !user_id ||
    !address ||
    !customer_name ||
    !customer_phone ||
    !list_order ||
    !Array.isArray(list_order) ||
    list_order.length === 0
  ) {
    return res.status(400).send({
      success: false,
      message: "Invalid input data",
    });
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const totalPrice = list_order.reduce((total, item) => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity, 10);
      if (isNaN(price) || isNaN(quantity) || quantity < 0) {
        console.log(`price and quantify not is number`);
      }
      return total + price * quantity;
    }, 0);

    // Insert into order table (đã loại bỏ cột 'id')
    const [orderResult] = await connection.query(
      "INSERT INTO `order_table` (user_id,address, customer_note, customer_name, customer_phone, total_price, status, paid) VALUES(?, ?, ?, ?, ?,?, ? , ?)",
      [
        user_id,
        address,
        customer_note,
        customer_name,
        customer_phone,
        totalPrice,
        false,
        false,
      ]
    );

    const orderId = orderResult.insertId;

    // Insert into order_product table (đã sửa lỗi số lượng và thứ tự giá trị)
    for (const item of list_order) {
      const { id_dishlist, quantity, price, note } = item;
      await connection.query(
        "INSERT INTO `order_details` (quantity, price, note, id_dishlist, id_order) VALUES(?, ?, ?, ?, ?)",
        [quantity, price, note, id_dishlist, orderId]
      );
    }

    await connection.commit();

    res.status(201).send({
      success: true,
      message: "Order created successfully",
      orderId,
    });
  } catch (error) {
    await connection.rollback();
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creating order",
    });
  } finally {
    connection.release();
  }
};

export const updateOrder = async (req, res) => {
  const {
    id,
    address,
    customer_note,
    customer_name,
    customer_phone,
    status,
    paid,
    list_order,
  } = req.body;

  const connection = await pool.getConnection();

  if (
    !id ||
    !address ||
    !customer_name ||
    !customer_phone ||
    !list_order ||
    !Array.isArray(list_order) ||
    list_order.length === 0
  ) {
    return res.status(400).send({
      success: false,
      message: "Invalid input data",
    });
  }

  try {
    await connection.beginTransaction();

    const newTotalPrice = list_order.reduce((total, item) => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity, 10);
      if (isNaN(price) || isNaN(quantity) || quantity < 0) {
        console.log(`Invalid price ${item.price} or quantity ${item.quantity}`);
      }
      return total + price * quantity;
    }, 0);

    // Update order details
    await connection.query(
      `UPDATE \`order_table\`
       SET address = ?, customer_note = ?, customer_name = ?, customer_phone = ?, status = ?, paid = ?,  total_price = ?,
       WHERE id = ?`,
      [
        address,
        customer_note,
        customer_name,
        customer_phone,
        status,
        paid,
        newTotalPrice,
        id,
      ]
    );

    await connection.query(
      `DELETE FROM order_details
       WHERE id_order = ?`,
      [id]
    );

    const orderDetailsPromises = list_order.map((detail) => {
      const { id_dishlist, quantity, price, note } = detail;
      const detailQuantity = parseInt(quantity, 10);
      const detailPrice = parseFloat(price);
      if (
        isNaN(detailQuantity) ||
        detailQuantity < 1 ||
        isNaN(detailPrice) ||
        detailPrice < 0
      ) {
        console.log(
          `Invalid quantiy ${quantity} or price ${price} for Dishlist Id in update: ${id_dishlist}`
        );
      }
      return connection.query(
        `INSERT INTO order_details (id_order, id_dishlist, quantity, price, note)
         VALUES (?, ?, ?, ?, ?)`,
        [id, detail.id_dishlist, detail.quantity, detail.price, detail.note]
      );
    });

    await Promise.all(orderDetailsPromises);

    await connection.commit();

    res.status(200).send({
      success: true,
      message: "Order updated successfully",
    });
  } catch (error) {
    await connection.rollback();
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating order",
    });
  } finally {
    connection.release();
  }
};

export const deleteOrder = async (req, res) => {
  
  const deleteOrderId = req.params.id;

  const connection = await pool.getConnection();
  
  try {
    if (!deleteOrderId) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    await connection.beginTransaction();
    await connection.query(`DELETE FROM order_details WHERE id_order = ?`, [
      deleteOrderId,
    ]);
    await pool.query(
      `
    DELETE FROM order_db
    WHERE id = ?`,
      [deleteOrderId]
    );
    const [deleteResult] = await connection.query(
      `DELETE FROM order_table WHERE id = ?`,
      [deleteOrderId]
    );
    if (deleteResult.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).send({
        success: false,
        message: `Order with ID ${deleteOrderId} not found`,
      });
    }
    await connection.commit();
    res.status(200).send({
      success: true,
      message: `Order with ID ${deleteOrderId} deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error orderTable",
    });
  }
};

export default {
  getOrders,
  getOrderDetails,
  createOrder,
  updateOrder,
  deleteOrder,
};
