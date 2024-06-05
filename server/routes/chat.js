import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { newGroupChat } from "../controllers/chat.js";

const app = express.Router();

// -> Secure Routes( User must be logged in)---------
app.use(isAuthenticated);
app.post("/new", newGroupChat);
export default app;
