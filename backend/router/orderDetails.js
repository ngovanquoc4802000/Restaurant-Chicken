import express from "express";
import orderDetails from "../controllers/orderDetails.js";
import multer from "multer";
import pool from "../database/connexion.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/order");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", orderDetails.orderDetailAll);
router.post("/create", upload.single("file"), async (req, res) => {
  try {
    const file = req.file.filename;
    const { quantity, price, note } = req.body;
    if (!quantity || !price || !note || !file) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    const data = await pool.query(
      `INSERT INTO order_product (quantity,price,note,image_product) 
         VALUES(?,?,?,?)`,
      [quantity, price, note, file]
    );
    if (!data) {
      return res.status(403).send({
        success: false,
        message: "403 Invalid Error",
      });
    }
    res
      .status(200)
      .send({ success: true, message: "tạo order thành công", data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error orderTable",
    });
  }
});

router.put("/:id", upload.single("file"), async (req, res) => {
  try {
    const updateDetails = req.params.id;
    if (!updateDetails) {
      return res.status(403).send({
        success: false,
        message: "403 not found",
      });
    }
    const file = req.file.filename;
    const { quantity, price, note } = req.body;
    const data = await pool.query(
      `
        UPDATE order_product SET
        quantity = ? ,
        price = ?,
        note = ?,
        image_product = ?  WHERE id_product = ?
        `,
      [quantity, price, note, file, updateDetails]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "success updateOrderDetails",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error Api orderDetails",
    });
  }
});

router
  .route("/:id")
  .get(orderDetails.oderDetailId)
  .put(orderDetails.updateOrderDetail)
  .delete(orderDetails.deleteOrderDetail);
export default router;
