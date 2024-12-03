import express from 'express';
import customerController from '../controllers/customerControllers.js'

const router = express.Router();

router.get('/',customerController.customerAll)
router.post('/create',customerController.createCustomer)

router.route('/:id')
  .get(customerController.customerId)
  .put(customerController.updateCustomerId)
  .delete(customerController.deleteCustomerId)

export default router;
