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

const userAPIRegister = async (req, res) => {
  const { fullname, email, phone_number, address, password } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).send({
      success: false,
      message: "'Please provide fullname, email, and password",
    });
  }
  try {
    const hasedPassword = generateMD5(password);
    const [existingUser] = await pool.query(
      "SELECT * FROM user WHERE email = ? ",
      [email]
    );
    if(existingUser.length > 0) {
      return res.status(409).json({success: false, message: "Email already exists"});
    }
    const [data] = await pool.query(
      `
       INSERT INTO user (fullname, email , phone_number, address , password,create_at)
       VALUES (? , ? , ? , ?, ?,NOW())
     `,
      [fullname, email, phone_number, address, hasedPassword]
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
        id: data.insertId, email
      }
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

  if (!email ||!password) {
    return res.status(403).send({
      success: false,
      message: "Please provide email and password",
    });
  }
  try {
    const hasedPassword = generateMD5(password);
    const [data] = await pool.query(`SELECT * FROM user WHERE email = ? AND password=?`,[email,hasedPassword]);
    if(data.length === 1) {
      const user = data[0];
      res.status(200).json({ success: true, message: 'Login successful', data: { id: user.id, email: user.email, fullname: user.fullname } });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Error during login' });
  }
};
export default {
  userAPIRegister,
  userAPILogin,
};
