import { Request, Response } from "express";
import { UserService } from "../services/UserService";

const userService = new UserService();

export class UserController {
  async register(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = await userService.authenticateUser(username, password);
    if (!user) return res.status(401).json({ error: "Credenciais inválidas" });
    res.json(user);
  }

  async getNewChatUsers(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      const users = await userService.getNewChatUsers(userId);
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar usuários para novo chat" });
    }
  }
}
