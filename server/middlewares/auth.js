import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";
import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies["chattu-token"];
  //   console.log("cookie: ", token);
  if (!token) {
    return next(new ErrorHandler("Please Login to Access this route", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  //   console.log(decodedData);

  req.user = decodedData._id;

  next();
};

export { isAuthenticated };
