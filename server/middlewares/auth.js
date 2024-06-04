import { TryCatch } from "./error.js";

const isAuthenticated = TryCatch(async (req, res, next) => {
  const token = req.cookies["chattu-token"];
  console.log("cookie: ", token);
  if (!token) {
    return next(new ErrorHandler("Please Login to Access this route", 401));
  }
  next();
});

export { isAuthenticated };
