import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { errorMiddleware } from "./middlewares/error.js";
import { connectDB } from "./utils/features.js";
import { v4 as uuid } from "uuid";
import { getSockets } from "./lib/helper.js";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { Message } from "./models/message.js";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
// >> Route Imports------------------------------------------
import adminRoutes from "./routes/admin.js";
import chatRoutes from "./routes/chat.js";
import userRoutes from "./routes/user.js";
import { corsOptions } from "./constants/config.js";
import { socketAuthenticator } from "./middlewares/auth.js";
// **Configuration-------------------------------

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

dotenv.config({ path: "./.env" });
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

const mongoURI = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "adminSecretKey";
const userSocketIDs = new Map();
connectDB(mongoURI);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// ?? Seeders------------
// createUser(10);
// createGroupChats(10);
// createSingleChats(10);
// createMessagesInAChat("667172a359bbbdf2e3b2465c", 50);
// createMessages(10);
// console.log(users);

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use(errorMiddleware);
// io.use((socket, next) => {
//   const { cookies } = socket.request;
//   const { secretKey } = cookies;
//   console.log(secretKey);

//   if (secretKey === adminSecretKey) {
//     next();
//   } else {
//     next(new Error("Unauthorized"));
//   }
// });
io.use((socket, next) => {
  cookieParser()(
    socket.request,
    socket.request.res,
    async (err) => await socketAuthenticator(err, socket, next)
  );
});
io.on("connection", (socket) => {
  const user = socket.user;
  // console.log(user);
  userSocketIDs.set(user._id.toString(), socket.id);
  console.log(userSocketIDs);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };
    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };
    // console.log("Emitting", members);

    const memberSocket = getSockets(members);
    io.to(memberSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });
    io.to(memberSocket).emit(NEW_MESSAGE_ALERT, { chatId });
    try {
      await Message.create(messageForDB);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("A User Disconnected");
    userSocketIDs.delete(user._id.toString());
  });
});
server.listen(port, () => {
  console.log(
    `Server is running on port ${port} in ${process.env.NODE_ENV} mode`
  );
});

export { envMode, adminSecretKey, userSocketIDs };
