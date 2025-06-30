import express from 'express';
import categoryControllers from '../controllers/categoryControllers.js';
import verify from "../middleware/verifyToken.js";
import { checkRole } from "../middleware/checkRole.js";
const router = express.Router();
alo 111

router.get('/',categoryControllers.getCategoryAll)
router.post('/create', verify, checkRole(["admin"]),categoryControllers.createCategory)
router.get('/api/v1/product',categoryControllers.categoryPagination)

router.route('/:id')
  .get(categoryControllers.getCategoryId)
  .put(verify,checkRole(["admin"]),categoryControllers.updateCategoryId)
  .delete(verify,checkRole(["admin"]),categoryControllers.deleteCategoryId)

export default router;
