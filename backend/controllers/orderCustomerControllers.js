import pool from "../database/connexion.js";

const orderCustomerAll = async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM order_customer`);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "success orderCustomer All",
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
const oderCustomerId = async (req, res) => {
  try {
    const customerId = req.params.id;
    if (!customerId) {
      return res.status(404).send({
        success: false,
        message: "",
      });
    }
    const [data] = await pool.query(
      `
    SELECT * FROM order_customer WHERE id = ?`,
      [customerId]
    );
    if (!data) {
      return res.status(403).send({
        success: false,
        message: "403 Invalid customer",
      });
    }
    res.status(200).send({
      success: true,
      message: "hiển thị chi tiết sản phẩm customer",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error , Please connect Customer",
    });
  }
};
const createOrderCustomer = async (req, res) => {
  try {
    const {
      address,
      customer_note,
      customer_name,
      total_price,
      customer_phone,
    } = req.body;
    if (!address 
      || !customer_note 
      || !customer_name 
      || !total_price 
      || !customer_phone) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    const data = await pool.query(
      `INSERT INTO order_customer
      (address, customer_note
         , customer_name 
         , total_price, customer_phone) 
         VALUES(? ,? ,? ,? ,?)`,
      [address, customer_note, customer_name, total_price, customer_phone]
    );
    if (!data) {
      return res.status(403).send({
        success: false,
        message: "403 Invalid Error",
      });
    }
    res
      .status(200)
      .send({ success: true, message: "tạo order thành công", data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error orderCustomer",
    });
  }
};
const updateOrderCustomer = async (req, res) => {
  try {
    const updateCustomer = req.params.id;
    if (!updateCustomer) {
      return res.status(403).send({
        success: false,
        message: "403 not found",
      });
    }
    const { address, customer_note , customer_name, total_price, customer_phone } = req.body;
    const data = await pool.query(
      `
        UPDATE order_customer SET
        address = ? ,
        customer_note = ?,
        customer_name = ?,
        total_price = ? , customer_phone  WHERE id = ?
        `,
      [address, customer_note , customer_name, total_price, customer_phone , updateCustomer]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "success updateOrderCustomer",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error , Please connect Customer",
    });
  }
};
const deleteCustomer = async (req, res) => {
  try {
    const deleteCustomerId = req.params.id;
    if (!deleteCustomerId) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    await pool.query(
      `
    DELETE FROM order_customer 
    WHERE id = ?`,
      [deleteCustomerId]
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
  orderCustomerAll,
  oderCustomerId,
  createOrderCustomer,
  updateOrderCustomer,
  deleteCustomer,
};
