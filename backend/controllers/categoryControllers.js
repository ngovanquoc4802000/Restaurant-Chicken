import express from "express";
import multer from "multer";
import pool from "../database/connexion.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/category");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM api_db`);
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
    res.status(500).send({
      success: false,
      message: "error category",
    });
  }
});

router.get("/api/v1/product", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;
    const [data] = await pool.query(`SELECT * FROM api_db  limit ? offset ? `, [
      +limit,
      +offset,
    ]);
    const [totalPageData] = await pool.query(
      `SELECT count(*) as count from api_db`
    );
    const totalPage = Math.ceil(+totalPageData[0]?.count / limit);
    console.log(totalPage);
    res.status(200).send({
      success: true,
      message: "pagination success",
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
  }
});
router.post("/image", upload.single("file"), async (req, res) => {
  try {
    const ImageName = req.file.filename;
    const { name, handle } = req.body;
    if (!ImageName || !name || !handle) {
      return res.status(403).send({
        success: false,
        message: "Invalid Error",
      });
    }
    const data = await pool.query(
      `INSERT INTO api_db 
      (image, name , handle) 
      VALUES(?,?,?)`,
      [ImageName, name, handle]
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
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error",
    });
  }
});
router.get("/:id", async (req, res) => {
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
       SELECT * FROM api_db WHERE id = ?
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
      message: "success categoryId",
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Kết nối thất bại",
    });
  }
});
router.put("/:id", upload.single("file"), async (req, res) => {
  try {
    const categoryTable = req.params.id;
    if (!categoryTable) {
      return res.status(403).send({
        success: false,
        message: "403 not found",
      });
    }
    const file = req.file.filename;
    const { name, handle } = req.body;
    const data = await pool.query(
      `
      UPDATE api_db SET
      image = ? ,
      name = ?,
      handle = ?
      WHERE id = ?
      `,
      [file, name, handle, categoryTable]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "success api UpdateCategory",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error Api Category",
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const removeCategory = req.params.id;
    if (!removeCategory) {
      return res.status(404).send({
        success: false,
        message: "404 , Not found deleteCategory",
      });
    }
    await pool.query(`DELETE FROM api_db WHERE id =?`, [removeCategory]);
    res.status(200).send({
      success: true,
      message: "Success delete Id category",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: true,
      message: "Error deleteCategory",
    });
  }
});

export   default router;
