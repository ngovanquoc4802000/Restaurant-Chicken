import pool from "../database/connectdatabase.js";
import dotenv from "dotenv";
dotenv.config();
import { createHash, secureHeapUsed } from "crypto";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const JWTKey = process.env.JWT_SECRET;
const JwtRefresh = process.env.JWT_REFRESH;

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
      `SELECT id, fullname, email, rule FROM "user" WHERE email = $1 AND password = $2`,
      [email, hashedPassword]
    );

    if (result.rows.length === 1) {
      const user = result.rows[0];

      const accessTokenPayload = {
        sub: user.id.toString(),
        email: user.email,
        fullname: user.fullname,
        rule: user.rule,
      };

      const refreshTokenPayload = {
        sub: user.id.toString(),
        rule: user.rule,
      };

      // Promisify jwt.sign để sử dụng async/await
        const signPromise = (payload, secret, options) => {
        return new Promise((resolve, reject) => {
          jwt.sign(payload, secret, options, (err, token) => {
            if (err) reject(err);
            resolve(token);
          });
        });
      };
      let accessToken;
      let refreshToken;
      try {
        // Tạo Access Token
        accessToken = await signPromise(accessTokenPayload, JWTKey, {
          expiresIn: "1d",
        });

        refreshToken = await signPromise(refreshTokenPayload, JwtRefresh, {
          expiresIn: "365d",
        });
      } catch (jwtError) {
        console.error("Lỗi khi tạo JWT (Access/Refresh):", jwtError.message);
        return res.status(500).json({
          success: false,
          message: "Error generating tokens.",
          error: jwtError.message,
        });
      }
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 365 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        success: true,
        message: "Login successful.",
        accessToken: accessToken,
        data: {
          id: user.id,
          email: user.email,
          fullname: user.fullname,
          rule: user.rule,
        },
      });
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

export const refreshTokenAPI = async (req, res) => {
  //.Nó trích xuất Refresh Token từ cookie.
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    console.log("No find refresh token");
    return res.status(401).send({
      success: false,
      message: "Authentication required: No refresh token found.",
    });
  }
  try {
    //.Xác thực Refresh Token (kiểm tra tính hợp lệ, chữ ký, và chưa bị blacklist/revoked).
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(refreshToken, JwtRefresh, (err, decodedData) => {
        if (err) {
          return reject(err);
        }
        resolve(decodedData);
      });
    });
    // Nếu xác thực thành công, `decoded` sẽ chứa payload của Refresh Token
    // Payload của bạn có `sub` (user ID) và `rule`
    // 3. Kiểm tra tính hợp lệ của người dùng và trạng thái blacklist (nếu có)
    // Bạn nên kiểm tra lại trong cơ sở dữ liệu xem user_id (decoded.sub) có tồn tại không,
    // và người dùng đó có bị vô hiệu hóa, bị khóa, hoặc refresh token này có bị thu hồi không.
    // Đây là nơi bạn thực hiện "blacklist/revoked" như bạn đã nói.
    const userResult = await pool.query(
      `SELECT id, fullname, email, rule FROM "user" WHERE id = $1`,
      [decoded.sub] // decoded.sub là ID của người dùng từ payload Refresh Token
    );
    if (userResult.rows.length === 0) {
      console.log(`User with ID ${decoded.sub} not found or deactivated.`);
      return res.status(403).json({
        // 403 Forbidden
        success: false,
        message: "Invalid refresh token: User not found or deactivated.",
      });
    }
    const user = userResult.rows[0];
    // --- Đến đây, Refresh Token đã được xác thực thành công và người dùng hợp lệ ---
    // Tiếp theo, bạn sẽ tạo Access Token mới và gửi về client.
    // tạo access token mới
    const accessTokenPayload = {
      sub: user.id.toString(),
      email: user.email,
      fullname: user.fullname,
      rule: user.rule,
    };
    // Tạo Access Token mới
    const newAccessToken = await new Promise((resolve, reject) => {
      jwt.sign(
        accessTokenPayload,
        JWTKey,
        { expiresIn: "1d" },
        (err, token) => {
          if (err) reject(err);
          resolve(token);
        }
      );
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "New Access Token generated.",
      accessToken: newAccessToken,
      data: {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        rule: user.rule,
      },
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.log("Refresh Token expired.");
      res.clearCookie("refreshToken"); 
      return res.status(403).json({
        success: false,
        message: "Refresh Token expired. Please log in again.",
      });
    }
    if (error.name === "JsonWebTokenError") {
      console.log("Invalid Refresh Token:", error.message);
      res.clearCookie("refreshToken"); 
      return res.status(403).json({
        success: false,
        message: "Invalid Refresh Token. Please log in again.",
      });
    }
    console.error("Error in refreshTokenAPI:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred during token refresh.",
      error: error.message,
    });
  }
};

export default {
  getAllRegister,
  userAPIRegister,
  userAPILogin,
  updateApiRegister,
  refreshTokenAPI,
};
