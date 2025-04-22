import pool from "../database/connectdatabase.js";
import { createHash } from "crypto";

/* 
{
    "fullname": "John Doe",
    "email": "john.doe@example.com",
    "phone_number": "0987654321",
    "address": "123 Main Street",
    "password": "securepassword"
}
    api postman
*/

const generateMD5 = (password) => {
  return createHash("md5").update(password).digest("hex");
};

const getAllRegister = async (req, res) => {
  try {
    const [data] = await pool.query(`SELECT * FROM user`);
    if (!data || data.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No user found",
      });
    }
    res.status(200).send({
      success: true,
      message: "SuccessFully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error retrieving users",
      error: error.message,
    });
  }
};

const userAPIRegister = async (req, res) => {
  const {
    fullname,
    email,
    phone_number,
    address,
    password,
    status = true,
  } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).send({
      success: false,
      message: "'Please provide fullname, email, and password",
    });
  }
  try {
    if (status !== undefined && typeof status !== "boolean") {
      return res.status(400).send({
        success: false,
        message: "Status must be a boolean value (true/false).",
      });
    }
    // Convert boolean status to TINYINT(1) (1 for true, 0 for false) for MySQL
    const statusTinyInt = status ? 1 : 0;

    const hasedPassword = generateMD5(password);
    const [existingUser] = await pool.query(
      "SELECT * FROM user WHERE email = ? ",
      [email]
    );
    if (existingUser.length > 0) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }
    const [data] = await pool.query(
      `
       INSERT INTO user (fullname, email , phone_number, address , password,create_at,status)
       VALUES (? , ? , ? , ?, ?,NOW(),?)
     `,
      [fullname, email, phone_number, address, hasedPassword,statusTinyInt]
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
      data: {
        id: data.insertId,
        email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error , Please connect User",
    });
  }
};
const userAPILogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(403).send({
      success: false,
      message: "Please provide email and password",
    });
  }

  try {
    const hashedPassword = generateMD5(password);
    console.log("Hashed Password (Login):", hashedPassword); // Log hashed password

    const [data] = await pool.query(
      `SELECT * FROM user WHERE email = ? AND password=?`,
      [email, hashedPassword]
    );

    if (data.length === 1) {
      const user = data[0];
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: { id: user.id, email: user.email, fullname: user.fullname },
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Error during login" });
  }
};
export default {
  getAllRegister,
  userAPIRegister,
  userAPILogin,
};
