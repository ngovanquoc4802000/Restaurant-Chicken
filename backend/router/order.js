import express from "express";
import orderControllers from "../controllers/orderControllers.js";
import middleware from "../controllers/middlewareControllers.js";

const router = express.Router();

router.get("/",middleware,orderControllers.getOrders);
router.get("/cart/:id",orderControllers.getOrderDetails);
router.post("/create", orderControllers.createOrder);
router.put("/process/:id",orderControllers.updateOrderProcess);

router
  .route("/:id")
  .put(orderControllers.updateOrder)
  .delete(orderControllers.deleteOrder);

export default router;
