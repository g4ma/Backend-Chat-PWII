import { Router } from "express";
import { UserController } from "../controller/UserController";

const userController = new UserController();

const router = Router();

router.get("/newchat/:userId", userController.getNewChatUsers);
router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;
