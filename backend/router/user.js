import express from 'express';
import routerUser from '../controllers/userController.js';

const router = express.Router();

router.post('/',routerUser.userAPIRegister)

export default router;