import pool from "../database/connectdatabase.js";
import dotenv from "dotenv";
dotenv.config();
import { createHash } from "crypto";
import jwt from "jsonwebtoken";

const JWTKey = process.env.JWT_SECRET;

const generateMD5 = (password) => {
  return createHash("md5").update(password).digest("hex");
};

const formatDbTimestamp = () => {
  return new Date().toISOString();
};

export const getAllRegister = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, fullname, email, phone_number, address, create_at, status FROM "user"`
    );

    if (!result.rows || result.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No user found.",
      });
    }

    res.status(200).send({
      success: true,
      message: "Successfully retrieved all users.",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error in getAllRegister:", error);
    res.status(500).send({
      success: false,
      message: "Error retrieving users.",
      error: error.message,
    });
  }
};

export const userAPIRegister = async (req, res) => {
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
      message: "Please provide fullname, email, and password.",
    });
  }

  if (status !== undefined && typeof status !== "boolean") {
    return res.status(400).send({
      success: false,
      message: "Status must be a boolean value (true/false).",
    });
  }

  try {
    const hashedPassword = generateMD5(password);

    const existingUserResult = await pool.query(
      `SELECT id FROM "user" WHERE email = $1`,
      [email]
    );

    if (existingUserResult.rows.length > 0) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists." });
    }

    const insertResult = await pool.query(
      `INSERT INTO "user" (fullname, email, phone_number, address, password, create_at, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, email`,
      [
        fullname,
        email,
        phone_number,
        address,
        hashedPassword,
        formatDbTimestamp(),
        status,
      ]
    );

    const newUser = insertResult.rows[0];

    if (!newUser) {
      return res.status(500).send({
        message: "Failed to create user: No data returned after insert.",
      });
    }

    res.status(201).send({
      success: true,
      message: "User registered successfully.",
      data: {
        id: newUser.id,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error in userAPIRegister:", error);
    if (error.code === "23505") {
      return res.status(409).send({
        success: false,
        message: "A user with this email already exists.",
        error: error.message,
      });
    } else if (error.code === "23502") {
      return res.status(400).send({
        success: false,
        message: `Missing required data: ${error.column} cannot be null.`,
        error: error.message,
      });
    }
    return res.status(500).send({
      success: false,
      message: "Error registering user.",
      error: error.message,
    });
  }
};

export const updateApiRegister = async (req, res) => {
  const updateId = req.params.id;
  const { fullname, email, phone_number, address, password, status } = req.body;

  if (!updateId) {
    return res.status(400).send({
      success: false,
      message: "User ID is required for update.",
    });
  }

  let updateFields = [];
  let queryParams = [];
  let paramIndex = 1;
  const now = formatDbTimestamp();

  if (fullname !== undefined) {
    updateFields.push(`fullname = $${paramIndex}`);
    queryParams.push(fullname);
    paramIndex++;
  }
  if (email !== undefined) {
    updateFields.push(`email = $${paramIndex}`);
    queryParams.push(email);
    paramIndex++;
  }
  if (phone_number !== undefined) {
    updateFields.push(`phone_number = $${paramIndex}`);
    queryParams.push(phone_number);
    paramIndex++;
  }
  if (address !== undefined) {
    updateFields.push(`address = $${paramIndex}`);
    queryParams.push(address);
    paramIndex++;
  }
  if (password !== undefined) {
    const hashedPassword = generateMD5(password);
    updateFields.push(`password = $${paramIndex}`);
    queryParams.push(hashedPassword);
    paramIndex++;
  }
  if (status !== undefined) {
    if (typeof status !== "boolean") {
      return res.status(400).send({
        success: false,
        message: "Status must be a boolean value (true/false).",
      });
    }
    updateFields.push(`status = $${paramIndex}`);
    queryParams.push(status);
    paramIndex++;
  }

  if (updateFields.length === 0) {
    return res.status(400).send({
      success: false,
      message: "No fields provided for update.",
    });
  }

  const whereIdParamIndex = paramIndex;
  queryParams.push(updateId);

  try {
    const existingUserCheck = await pool.query(
      `SELECT id FROM "user" WHERE id = $1`,
      [updateId]
    );
    if (existingUserCheck.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: `User with ID ${updateId} not found.`,
      });
    }

    const updateQuery = `UPDATE "user" SET ${updateFields.join(
      ", "
    )} WHERE id = $${whereIdParamIndex} RETURNING *`;
    const result = await pool.query(updateQuery, queryParams);

    if (result.rowCount === 0) {
      return res.status(200).send({
        success: false,
        message: "User data was already up to date, no changes made.",
      });
    }

    res.status(200).send({
      success: true,
      message: "User updated successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error in updateApiRegister:", error);
    if (error.code === "23505") {
      return res.status(409).send({
        success: false,
        message: "Update failed: The email provided already exists.",
        error: error.message,
      });
    } else if (error.code === "23502") {
      return res.status(400).send({
        success: false,
        message: `Missing required data or null value provided for a NOT NULL column: ${
          error.detail || error.message
        }.`,
        error: error.message,
      });
    }
    return res.status(500).send({
      success: false,
      message: "Error updating user.",
      error: error.message,
    });
  }
};

export const userAPILogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      success: false,
      message: "Please provide email and password.",
    });
  }

  try {
    const hashedPassword = generateMD5(password);

    const result = await pool.query(
      `SELECT id, fullname, email FROM "user" WHERE email = $1 AND password = $2`,
      [email, hashedPassword]
    );

    if (result.rows.length === 1) {
      /* admin: true , role:"admin" lấy từ db */
      const user = result.rows[0];

      const payload = {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
      };

      /* có 3 cái jwt.sign, jwt.verify (xác minh kiểm tra được sử dụng trong các middleWare bảo vệ router) , jwt.decode ( giải mã) */
      jwt.sign(
        payload,
        // Đảm bảo JWT_SECRET được định nghĩa ở đầu file (hoặc JWTKey nếu bạn dùng tên đó)
        // const JWTKey = process.env.JWT_SECRET;
        JWTKey,
        { expiresIn: "1h" }, // Token hết hạn sau 3 giờ
        (error, token) => {
          if (error) {
            console.error("Lỗi khi tạo JWT:", error);
            // Đã sửa lỗi cú pháp res.status.json và biến lỗi
            return res.status(500).json({
              success: false,
              message: "Error generating token.",
              error: error.message,
            });
          }
          // Nếu không có lỗi, gửi token và dữ liệu người dùng về client
          res.status(200).json({
            success: true,
            message: "Login successful.",
            token: token, // RẤT QUAN TRỌNG: Gửi JWT về client
            data: { id: user.id, email: user.email, fullname: user.fullname },
          });
        }
      );
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials." });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      success: false,
      message: "Error during login.",
      error: error.message,
    });
  }
};

export default {
  getAllRegister,
  userAPIRegister,
  userAPILogin,
  updateApiRegister,
};
