import { Request, Response } from "express";
import redisClient from "../config/redis";

export class NotificationController {
  static async subscribe(req: Request, res: Response) {
    try {
      const { subscription, receiverId } = req.body;

      if (!subscription || !receiverId) {
        return res.status(400).json({ error: "subscription e receiverId são obrigatórios" });
      }

      const key = `subscriptions:${receiverId}`;
      const subString = JSON.stringify(subscription);

      // Evita duplicadas: verifica se já existe no Set
      const exists = await redisClient.sIsMember(key, subString);

      if (!exists) {
        await redisClient.sAdd(key, subString);
        console.log("Nova subscription salva para", receiverId);
      }

      return res.status(201).json({ message: "Subscription salva com sucesso" });
    } catch (err) {
      console.error("Erro ao salvar subscription:", err);
      return res.status(500).json({ error: "Erro interno" });
    }
  }

  static async unsubscribe(req: Request, res: Response) {
    try {
      const { subscription, receiverId } = req.body;

      if (!subscription || !receiverId) {
        return res.status(400).json({ error: "subscription e receiverId são obrigatórios" });
      }

      const key = `subscriptions:${receiverId}`;
      const subString = JSON.stringify(subscription);

      const removed = await redisClient.sRem(key, subString);

      if (removed > 0) {
        console.log("Subscription removida para", receiverId);
        return res.status(200).json({ message: "Subscription removida com sucesso" });
      } else {
        return res.status(404).json({ message: "Subscription não encontrada" });
      }
    } catch (err) {
      console.error("Erro ao remover subscription:", err);
      return res.status(500).json({ error: "Erro interno" });
    }
  }
}
