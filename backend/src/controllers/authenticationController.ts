import { Request, Response } from "express";
import { AuthenticationService } from "../services/authenticationService";

const AuthenticationController = {
  async handle(req: Request, res: Response) {
    const { code } = req.body;

    try {
      const result = await AuthenticationService.execute(code);
      return res.json(result);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
};

export { AuthenticationController };
