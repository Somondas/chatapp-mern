import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addMembers,
  getMyChats,
  getMyGroups,
  newGroupChat,
  removeMembers,
} from "../controllers/chat.js";

const app = express.Router();

// -> Secure Routes( User must be logged in)---------
app.use(isAuthenticated);
app.post("/new", newGroupChat);
app.get("/my", getMyChats);
app.get("/my/groups", getMyGroups);
app.put("/addmembers", addMembers);
app.delete("/removemember", removeMembers);
export default app;
