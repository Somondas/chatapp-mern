import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addMembers,
  deleteChat,
  getChatDetails,
  getMessages,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMembers,
  renameGroup,
  sendAttachment,
} from "../controllers/chat.js";
import { attachmentsMulter } from "../middlewares/multer.js";

const app = express.Router();

// -> Secure Routes( User must be logged in)---------
app.use(isAuthenticated);

app.post("/new", newGroupChat);

app.get("/my", getMyChats);

app.get("/my/groups", getMyGroups);

app.put("/add-members", addMembers);

app.delete("/remove-member", removeMembers);

app.delete("/leave/:id", leaveGroup);

//-> Send Attachment

app.post("/message", attachmentsMulter, sendAttachment);

app.get("/message/:id", getMessages);

app.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);

export default app;
