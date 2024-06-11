import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getMyChats, getMyGroups, newGroupChat } from "../controllers/chat.js";

const app = express.Router();

// -> Secure Routes( User must be logged in)---------
app.use(isAuthenticated);
app.post("/new", newGroupChat);
app.get("/my", getMyChats);
app.get("/my/groups", getMyGroups);
export default app;
