import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import { getBase64 } from "../lib/helper.js";

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
    message,
  });
};

const emitEvent = (req, event, users, data) => {
  console.log("Emmiting event", event);
};

const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          // folder: "chattu",
          public_id: uuid(),
          // overwrite: true,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.log("Error uploading file: ", error);
            reject(error);
          }
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
const deleteFilesFromCloudinary = async (public_ids) => {
  // Delete Files
};
export {
  connectDB,
  sendToken,
  cookieOptions,
  emitEvent,
  deleteFilesFromCloudinary,
  uploadFilesToCloudinary,
};
