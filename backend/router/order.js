import express from "express";
import orderControllers from "../controllers/orderControllers.js";

const router = express.Router();

router.get("/", orderControllers.getOrders);
router.post("/create", orderControllers.createOrder);

router
  .route("/:id")
  .get(orderControllers.getOrderDetails)
  .put(orderControllers.updateOrder)
  .delete(orderControllers.deleteOrder);

export default router;
