import "dotenv/config";
import express from "express";
import { router } from "./routes";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(express.json());
app.use(router);
app.use(cors);

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" }, // TODO: Config cors to accept only my apps
});

io.on("connection", (socket) => {
  console.log(`User connected on socket ${socket.id}`);
});

export { httpServer, io };
