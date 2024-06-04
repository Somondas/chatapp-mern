import express from "express";
import userRoutes from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

// **Configuration-------------------------------
const app = express();
dotenv.config({ path: "./.env" });
app.use(express.json());
app.use(cookieParser());

const mongoURI = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;
connectDB(mongoURI);
app.use("/user", userRoutes);
app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
