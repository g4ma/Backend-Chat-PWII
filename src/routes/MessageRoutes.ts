import { Router } from "express";
import { MessageController } from "../controller/MessageController";

const messageController = new MessageController();

const router = Router();

router.post("/", messageController.sendMessage);
router.get("/history/:userId/:contactId", messageController.getHistory);
router.get("/contacts/:userId", messageController.getContacts);

export default router;
