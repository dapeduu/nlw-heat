import { Response, Request } from "express";
import { MessageService } from "../services/messageService";
import { io } from "../app";

const MessageController = {
  async create(req: Request, res: Response) {
    const { message } = req.body;
    const { user_id } = req;

    try {
      const result = await MessageService.create(message, user_id);

      const infoWS = {
        id: result.id,
        text: result.text,
        created_at: result.created_at,
        user: {
          id: result.user_id,
          name: result.user.name,
          avatar_url: result.user.avatar_url,
        },
      };
      io.emit("new_message", infoWS);
      return res.json(result);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  async getLast(req: Request, res: Response) {
    const { numberOfMessages } = req.query as any;
    try {
      const result = await MessageService.getLastMessages(
        Number.parseInt(numberOfMessages)
      );
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },
};

export { MessageController };
