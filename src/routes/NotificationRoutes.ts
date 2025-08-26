import { Router, Request, Response } from "express";


export const subscriptions: any[] = [];
const router = Router();

router.post("/subscribe", (req: Request, res: Response) => {
    const subscription = req.body;
    console.log("Subscribe", subscription)
  
    // Evitar duplicadas
    const exists = subscriptions.find(
      (sub) => JSON.stringify(sub) === JSON.stringify(subscription)
    );
    if (!exists) {
      subscriptions.push(subscription);
    }
  
    console.log("Nova subscription recebida:", subscription);
    res.status(201).json({ message: "Subscription salva com sucesso" });
  });

export default router;