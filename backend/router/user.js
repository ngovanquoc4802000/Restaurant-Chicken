import express from 'express';
import routerUser from '../controllers/userController.js';

const router = express.Router();

router.get("/",routerUser.getAllRegister);
router.put("/:id",routerUser.updateApiRegister)

router.post('/register',routerUser.userAPIRegister);
router.post('/login',routerUser.userAPILogin)

export default router;