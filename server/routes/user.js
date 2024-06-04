import express from "express";
import { getMyProfile, login, newUser } from "../controllers/user.js";
import { singleUpload } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();

app.post("/new", singleUpload, newUser);
app.post("/login", login);

// -> Secure Routes( User must be logged in)---------

app.get("/me", isAuthenticated, getMyProfile);
export default app;
