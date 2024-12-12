import pool from "../database/connection.js";
import md5 from "md5";

const getUserApiAll = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const data = await connection.query(`SELECT * FROM user_db`);
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
  } finally {
    connection.release();
  }
};

const getUserApiID = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const distTableId = req.params.id;
    if (!distTableId) {
      return res.status(500).send({
        success: false,
        message: "Invalid is connect",
      });
    }
    const [data] = await connection.query(
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
  const connection = await pool.getConnection();
  try {
    const { email, name, password, address } = req.body;

    if (!email || !name || !password || !address) {
      return res.status(403).send({
        success: false,
        message: "Invalid is correct",
      });
    }
    const data = await connection.query(
      `
       INSERT INTO user_db (email, name , password , address)
       VALUES (? , ? , ? , ?)
     `,
      [email, name, md5(password), address]
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
  } finally {
    connection.release();
  }
};

const updateUserApiId = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const updateTable = req.params.id;
    if (!updateTable) {
      return res.status(403).send({
        success: false,
        message: "403 not found",
      });
    }
    const { email, name, password, address } = req.body;
    const data = await connection.query(
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
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error , Please connect User",
    });
  } finally {
    connection.release();
  }
};

const deleteUserApiId = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const deleteParamsId = req.params.id;
    if (!deleteParamsId) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    await connection.query(`DELETE FROM user_db WHERE id=?`, [deleteParamsId]);
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
  } finally {
    connection.release();
  }
};

export default {
  userAPIRegister,
  getUserApiAll,
  getUserApiID,
  updateUserApiId,
  deleteUserApiId,
};
