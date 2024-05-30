import express from "express";
import { login, newUser } from "../controllers/user.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

app.post("/new", singleUpload, newUser);
app.post("/login", login);

export default app;
