import pool from "../database/connectdatabase.js";

export const getDishlistAll = async (req, res) => {
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
      message: "get success api All",
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
export const getDishlistId = async (req, res) => {
  try {
    const categoryId = req.params.id;
    if (!categoryId) {
      return res.status(403).send({
        success: false,
        message: "Invalid , Please connect fields",
      });
    }
    const [data] = await pool.query(
      `
       SELECT * FROM dishlist WHERE id = ?
      `,
      [categoryId]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "success dislistId",
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error retrieving category id",
    });
  }
};
export const createDishlist = async (req, res) => {
  const { category_id, name, title, currency, price, description } = req.body;
  if (!name || !title || !price) {
    return res.status(400).send({
      success: false,
      message: "Please provide name, title, and price",
    });
  }
  try {
    const data = await pool.query(
      `INSERT INTO dishlist 
      (category_id, name, title,currency, price,description) 
      VALUES(?,?,?,?,?,?)`,
      [category_id, name, title, currency || "VND", price, description]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "success api ",
      data: {
        id: data.insertId,
        ...req.body,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creating dishlist",
    });
  }
};
export const updateDishlistId = async (req, res) => {
  const dishId = req.params.id;
  const { category_id, name, title, currency, price, description } = req.body;
  if (!name || !title || !price) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, title, and price",
    });
  }
  try {
    const data = await pool.query(
      `
      UPDATE dishlist SET
      category_id = ?, name = ?, title = ?, currency = ?, price = ?, description = ? WHERE id = ?
      `,
      [category_id, name, title, currency || "VND", price, description, dishId]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "success api UpdateDishlist",
      data : {
        id: dishId, ...req.body
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error Api dishlist",
    });
  }
};
export const deleteDishlistId = async (req, res) => {
  const removeDishlist = req.params.id;
  try {
    const data = await pool.query(`DELETE FROM dishlist WHERE id = ?`, [removeDishlist]);
    if (!removeDishlist) {
      return res.status(404).send({
        success: false,
        message: "404 , Not found deleteDishlist",
      });
    }
    res.status(200).send({
      success: true,
      message: "Success delete Id Dishlist",
      data: {
        id: removeDishlist
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error deleteDishlist",
    });
  }
};

export default {
  getDishlistAll,
  getDishlistId,
  createDishlist,
  updateDishlistId,
  deleteDishlistId,
};
