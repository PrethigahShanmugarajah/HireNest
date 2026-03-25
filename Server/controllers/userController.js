import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import User from "../models/User.js";
import { getAuth } from "@clerk/express";
import { v2 as cloudinary } from "cloudinary";

/* -------- Get User Data -------- */
export const getUserData = async (req, res) => {
  try {
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

    const isAlreadyApplied = await JobApplication.findOne({ jobId, userId });

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

/* -------- Get User Applied Applications -------- */
export const getUserJobApplications = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication is required. Please log in again.",
      });
    }

    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();

    if (!applications) {
      return res.status(404).json({
        success: false,
        message: "No job applications were found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        applications.length === 0
          ? "No job applications found."
          : "Job applications fetched successfully.",
      applications,
    });
  } catch (error) {
    console.error(
      "Get User Applied Applications Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while fetching job applications.",
      error: `Get User Applied Applications Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Update User Profile (Resume) -------- */
export const updateUserResume = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication is required. Please log in again.",
      });
    }

    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required.",
      });
    }

    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "The requested user could not be found.",
      });
    }

    if (resumeFile) {
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path, {
        folder: "HireNest/Users/Resumes",
        resource_type: "auto",
      });
      userData.resume = resumeUpload.secure_url;
    }

    await userData.save();

    return res.status(200).json({
      success: true,
      message: "Resume updated successfully.",
      resume: userData.resume,
    });
  } catch (error) {
    console.error(
      "Update User Profile (Resume) Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while updating the resume.",
      error: `Update User Profile (Resume) Error: ${error?.stack || error?.message || error}`,
    });
  }
};
