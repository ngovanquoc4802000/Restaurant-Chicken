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
  try {
    const {
      address,
      customer_note,
      customer_name,
      total_price,
      customer_phone,
    } = req.body;
    if (
      !address ||
      !customer_note ||
      !customer_name ||
      !total_price ||
      !customer_phone
    ) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    const data = await pool.query(
      `INSERT INTO order_db
      (address, customer_note
         , customer_name 
         , total_price, customer_phone) 
         VALUES(? ,? ,? ,? ,?)
         `,
      [address, customer_note, customer_name, total_price, customer_phone]
    );
    console.log(data[0].data) 
    if (!data) {
      return res.status(403).send({
        success: false,
        message: "403 Invalid Error",
      });
    }
    res.status(200).send({ success: true, message: "tạo order thành công", data: data[0].insertId });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error order",
    });
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

export default {
  orderAll,
  oderId,
  createOrder,
  updateOrder,
  deleteOrder,
};
