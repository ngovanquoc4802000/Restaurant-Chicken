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

    const now = new Date().toISOString().slice(0, 19).replace("T", " ");

    const [orderResult] = await connection.query(
      "INSERT INTO `order_table` (user_id,address, customer_note, customer_name, customer_phone, total_price, status, paid,process,create_at,update_at) VALUES(?,? ,? ,? , ?, ?, ?, ?,?, ? , ?)",
      [
        user_id,
        address,
        customer_note,
        customer_name,
        customer_phone,
        totalPrice,
        false,
        false,
        "Xử lý",
        now,
        now
      ]
    );

    const orderId = orderResult.insertId;

    // Insert into order_product table (đã sửa lỗi số lượng và thứ tự giá trị)
    for (const item of list_order) {
      const { id_dishlist, quantity, price, note } = item;
      await connection.query(
        "INSERT INTO `order_details` (quantity, price, note, id_dishlist, id_order,create_at,update_at) VALUES(?, ?, ?, ?, ?,?,?)",
        [quantity, price, note, id_dishlist, orderId,now,now]
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
    address,
    customer_note,
    customer_name,
    customer_phone,
    status = 0,
    paid = 0,
    list_order,
  } = req.body;
  const id = req.params.id;
  const connection = await pool.getConnection();

  if (
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
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    // Update order details
    const [updateResult] = await connection.query(
      `UPDATE \`order_table\`
       SET address = ?, customer_note = ?, customer_name = ?, customer_phone = ?, status = ?, paid = ?,  total_price = ?, update_at = ?  
       WHERE id = ?`,
      [
        address,
        customer_note,
        customer_name,
        customer_phone,
        status,
        paid,
        newTotalPrice,
        now,
        id,
      ]
    );
    if (updateResult.affectedRows === 0) {
      throw new Error(`No order found with id = ${id}`);
    }
    await connection.query(
      `DELETE FROM order_details
       WHERE id_order = ?`,
      [id]
    );

    const validOrderDetails = list_order.filter((detail) => {
      const quantity = parseInt(detail.quantity, 10);
      const price = parseFloat(detail.price);
      return !isNaN(quantity) && quantity > 0 && !isNaN(price) && price >= 0;
    });

    if (validOrderDetails.length === 0) {
      throw new Error("No valid order details provided.");
    }

    const orderDetailsPromises = validOrderDetails.map((detail) => {
      return connection.query(
        `INSERT INTO order_details (id_order, id_dishlist, quantity, price, note,create_at,update_at)
         VALUES (?, ?, ?, ?, ?,?,?)`,
        [
          id,
          detail.id_dishlist,
          detail.quantity,
          detail.price,
          detail.note || "",
          now,
          now
        ]
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
    console.error("❌ Error updating order:", error); // in lỗi chi tiết
    res.status(500).send({
      success: false,
      message: "Error updating order",
      error: error.message, // gửi chi tiết lỗi về Postman
    });
  } finally {
    connection.release();
  }
};

export const updateOrderProcess = async (req, res) => {
  const orderId = req.params.id;
  const steps = ["Xử lý", "Đang chờ", "Đang thực hiện", "Hoàn thành"];

  try {
    const [[order]] = await pool.query(
      `SELECT process FROM order_table WHERE id = ?`,
      [orderId]
    );
    if (!order) {
      return res
        .status(404)
        .send({ success: false, message: "Order not found" });
    }

    const currentIndex = steps.findIndex((step) => step === order.process);
    const nextStep = steps[currentIndex + 1];

    if (!nextStep) {
      return res
        .status(400)
        .send({ success: false, message: "Order already completed" });
    }
    await pool.query(`UPDATE order_table SET process = ? WHERE id = ?`, [
      nextStep,
      orderId,
    ]);

    res
      .status(200)
      .send({ success: true, message: "Order process updated", nextStep });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Server error" });
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
  updateOrderProcess,
  updateOrder,
  deleteOrder,
};
