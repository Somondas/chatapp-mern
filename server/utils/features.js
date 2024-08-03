import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import { getBase64, getSockets } from "../lib/helper.js";

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
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(code).cookie("chattu-token", token, cookieOptions).json({
    success: true,
    user,
    message,
  });
};

const emitEvent = (req, event, users, data) => {
  const io = req.app.get("io");
  const usersSocket = getSockets(users);
  io.to(usersSocket).emit(event, data);
};
const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          resource_type: "auto",
          public_id: uuid(),
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });
  // Upload Files
  try {
    const result = await Promise.all(uploadPromises);
    const formattedResults = result.map((result) => {
      return {
        public_id: result.public_id,
        url: result.secure_url,
      };
    });
    return formattedResults;
  } catch (error) {
    throw new Error("Error uploading file to cloudinary ", error);
  }
};
const deletFilesFromCloudinary = async (public_ids) => {
  // Delete Files
};
export {
  connectDB,
  sendToken,
  cookieOptions,
  emitEvent,
  deletFilesFromCloudinary,
  uploadFilesToCloudinary,
};
