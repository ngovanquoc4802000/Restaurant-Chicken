import pool from "../database/connexion.js";

const orderTableAll = async (req, res) => {
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
      message: "success orderTableAll",
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error orderTableAll",
    });
  }
};
const oderTableId = async (req, res) => {
  try {
    const orderParamsId = req.params.id;
    if (!orderParamsId) {
      return res.status(500).send({
        success: false,
        message: "Invalid is connect",
      });
    }
    const [data] = await pool.query(
      `
      SELECT * FROM orderdetails_db WHERE order_id=?`,
      [orderParamsId]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Success dishListId",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error , Please connect disList",
    });
  }
};
/*  const createOrderTable = async (req, res) => {
  try {
    const { order_id, img, title, price, content, order_id_danhmuc } = req.body;
    if (
      !order_id ||
      !img ||
      !title ||
      !price ||
      !content ||
      !order_id_danhmuc
    ) {
      return res.status(403).send({
        success: false,
        message: "403 not found",
      });
    }
    const data = await pool.query(
      `
    INSERT INTO orderdetails_db (order_id, img , title, price , content , order_id_danhmuc)
    VALUES(? , ? , ? , ? , ?, ?) 
    `,
      [order_id, img, title, price, content, order_id_danhmuc]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 OrderDetail is correct",
      });
    }
    res.status(200).send({
      success: true,
      message: "success createOrderDetails",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error orderTable",
    });
  }
};  */
const updateOrderTable = async (req, res) => {
  try {
    const updateTableId = req.params.id;
    if (!updateTableId) {
      return res.status(403).send({
        success: false,
        message: "403 not found",
      });
    }
    const { img, title, price, content, order_id_danhmuc } = req.body;
    const data = await pool.query(
      ` UPDATE orderdetails_db SET 
          img = ?,  
       title = ? ,
        price = ? ,
       content = ? ,
        order_id_danhmuc = ? 
 WHERE order_id = ?
        `,
      [img, title, price, content, order_id_danhmuc, updateTableId]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not fount",
      });
    }
    res.status(201).send({
      success: true,
      message: "success update orderDetails",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error , Please connect disList",
    });
  }
};
const deleteOrderTable = async (req, res) => {
  try {
    const deleteParamsId = req.params.id;
    if (!deleteParamsId) {
      return res.status(403).send({
        success: false,
        message: "403 not found",
      });
    }
    await pool.query(`DELETE FROM orderdetails_db WHERE order_id = ?`, [
      deleteParamsId,
    ]);
    res.status(200).send({
      success: true,
      message: "success delete ordertailsId",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error orderTable",
    });
  }
};
 const createOrderTable = async (req,res) => {
  try {
    const {name} = req.body;
    const image = req?.file || req.file.fieldname
    if(!name || !image) {
      return res.status(403).send({
        success: false,
        message : "403 not found"
      })
    }
    const data = await pool.query(
      `INSERT INTO order_db (name,image) VALUES (?,?)`,
      [name,image]
    );
    if(!data) {
      return res.status(404).send({
        success: false,
        message: "404 fix client"
      })
    } 
    
  } catch(error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error"
    })
  } 
}; 
export default {
  orderTableAll,
  oderTableId,
   createOrderTable,
  updateOrderTable,
  deleteOrderTable,
};
