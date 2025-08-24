import { Server } from "socket.io";
import { MessageService } from "../services/MessageService";

const messageService = new MessageService();

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
    });
  });
}
