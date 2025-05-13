import express from 'express';
import categoryControllers from '../controllers/categoryControllers.js';

const router = express.Router();

router.get('/',categoryControllers.getCategoryAll)
router.get('/api/v1/product',categoryControllers.categoryPagination)
router.post('/create',categoryControllers.createCategory)

router.route('/:id')
  .get(categoryControllers.getCategoryId)
  .put(categoryControllers.updateCategoryId)
  .delete(categoryControllers.deleteCategoryId)

export default router;
