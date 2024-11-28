import express from "express";
import orderProduct from "../controllers/orderProduct.js";

const router = express.Router();


router.get("/", orderProduct.orderProductAll);
router.post("/create", orderProduct.orderCreate);
router.put("/:id", orderProduct.orderUpdate);
router
  .route("/:id")
  .get(orderProduct.oderProductId)
  .delete(orderProduct.orderDeleteId);
export default router;
