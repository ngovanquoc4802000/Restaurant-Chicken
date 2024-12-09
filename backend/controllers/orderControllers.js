import pool from "../database/connexion.js";

const orderAll = async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM order_db`);
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

const oderId = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "",
      });
    }
    const [data] = await pool.query(
      `
    SELECT * FROM order_db WHERE id = ?`,
      [orderId]
    );
    if (!data) {
      return res.status(403).send({
        success: false,
        message: "403 Invalid Order",
      });
    }
    res.status(200).send({
      success: true,
      message: "hiển thị chi tiết sản phẩm Order",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error , Please connect Order",
    });
  }
};

const createOrder = async (req, res) => {
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
      `INSERT INTO order (address, customer_note, customer_name, customer_phone, total_price ) VALUES (?, ?, ?, ?, ?)`,
      [address, customer_note, customer_name, customer_phone, totalPrice]
    );

    const orderId = orderResult.insertId;

    // Insert into order_product table
    for (const item of list_order) {
      const { id_dishlist, quantity, price, note } = item;
      await connection.query(
        `INSERT INTO order_product (order_id, id_dishlist, quantity, price, note) VALUES (?, ?, ?, ?, ?)`,
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

const updateOrder = async (req, res) => {
  try {
    const updateOrder = req.params.id;
    if (!updateOrder) {
      return res.status(403).send({
        success: false,
        message: "403 not found",
      });
    }
    const {
      address,
      customer_note,
      customer_name,
      total_price,
      customer_phone,
    } = req.body;
    const data = await pool.query(
      `
        UPDATE order_db SET
        address = ? ,
        customer_note = ?,
        customer_name = ?,
        total_price = ? ,
         customer_phone = ?  WHERE id = ?
        `,
      [
        address,
        customer_note,
        customer_name,
        total_price,
        customer_phone,
        updateOrder,
      ]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "success updateOrder",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error , Please connect Order",
    });
  }
};

const deleteOrder = async (req, res) => {
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

export { orderAll, oderId, createOrder, updateOrder, deleteOrder };
