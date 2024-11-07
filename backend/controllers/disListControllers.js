import pool from "../database/connexion.js";
const dishListAll = async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM dishlist`);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "success disList All",
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error , Please connect disList",
    });
  }
};
const dishListID = async (req, res) => {
  try {
    const distTableId = req.params.id;
    if (!distTableId) {
      return res.status(500).send({
        success: false,
        message: "Invalid is connect",
      });
    }
    const [data] = await pool.query(
      `
    SELECT * FROM dishList WHERE id=?`,
      [distTableId]
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
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error , Please connect disList",
    });
  }
};
const createDishList = async (req, res) => {
  try {
    const { title, content , price , address } = req.body;
    if ( !title ||  !content || !price || !address) {
      return res.status(403).send({
        success: false,
        message: "Invalid is correct",
      });
    }
    const data = await pool.query(
      `
       INSERT INTO dishlist (title  , content, price, address)
       VALUES ( ? , ? , ?, ?)
     `,
      [ title, content, price, address]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "success create dishList",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error , Please connect disList",
    });
  }
};
const updateDishList = async (req, res) => {
  try {
    const updateTable = req.params.id;
    if (!updateTable) {
      return res.status(403).send({
        success: false,
        message: "403 not found",
      });
    }
    const {  title, price, content, address } = req.body;
    const [data] = await pool.query(
      ` UPDATE dishlist SET 
       
      title = ? ,
      price = ? ,
      content = ?,
      address = ?  WHERE id = ?
      `,
      [ title, price, content, address ,updateTable]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not fount",
      });
    }
    res.status(201).send({
      success: true,
      message: "success update dishList",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error , Please connect disList",
    });
  }
};
const deleteDishList = async (req, res) => {
  try {
    const deleteParamsId = req.params.id;
    if (!deleteParamsId) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    await pool.query(`DELETE FROM dishlist WHERE id=?`, [deleteParamsId]);
    res.status(200).send({
      success: true,
      message: "success delete dishList",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error , Please connect disList",
    });
  }
};

export default {
  dishListAll,
  dishListID,
  createDishList,
  updateDishList,
  deleteDishList,
};
