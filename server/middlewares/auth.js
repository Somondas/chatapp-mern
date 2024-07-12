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
const adminOnly = (req, res, next) => {
  const token = req.cookies["chattu-admin-token"];

  if (!token)
    return next(new ErrorHandler("Only Admin can access this route", 401));

  const secretKey = jwt.verify(token, process.env.JWT_SECRET);

  const isMatched = secretKey === adminSecretKey;

  if (!isMatched)
    return next(new ErrorHandler("Only Admin can access this route", 401));

  next();
};
const socketAuthenticator = async (err, socket, next) => {
  try {
    if (err) return next(err);
    const authToken = socket.request.cookies.token;
  } catch (error) {
    return next(new ErrorHandler("Please login to access this route", 401));
  }
};
export { isAuthenticated, adminOnly, socketAuthenticator };
