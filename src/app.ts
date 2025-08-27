import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import userRoutes from "./routes/UserRoutes";
import messageRoutes from "./routes/MessageRoutes";
import notificationRoutes from './routes/NotificationRoutes';
import { chatSocket } from "./socket/ChatSocket";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/messages", messageRoutes);
app.use("/notification", notificationRoutes)

chatSocket(io);

export default server;
