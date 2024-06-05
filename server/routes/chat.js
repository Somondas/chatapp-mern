import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();

// -> Secure Routes( User must be logged in)---------
app.use(isAuthenticated);

export default app;
