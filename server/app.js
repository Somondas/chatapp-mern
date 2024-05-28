import express from "express";
import userRoutes from "./routes/user.js";
import { connectDB } from "./utils/features.js";

const app = express();
const adminPassword = encodeURIComponent(process.env.ADMIN_PASSWORD);
connectDB(
  `mongodb+srv://somon:${adminPassword}@chattu.pe6yn2g.mongodb.net/?retryWrites=true&w=majority&appName=chattu`
);
app.use("/user", userRoutes);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
