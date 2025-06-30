import express from 'express';
import disListControllers from '../controllers/disListControllers.js';
import verify from "../middleware/verifyToken.js";
import { checkRole } from "../middleware/checkRole.js";
const router = express.Router();

router.get('/',disListControllers.getDishlistAll)
router.post('/create', verify,checkRole(["admin"]),disListControllers.createDishlist)

router.route('/:id')
  .get(disListControllers.getDishlistId)
  .put(verify,checkRole(["admin"]) ,disListControllers.updateDishlistId)
  .delete(verify,checkRole(["admin"]) ,disListControllers.deleteDishlistId)

export default router;
