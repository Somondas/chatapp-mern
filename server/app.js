import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { errorMiddleware } from "./middlewares/error.js";
import { connectDB } from "./utils/features.js";
import { Server } from "socket.io";
import { createServer } from "http";

// >> Route Imports------------------------------------------
import adminRoutes from "./routes/admin.js";
import chatRoutes from "./routes/chat.js";
import userRoutes from "./routes/user.js";
// **Configuration-------------------------------

const app = express();
const server = createServer(app);
const io = new Server(server, {});

dotenv.config({ path: "./.env" });
app.use(express.json());
app.use(cookieParser());

const mongoURI = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
export const adminSecretKey = process.env.ADMIN_SECRET_KEY || "adminSecretKey";
connectDB(mongoURI);

// ?? Seeders------------
// createUser(10);
// createGroupChats(10);
// createSingleChats(10);
// createMessagesInAChat("667172a359bbbdf2e3b2465c", 50);
// createMessages(10);
// console.log(users);

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/admin", adminRoutes);
app.use(errorMiddleware);

io.on("connection", (socket) => {
  console.log("A User Connected", socket.id);

  socket.on("disconnect", () => {
    console.log("A User Disconnected");
  });
});
server.listen(port, () => {
  console.log(
    `Server is running on port ${port} in ${process.env.NODE_ENV} mode`
  );
});

export { envMode };
