import express from "express";
import userRoutes from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";

// **Configuration-------------------------------
const app = express();
dotenv.config({ path: "./.env" });
app.use(express.json());

const mongoURI = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;
connectDB(mongoURI);
app.use("/user", userRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
