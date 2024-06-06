const express = require("express");
const cors = require("cors");
const connectDB = require("./connection.js");
const authRouter = require("./Routes/AuthRoutes");
const postRouter = require("./Routes/PostRoutes");
const userRouter = require("./Routes/UserRoutes");
const commentRouter = require("./Routes/CommentsRoutes");
const adminRouter = require("./Routes/AdminRoutes");
const StatsRouter = require("./Routes/StatsRoutes");
const messageRoutes = require("./Routes/messageRoutes");

//import { app, server } from "./socket/socket.js";
const socket = require("./socket/socket.js");

//const app = express();
const port = process.env.PORT;

socket.app.use(express.json());
socket.app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:3000"],
  })
);
socket.app.options("*", cors());
connectDB();

socket.app.use("/uploads", express.static(__dirname + "/uploads"));
socket.app.use("/api/v1/auth", authRouter);
socket.app.use("/api/v1/posts", postRouter);
socket.app.use("/api/v1/users", userRouter);
socket.app.use("/api/v1/comments", commentRouter);
socket.app.use("/api/v1/admin", adminRouter);
socket.app.use("/api/v1/stats", StatsRouter);
socket.app.use("/api/v1/messages", messageRoutes);

socket.server.listen(port, () => {
  console.log(`App running on port ${port}`);
});
