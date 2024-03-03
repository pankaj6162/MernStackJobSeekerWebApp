import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  // Check if token exists
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check if user associated with token exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorHandler("User Not Authorized", 401));
    }

    // Attach user object to request
    req.user = user;

    next();
  } catch (error) {
    // Handle token verification errors
    return next(new ErrorHandler("Invalid Token", 401));
  }
});

