import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id || decoded._id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User account no longer exists" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is invalid or expired" });
  }
};

/**
 * ADMIN ONLY: Final check for administrative role
 */
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    // Return 403 to indicate the user is authenticated but lacks permissions
    res.status(403).json({ message: "Access denied: Administrative privileges required" });
  }
};