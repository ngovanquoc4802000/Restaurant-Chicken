import express from 'express';
import tablesRouter from '../controllers/categoryControllers.js'

const router = express.Router();

router.get('/', tablesRouter.categoryTableAll)
router.post('/', tablesRouter.createCategory) 
export default router;