import pool from "../database/connexion.js";
import md5 from "md5"

const getUserApiAll = async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM user_db`);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "success user all",
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error, Please connect User",
    });
  }
};
const getUserApiID = async (req, res) => {
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
    SELECT * FROM user_db WHERE id=?`,
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
      message: "Success getUserId",
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
const userAPIRegister = async (req, res) => {
  try {
    const { email, name, password, address } = req.body;
    
    if (!email || !name || !password || !address) {
      return res.status(403).send({
        success: false,
        message: "Invalid is correct",
      });
    }
    const data = await pool.query(
      `
       INSERT INTO user_db (email, name , password , address)
       VALUES (? , ? , ? , ?)
     `,
      [email, name, md5(password) , address]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "success create User",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error , Please connect User",
    });
  }
};
const updateUserApiId = async (req, res) => {
  try {
    const updateTable = req.params.id;
    if (!updateTable) {
      return res.status(403).send({
        success: false,
        message: "403 not found",
      });
    }
    const { email, name, password, address } = req.body;
    const data = await pool.query(
      ` UPDATE user_db SET 
      email = ? ,
      name = ? ,
      password = ?,
      address = ? WHERE id = ?
      `,
      [email, name, md5(password), address, updateTable]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not fount",
      });
    }
    res.status(200).send({
      success: true,
      message: "success update User",
      data: data[0]
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error , Please connect User",
    });
  }
};
const deleteUserApiId = async (req, res) => {
  try {
    const deleteParamsId = req.params.id;
    if (!deleteParamsId) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    await pool.query(`DELETE FROM user_db WHERE id=?`, [deleteParamsId]);
    res.status(200).send({
      success: true,
      message: "success delete User",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error , Please connect User",
    });
  }

};
export default {
  userAPIRegister,
  getUserApiAll,
  getUserApiID,
  updateUserApiId,
  deleteUserApiId,
};
