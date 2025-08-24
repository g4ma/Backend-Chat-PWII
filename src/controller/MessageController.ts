import { Request, Response } from "express";
import { MessageService } from "../services/MessageService";

const messageService = new MessageService();

export class MessageController {
  async sendMessage(req: Request, res: Response) {
    try {
      const message = await messageService.sendMessage(req.body);
      res.json(message);
    } catch {
      res.status(500).json({ error: "Erro ao enviar mensagem" });
    }
  }

  async getHistory(req: Request, res: Response) {
    const { userId, contactId } = req.params;
    console.log("getHistory");
    console.log("userId:", userId);
    console.log("contactId:", contactId);
    const messages = await messageService.getMessagesBetweenUsers(
      Number(userId),
      Number(contactId)
    );
    res.json(messages);
  }

  async getContacts(req: Request, res: Response) {
    const { userId } = req.params;
    const contacts = await messageService.getContactsForUser(Number(userId));
    res.json(contacts);
  }
}
