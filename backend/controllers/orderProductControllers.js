import pool from "../database/connexion.js";

const orderProductAll = async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM order_product`);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found ",
      });
    }
    res.status(200).send({
      success: true,
      message: "success order Product All",
      data: data[0],
      list_food: data[0]
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error order Product All",
    });
  }
};
const oderProductId = async (req, res) => {
  try {
    const detailId = req.params.id;
    if (!detailId) {
      return res.status(404).send({
        success: false,
        message: "",
      });
    }
    const [data] = await pool.query(
      `
    SELECT * FROM order_product WHERE id_dishlist = ?`,
      [detailId]
    );
    if (!data) {
      return res.status(403).send({
        success: false,
        message: "403 Invalid",
      });
    }
    res.status(200).send({
      success: true,
      message: "success show detail order Product ",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error , Please connect Order Product",
    });
  }
};

const orderCreate = async (req, res) => {
  try {
    const { quantity, price, note  } = req.body;
    if (!quantity || !price || !note ) {
      return res.status(404).send({
        success: false,
        message: "404 not found order Product",
      });
    }
    const data = await pool.query(
      `INSERT INTO order_product (quantity,price,note,id_order,id_dishlist) 
         VALUES(?,?,?,?,?) `,
      [quantity, price, note]
    );
    if (!data) {
      return res.status(403).send({
        success: false,
        message: "403 Invalid Error",
      });
    }
    res.status(200).send({
      success: true,
      message: "success order Product",
      list_food: data[0]
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error order Product",
    });
  }
};

const orderUpdate = async (req, res) => {
  try {
    const updateProduct = req.params.id;
    if (!updateProduct) {
      return res.status(403).send({
        success: false,
        message: "403 not found",
      });
    }
    const { quantity, price, note } = req.body;
    const [data] = await pool.query(
      `
        UPDATE order_product SET
        quantity = ? ,
        price = ?,
        note = ?,
     WHERE id_order = ?
        `,
      [quantity, price, note, updateProduct]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "success update Order Product",
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error Api order Product",
    });
  }
};

const orderDeleteId = async (req, res) => {
  try {
    const deleteDetailId = req.params.id;
    if (!deleteDetailId) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    await pool.query(
      `
    DELETE FROM order_product 
    WHERE id_product = ?`,
      [deleteDetailId]
    );
    res.status(200).send({
      success: true,
      message: "success delete order Product",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error delete",
    });
  }
};

export default {
  orderProductAll,
  oderProductId,
  orderCreate,
  orderUpdate,
  orderDeleteId,
};
