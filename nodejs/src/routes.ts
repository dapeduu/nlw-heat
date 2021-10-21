import { AuthenticationController } from "./controllers/AuthenticationController";
import { Router } from "express";

const router = Router();

router.post("/authenticate", AuthenticationController.handle);

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
