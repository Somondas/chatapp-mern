import express from "express";
import {
  getMyProfile,
  login,
  logout,
  newUser,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getMyNotifications,
  getMyFriends,
} from "../controllers/user.js";
import { singleUpload } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  acceptRequestValidator,
  loginValidator,
  registerValidator,
  sendRequestValidator,
  validateHandler,
} from "../lib/validator.js";

const app = express.Router();

app.post("/new", singleUpload, registerValidator(), validateHandler, newUser);
app.post("/login", loginValidator(), validateHandler, login);

// -> Secure Routes( User must be logged in)---------
app.use(isAuthenticated);
app.get("/me", getMyProfile);
app.get("/logout", logout);
app.get("/search", searchUser);
app.put(
  "/send-request",
  sendRequestValidator(),
  validateHandler,
  sendFriendRequest
);
app.put(
  "/accept-request",
  acceptRequestValidator(),
  validateHandler,
  acceptFriendRequest
);
app.get("/notifications", getMyNotifications);

app.get("/friends", getMyFriends);

export default app;
