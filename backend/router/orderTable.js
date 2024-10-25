import express from 'express';
import orderTableControllers from '../controllers/orderTableControllers.js';

const router = express.Router();

router.get('/',orderTableControllers.orderTableAll);
/* router.post('/',orderTableControllers.createOrderTable); */

router.route('/:id')
  .get(orderTableControllers.oderTableId)
  .put(orderTableControllers.updateOrderTable)
  .delete(orderTableControllers.deleteOrderTable)

export default router;