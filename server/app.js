import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

// >> Route Imports------------------------------------------
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import adminRoutes from "./routes/admin.js";
import { createUser } from "./seeders/user.js";
import {
  createGroupChats,
  createMessages,
  createMessagesInAChat,
  createSingleChats,
} from "./seeders/chat.js";
import { faker } from "@faker-js/faker";
// **Configuration-------------------------------
const app = express();
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
app.listen(port, () => {
  console.log(
    `Server is running on port ${port} in ${process.env.NODE_ENV} mode`
  );
});

export { envMode };
