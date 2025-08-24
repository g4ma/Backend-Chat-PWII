import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateUserInputProps {
  name: string;
  username: string;
  password: string;
}

export class UserService {
  async createUser(data: CreateUserInputProps) {
    try {
      return await prisma.user.create({
        data: {
          name: data.name,
          username: data.username,
          passwordHash: data.password,
        },
      });
    } catch (error) {
      console.error("Erro real ao criar usuário:", error);
      throw new Error("Erro ao criar usuário");
    }
  }

  async findUserByUsername(username: string) {
    return prisma.user.findUnique({ where: { username } });
  }

  async authenticateUser(username: string, password: string) {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user || user.passwordHash !== password) return null;
    return user;
  }

  async getNewChatUsers(userId: number) {
    const messages = await prisma.message.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      select: { senderId: true, receiverId: true },
    });

    const contactedIds = new Set<number>();
    messages.forEach((m) => {
      if (m.senderId !== userId) contactedIds.add(m.senderId);
      if (m.receiverId !== userId) contactedIds.add(m.receiverId);
    });

    const users = await prisma.user.findMany({
      where: {
        id: { notIn: Array.from(contactedIds).concat(userId) },
      },
      select: { id: true, name: true, username: true },
    });

    return users;
  }
}
