import express from "express";
import routerUser from "../controllers/userController.js";
import verify from "../middleware/verifyToken.js";
import { checkRole } from "../middleware/checkRole.js";
const router = express.Router();

router.get("/", verify, checkRole(["admin"]), routerUser.getAllRegister);
router.put("/:id", verify, checkRole(["admin"]), routerUser.updateApiRegister);
router.post("/register",routerUser.userAPIRegister);
router.post("/login", verify, checkRole(["customer","admin"]), routerUser.userAPILogin);

router.post("/refresh-token", routerUser.refreshTokenAPI);

export default router;
