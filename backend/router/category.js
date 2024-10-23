import express from 'express';
import tablesRouter from '../controllers/categoryControllers.js'

const router = express.Router();

router.get('/', tablesRouter.categoryTableAll);
router.post('/', tablesRouter.createCategory)


router.route('/:id')
   .get(tablesRouter.categoryTableId)
   .put(tablesRouter.updateCategory)
   .delete(tablesRouter.deleteCategory)
export default router;