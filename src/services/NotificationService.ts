import webpush from "web-push";
import redisClient from "../config/redis";
import { Message } from "../models/Message";

webpush.setVapidDetails(
  "mailto:admin@chatbotui.com",
  process.env.VAPID_PUBLIC!,
  process.env.VAPID_PRIVATE!
);

export class NotificationService {
  async sendNotifications(data: Message) {
    const key = `subscriptions:${data.receiverId}`;
    const subs = await redisClient.sMembers(key); // pega todas as subs do usuário

    const sendPromises = subs.map(async (subString) => {
      const sub = JSON.parse(subString);

      try {
        await webpush.sendNotification(
          sub,
          JSON.stringify({
            title: "New Message",
            body: data.text,
            url: "http://localhost:5173/chat",
            chatId: data.senderId,
          })
        );
      } catch (err: any) {
        console.error("Erro ao enviar:", err);

        // Se a subscription for inválida, remove do Redis
        if (err.statusCode === 404 || err.statusCode === 410) {
          console.log("Removendo subscription inválida do Redis");
          await redisClient.sRem(key, subString);
        }
      }
    });

    await Promise.all(sendPromises);
  }
}
