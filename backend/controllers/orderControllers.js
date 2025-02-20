import pool from "../database/connexion.js";

export const getOrders = async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM order`);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "success order All",
      data: data[0],
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
    // Get order details
    const [orderResult] = await connection.query(
      `SELECT id AS id_order, address, customer_note, customer_name, customer_phone, total_price
       FROM \`order\`
       WHERE id = ?`,
      [orderId]
    );

    if (orderResult.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
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
  const { address, customer_note, customer_name, customer_phone, list_order } =
    req.body;

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

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const totalPrice = list_order.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    // Insert into order table
    const [orderResult] = await connection.query(
      "INSERT INTO `order` (address, customer_note, customer_name, customer_phone, total_price) VALUES(?, ?, ?, ?, ?)",
      [address, customer_note, customer_name, customer_phone, totalPrice]
    );

    const orderId = orderResult.insertId;

    // Insert into order_product table
    for (const item of list_order) {
      const { id_dishlist, quantity, price, note } = item;
      await connection.query(
        "INSERT INTO `order_product` (id_order, id_dishlist, quantity, price, note) VALUES(?, ?, ?, ?, ?)",
        [orderId, id_dishlist, quantity, price, note]
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

    // Update order details
    await connection.query(
      `UPDATE \`order\`
       SET address = ?, customer_note = ?, customer_name = ?, customer_phone = ?
       WHERE id = ?`,
      [address, customer_note, customer_name, customer_phone, id]
    );

    // Delete existing order details
    await connection.query(
      `DELETE FROM order_details
       WHERE id_order = ?`,
      [id]
    );

    // Insert new order details
    const orderDetailsPromises = list_order.map((detail) => {
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
  try {
    const deleteOrderId = req.params.id;
    if (!deleteOrderId) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    await pool.query(
      `
    DELETE FROM order_db
    WHERE id = ?`,
      [deleteOrderId]
    );
    res.status(200).send({
      success: true,
      message: "success delete customer",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error orderTable",
    });
  }
};
