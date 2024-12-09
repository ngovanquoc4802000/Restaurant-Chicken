import express from "express";
import {
  orderAll,
  createOrder,
  oderId,
  updateOrder,
  deleteOrder,
} from "../controllers/orderControllers.js";
const router = express.Router();

router.get("/", orderAll);
router.post("/create", createOrder);

router.route("/:id").get(oderId).put(updateOrder).delete(deleteOrder);

export default router;
