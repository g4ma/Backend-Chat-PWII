import webpush from "web-push";
import { subscriptions } from '../routes/NotificationRoutes';
import { Message } from "../models/Message";


webpush.setVapidDetails(
  "mailto:admin@chatbotui.com",
  process.env.VAPID_PUBLIC!,
  process.env.VAPID_PRIVATE!
);

// When a new message arrives (via WebSocket, DB, etc.)
export class NotificationService{
  async sendNotifications(data: Message){
    const sendPromises = subscriptions.map((sub) => {
    console.log("Sub do usuário: ", sub.receiverId)
    if (sub.receiverId == data.receiverId){
      console.log("Enviando notificação", data.text)
      return webpush.sendNotification(sub.subscription, JSON.stringify({
        title: "New Message",
        body: data.text,
        url: "http://localhost:5173/chat",
        chatId: data.senderId,
      })).catch((err) => {
        console.error("Erro ao enviar:", err);
      })
    }
  });
  }
}

