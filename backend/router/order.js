import express from "express";
import {
  getOrders,
  createOrder,
  getOrderDetails,
  updateOrder,
  deleteOrder,
} from "../controllers/orderControllers.js";
const router = express.Router();

router.get("/", getOrders);
router.post("/create", createOrder);

router.route("/:id").get(getOrderDetails).put(updateOrder).delete(deleteOrder);

export default router;
