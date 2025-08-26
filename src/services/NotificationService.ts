import webpush from "web-push";
import { subscriptions } from '../routes/NotificationRoutes';


webpush.setVapidDetails(
  "mailto:admin@chatbotui.com",
  process.env.VAPID_PUBLIC!,
  process.env.VAPID_PRIVATE!
);

// When a new message arrives (via WebSocket, DB, etc.)
export class NotificationService{
  async sendNotifications(message: string){
    const sendPromises = subscriptions.map((sub) =>
    webpush.sendNotification(sub, JSON.stringify({
      title: "New Message",
      body: message,
      url: "http://localhost:5173/chat"
    })).catch((err) => {
      console.error("Erro ao enviar:", err);
    }));
  }
}

