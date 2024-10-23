import express from 'express';
import disListControllers from '../controllers/disListControllers.js';

const router = express.Router();

router.get('/', disListControllers.dishListAll);
router.post('/', disListControllers.createDishList);

router.route('/:id')
  .get(disListControllers.dishListID)
  .put(disListControllers.updateDishList)
  .delete(disListControllers.deleteDishList)

export default router;
