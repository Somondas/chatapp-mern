import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

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

export { connectDB };
