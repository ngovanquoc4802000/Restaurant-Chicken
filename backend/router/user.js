import express from 'express';
import routerUser from '../controllers/userController.js';

const router = express.Router();

router.get('/',routerUser.getUserApiAll);
router.post('/',routerUser.userAPIRegister);

router.route('/:id')
   .get(routerUser.getUserApiID)
   .put(routerUser.updateUserApiId)
   .delete(routerUser.deleteUserApiId)


export default router;