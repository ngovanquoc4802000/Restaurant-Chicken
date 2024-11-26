import pool from "../database/connexion.js";

const orderDetailAll = async (req, res) => {
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
      message: "success orderDetails All",
      data: data[0]
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error orderTableAll",
    });
  }
};
const oderDetailId = async (req, res) => {
  try {
    const detailId = req.params.id;
    if (!detailId) {
      return res.status(404).send({
        success: false,
        message: "",
      });
    }
    const data = await pool.query(`
    SELECT * FROM order_product WHERE id_product = ?`, [
      detailId,
    ]);
    if (!data) {
      return res.status(403).send({
        success: false,
        message: "403 Invalid",
      });
    }
    res
      .status(200)
      .send({ success: true, message: "hiển thị chi tiết sản phẩm order",
    data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error , Please connect disList",
    });
  }
};
const updateOrderDetail = async (req, res) => {
  try {
    res.json({ message: "update order thành công" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error , Please connect disList",
    });
  }
};
const deleteOrderDetail = async (req, res) => {
  try {
    const deleteDetailId = req.params.id;
    if (!deleteDetailId) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    await pool.query(`
    DELETE FROM order_product 
    WHERE id_product = ?`, 
    [deleteDetailId]);
    res.status(200).send({
      success: true,
      message: "success delete dishList",
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
  orderDetailAll,
  oderDetailId,
  updateOrderDetail,
  deleteOrderDetail,
};
