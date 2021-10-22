import { AuthenticationController } from "./controllers/authenticationController";
import { Router } from "express";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { MessageController } from "./controllers/messageController";
import { UserController } from "./controllers/userController";

const router = Router();

router.post("/authenticate", AuthenticationController.handle);

router.post("/messages", ensureAuthenticated, MessageController.create);
router.get("/messages/last", ensureAuthenticated, MessageController.getLast);

router.get("/profile", ensureAuthenticated, UserController.getUser);

router.get("/github", (req, res) => {
  return res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

router.get("/signin/callback", (req, res) => {
  const { code } = req.query;

  return res.json({ code });
});

export { router };
