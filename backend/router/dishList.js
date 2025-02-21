import express from "express";
import multer from "multer";
import pool from "../database/connexion.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/dishlist");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({storage: storage});
const router = express.Router();

router.get("/",async (req,res) => {
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
});
router.get("/:id", async (req,res) => {
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
      message: "success categoryId",
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error retrieving order details",
    });
  } 
})
router.post("/create",upload.single("file"), async(req,res) => {
  try {
    const img = req.file.filename;
    const { name, title , price} = req.body;
    if ( !img || !name || !title || !price) {
      return res.status(403).send({
        success: false,
        message: "Invalid Error",
      });
    }
    const data = await pool.query(
      `INSERT INTO dishlist 
      (image,name,title,currency,price) 
      VALUES(?,?,?,?,?)`,
      [img,name,title,"VND",price]
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
      message: "Error creating dishlist",
    });
  } 
});
router.put("/:id",upload.single("file"),async(req,res) => {
  try {
    const categoryTable = req.params.id;
    if (!categoryTable) {
      return res.status(403).send({
        success: false,
        message: "403 not found",
      });
    }
    const file = req.file.filename;
    const { name, title,currency,price } = req.body;
    const data = await pool.query(
      `
      UPDATE dishlist SET
      image = ? ,
      name = ?,
      title = ?,
      currency = ?,
      price = ? 
      WHERE id = ?
      `,
      [file, name, title, currency, price ,categoryTable]
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
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error Api dishlist",
    });
  } 
})
router.delete("/:id", async(req,res) => {
  try {
    const removeDishlist = req.params.id;
    if (!removeDishlist) {
      return res.status(404).send({
        success: false,
        message: "404 , Not found deleteDishlist",
      });
    }
    await pool.query(`DELETE FROM dishlist WHERE id = ?`, [removeDishlist]);
    res.status(200).send({
      success: true,
      message: "Success delete Id Dishlist",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error deleteDishlist",
    });
  } 
})
export default router;
