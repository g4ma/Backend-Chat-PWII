import { Server } from "socket.io";
import { MessageService } from "../services/MessageService";

const messageService = new MessageService();
const onlineUsers = new Map<number, string>();

export function chatSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log("Novo socket conectado:", socket.id);

    socket.on("register", (userId: number) => {
      onlineUsers.set(userId, socket.id);
      console.log(`Usuário ${userId} registrado com socket ${socket.id}`);
    });

    socket.on("sendMessage", async (data) => {
      const { senderId, receiverId } = data;

      await messageService.sendMessage(data);

      const emitIfOnline = (userId: number) => {
        const userSocket = onlineUsers.get(userId);
        if (userSocket) {
          io.to(userSocket).emit("receiveMessage", data);
        }
      };

      emitIfOnline(senderId);

      emitIfOnline(receiverId);

      console.log("Mensagem enviada:", data);
    });

    socket.on("disconnect", () => {
      for (const [userId, id] of onlineUsers.entries()) {
        if (id === socket.id) {
          onlineUsers.delete(userId);
          console.log(`Usuário ${userId} desconectado`);
          break;
        }
      }
    });
  });
}
