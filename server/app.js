import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

// >> Route Imports------------------------------------------
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import { createUser } from "./seeders/user.js";
// **Configuration-------------------------------
const app = express();
dotenv.config({ path: "./.env" });
app.use(express.json());
app.use(cookieParser());

const mongoURI = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;
connectDB(mongoURI);
// createUser(10);
app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`Server is running on port ${4000}`);
});
