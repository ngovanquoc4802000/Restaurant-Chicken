import express from "express";
import orderControllers from '../controllers/orderControllers.js';

const router = express.Router();

router.get("/", orderControllers.getOrdersAll);
router.post("/create", orderControllers.createOrder);

router.route("/:id")
.get(orderControllers.getOrderDetailsId)
.put(orderControllers.updateOrderId)
.delete(orderControllers.deleteOrderId);

export default router;
