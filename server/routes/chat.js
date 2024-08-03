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
  removeMember,
  renameGroup,
  sendAttachments,
} from "../controllers/chat.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import {
  addMemberValidator,
  chatIdValidator,
  getMessagesValidator,
  newGroupValidator,
  removeMemberValidator,
  renameValidator,
  sendAttachmentsValidator,
  validateHandler,
} from "../lib/validator.js";

const app = express.Router();

// -> Secure Routes( User must be logged in)---------
app.use(isAuthenticated);

app.post("/new", newGroupValidator(), validateHandler, newGroupChat);

app.get("/my", getMyChats);

app.get("/my/groups", getMyGroups);

app.put("/add-members", addMemberValidator, validateHandler, addMembers);

app.delete(
  "/remove-member",
  removeMemberValidator(),
  validateHandler,
  removeMember
);

app.delete("/leave/:id", chatIdValidator(), validateHandler, leaveGroup);

//-> Send Attachment

app.post(
  "/message",
  attachmentsMulter,
  sendAttachmentsValidator(),
  validateHandler,
  sendAttachments
);

app.get("/message/:id", getMessagesValidator(), validateHandler, getMessages);

app
  .route("/:id")
  .get(chatIdValidator(), validateHandler, getChatDetails)
  .put(renameValidator(), validateHandler, renameGroup)
  .delete(chatIdValidator(), validateHandler, deleteChat);

export default app;
