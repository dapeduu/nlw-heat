import "dotenv/config";
import express from "express";
import { router } from "./routes";

const app = express();
app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () =>
  console.log(`App rodando na porta ${process.env.PORT}`)
);
