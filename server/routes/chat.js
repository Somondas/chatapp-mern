import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addMembers,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMembers,
} from "../controllers/chat.js";

const app = express.Router();

// -> Secure Routes( User must be logged in)---------
app.use(isAuthenticated);

app.post("/new", newGroupChat);

app.get("/my", getMyChats);

app.get("/my/groups", getMyGroups);

app.put("/add-members", addMembers);

app.delete("/remove-member", removeMembers);

app.delete("/leave/:id", leaveGroup);

export default app;
