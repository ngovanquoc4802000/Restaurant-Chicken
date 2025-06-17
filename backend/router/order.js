import express from "express";
import orderControllers from "../controllers/orderControllers.js";

const router = express.Router();

router.get("/", orderControllers.getOrders);
router.get("/cart/:id",orderControllers.getOrderDetails);
router.post("/create", orderControllers.createOrder);
router.put("/process/:id",orderControllers.updateOrderProcess);

router
  .route("/:id")
  .put(orderControllers.updateOrder)
  .delete(orderControllers.deleteOrder);

export default router;
