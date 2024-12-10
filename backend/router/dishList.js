import express from "express";
import multer from "multer";
import pool from "../database/connection.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/dishlist");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

export const upload = multer({ storage: storage });
const router = express.Router();

router.get("/", async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const data = await connection.query(`SELECT * FROM dishlist`);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "get success dishList All",
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error category",
    });
  } finally {
    connection.release();
  }
});
router.get("/api/v1/product", async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;
    const [data] = await connection.query(
      `SELECT * FROM dishlist  limit ? offset ? `,
      [+limit, +offset]
    );
    const [totalPageData] = await connection.query(
      `SELECT count(*) as count from dishlist`
    );
    const totalPage = Math.ceil(+totalPageData[0]?.count / limit);
    console.log(totalPage);
    res.status(200).send({
      success: true,
      message: "pagination dishlist success",
      data: data,
      pagination: {
        page: +page,
        limit: +limit,
        totalPage,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "lỗi phân trang",
    });
  } finally {
    connection.release();
  }
});
router.post("/image", upload.single("file"), async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const ImageName = req.file.filename;
    const { title, content, price } = req.body;
    if (!title || !content || !price || !ImageName) {
      return res.status(403).send({
        success: false,
        message: "Invalid Error",
      });
    }
    console.log(data);
    const data = await connection.query(
      `INSERT INTO dishlist
       (title,content,currency,price,image)
        VALUES(?,?,?,?,?)`,
      [title, content, "VND", price, ImageName]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "success Dish List Post ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error",
    });
  } finally {
    connection.release();
  }
});
router.get("/:id", async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const categoryId = req.params.id;
    if (!categoryId) {
      return res.status(403).send({
        success: false,
        message: "Invalid , Please connect fields",
      });
    }
    const [data] = await connection.query(
      `
       SELECT * FROM \`dishlist\` WHERE id = ?
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
      message: "success DishList",
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Kết nối thất bại",
    });
  } finally {
    connection.release();
  }
});
router.put("/:id", upload.single("file"), async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const updateDish = req.params.id;
    if (!updateDish) {
      return res.status(403).send({
        success: false,
        message: "403 not found",
      });
    }
    const update = req.file.filename;
    const { title, content, price } = req.body;
    const data = await connection.query(
      `
      UPDATE dishlist SET
      title = ? ,
      content = ?,
      currency = ?,
      price = ?,
      image = ? WHERE id = ?
      `,
      [title, content, "VND", price, update, updateDish]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "success UpdateDishList",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error Api Dishlist",
    });
  } finally {
    connection.release();
  }
});
router.delete("/:id", async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const removeCategory = req.params.id;
    if (!removeCategory) {
      return res.status(404).send({
        success: false,
        message: "404 , Not found deleteDish",
      });
    }
    await connection.query(`DELETE FROM dishlist WHERE id =?`, [removeCategory]);
    res.status(200).send({
      success: true,
      message: "Success delete Id Dish",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: true,
      message: "Error deleteDish",
    });
  } finally {
    connection.release()
  }
});

export default router;
