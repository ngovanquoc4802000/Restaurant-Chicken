import express from 'express';
import orderControllers from '../controllers/orderControllers.js';
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

router.get('/', orderControllers.orderAll);
router.post('/create',orderControllers.createOrder);

router.route("/:id")  
   .get(orderControllers.oderId)
   .put(orderControllers.updateOrder)
   .delete(orderControllers.deleteOrder)

export default router;