import { Router } from "express";
import { NotificationController } from "../controller/NotificationController";

const router = Router();

router.post("/subscribe", NotificationController.subscribe);
router.post("/unsubscribe", NotificationController.unsubscribe);

export default router;