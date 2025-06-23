import express from "express";
import orderControllers from "../controllers/orderControllers.js";
import verify from "../middleware/verifyToken.js";
import { isAdmin, isCustomer } from "../middleware/verifyRole.js";
const router = express.Router();

router.get("/", verify, isCustomer,orderControllers.getOrders);
router.get("/cart/:id",orderControllers.getOrderDetails);
router.post("/create", orderControllers.createOrder);
router.put("/process/:id",orderControllers.updateOrderProcess);

router
  .route("/:id")
  .put(orderControllers.updateOrder)
  .delete(orderControllers.deleteOrder);

export default router;
