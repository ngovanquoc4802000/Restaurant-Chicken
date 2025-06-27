import express from "express";
import orderControllers from "../controllers/orderControllers.js";
import verify from "../middleware/verifyToken.js";
import { checkRole } from "../middleware/checkRole.js";
const router = express.Router();

router.get("/",verify,checkRole(["customer"]),orderControllers.getOrders);
router.get("/cart/:id",verify,checkRole(["customer"]),orderControllers.getOrderDetails);
router.post("/create",verify,checkRole(["customer","admin"]),orderControllers.createOrder);
router.put("/process/:id",verify,checkRole(["customer","admin"]),orderControllers.updateOrderProcess);

router
  .route("/:id")
  .put(verify,checkRole(["customer","admin"]),orderControllers.updateOrder)
  .delete(orderControllers.deleteOrder);

export default router;
