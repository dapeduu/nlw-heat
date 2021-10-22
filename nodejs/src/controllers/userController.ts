import { Response, Request } from "express";
import { MessageService } from "../services/messageService";
import { io } from "../app";
import prismaClient from "../config/prismaClient";

const UserController = {
  async getUser(req: Request, res: Response) {
    const { userId } = req.body;

    try {
      const user = await prismaClient.user.findFirst({
        where: {
          id: userId,
        },
      });

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export { UserController };
