import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({ path: "./.env" });

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,

  success: true,
};
const connectDB = (uri) => {
  mongoose
    .connect(uri)
    .then((data) => {
      console.log(`Connected to MongoDB: ${data.connection.host}`);
    })
    .catch((error) => {
      throw error;
    });
};

const sendToken = (res, user, code, message) => {
  const token = "fjaslfinmcasjilenfamsdcvxlkiw";
  return res.status(code).cookie("chattu-token", token, cookieOptions).json({
    success: true,
    message,
  });
};
export { connectDB, sendToken };
