// Server / middleware / authMiddleware.js
import jwt from "jsonwebtoken";
import Company from "../models/Company.js";

export const protectCompany = async (req, res, next) => {
  try {
    // const token = req.headers.token;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is missing. Please log in again.",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format. Bearer token is required.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.company = await Company.findById(decoded.id).select("-password");

    // if (!token) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Authentication token is required. Please log in again.",
    //   });
    // }

    if (!req.company) {
      return res.status(401).json({
        success: false,
        message: "The authenticated company account could not be found.",
      });
    }

    next();
  } catch (error) {
    console.error(
      "Protect Company Middleware Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while verifying company authentication.",
      error: `Protect Company Middleware Error: ${error?.stack || error?.message || error}`,
    });
  }
};
