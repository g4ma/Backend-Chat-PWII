import { Server } from "socket.io";
import { MessageService } from "../services/MessageService";
import { NotificationService } from "../services/NotificationService";

const messageService = new MessageService();
const notificationService = new NotificationService();

export function chatSocket(io: Server) {
  io.on("connection", (socket) => {
    socket.on("joinRoom", ({ userId, contactId }) => {
      const roomName = [userId, contactId].sort().join("-");
      socket.join(roomName);
    });

    socket.on("sendMessage", (data) => {
      console.log("Mensagem recebida no servidor:", data);

      const { senderId, receiverId } = data;
      const roomName = [senderId, receiverId].sort().join("-");
      io.to(roomName).emit("receiveMessage", data);
      messageService.sendMessage(data);
      notificationService.sendNotifications(data.text, receiverId);
    });
  });
}
