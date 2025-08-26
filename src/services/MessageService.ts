import { PrismaClient } from "@prisma/client";
import { Message } from "../models/Message";

const prisma = new PrismaClient();

export class MessageService {
  async sendMessage(data: Message) {
    return prisma.message.create({
      data: {
        senderId: data.senderId,
        receiverId: data.receiverId,
        text: data.text,
        createdAt: data.createdAt,
      },
    });
  }

  async getMessagesBetweenUsers(userId: number, contactId: number) {
    return prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: contactId },
          { senderId: contactId, receiverId: userId },
        ],
      },
      orderBy: { createdAt: "asc" },
    });
  }

  async getContactsForUser(userId: number) {
    console.log(userId);
    return prisma.user.findMany({
      where: {
        OR: [
          { messagesSent: { some: { receiverId: userId } } },
          { messagesReceived: { some: { senderId: userId } } },
        ],
      },
      select: { id: true, name: true, username: true },
    });
  }
}
