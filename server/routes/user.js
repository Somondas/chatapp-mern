import express from "express";
import {
  getMyProfile,
  login,
  logout,
  newUser,
  searchUser,
  sendRequest,
} from "../controllers/user.js";
import { singleUpload } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  loginValidator,
  registerValidator,
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
app.get("/send-request", sendRequest);

export default app;
