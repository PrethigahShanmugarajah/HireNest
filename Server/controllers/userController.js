// Server / controllers / userController.js
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
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

/* -------- Apply For Job -------- */
export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    // const userId = req.auth.userId;
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication is required. Please log in again.",
      });
    }

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required.",
      });
    }

    // const isAlreadyApplied = await JobApplication.find({ jobId, userId });
    const isAlreadyApplied = await JobApplication.findOne({ jobId, userId });

    // if (isAlreadyApplied.length > 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Already Applied",
    //   });
    // }

    if (isAlreadyApplied) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job.",
      });
    }

    const jobData = await Job.findById(jobId);

    if (!jobData) {
      return res.status(404).json({
        success: false,
        message: "The requested job could not be found.",
      });
    }

    const newApplication = await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    return res.status(201).json({
      success: true,
      message: "Job application submitted successfully.",
      application: newApplication,
    });
  } catch (error) {
    console.error(
      "Apply For Job Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while submitting the job application.",
      error: `Apply For Job Error: ${error?.stack || error?.message || error}`,
    });
  }
};
