// Server / controllers / userController.js
import User from "../models/User.js";
import { getAuth } from "@clerk/express";

/* -------- Get User Data -------- */
export const getUserData = async (req, res) => {
  try {
    // const userId = req.auth?.userId;
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication is required. Please log in again.",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "The requested user could not be found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User data fetched successfully.",
      user,
    });
  } catch (error) {
    console.error(
      "Get User Data Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while fetching user data.",
      error: `Get User Data Error: ${error?.stack || error?.message || error}`,
    });
  }
};
