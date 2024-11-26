import express from 'express';
import orderCustomerControllers from '../controllers/orderCustomerControllers.js';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/order");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', orderCustomerControllers.orderCustomerAll);
router.post('/create',orderCustomerControllers.createOrderCustomer);

router.route("/:id")
   .get(orderCustomerControllers.oderCustomerId)
   .put(orderCustomerControllers.orderCustomerAll)
   .delete(orderCustomerControllers.deleteCustomer)

export default router;