// Server / controllers / companyController.js
import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

/* -------- Register Company -------- */
export const registerCompany = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const imageFile = req.file;

    // if (!name || !email || !password || !imageFile) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Name, email, password, and company image are required.",
    //   });
    // }

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Company name is required.",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Company email is required.",
      });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must include at least one uppercase letter.",
      });
    }

    if (!/[a-z]/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must include at least one lowercase letter.",
      });
    }

    if (!/[0-9]/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must include at least one number.",
      });
    }

    if (!/[@$!%*?&#^_\-+=.]/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must include at least one special character.",
      });
    }

    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "Company image is required.",
      });
    }

    const companyExists = await Company.findOne({ email });

    if (companyExists) {
      return res.status(409).json({
        success: false,
        message: "A company with this email address is already registered.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      folder: "HireNest/Companies",
    });

    const company = await Company.create({
      name,
      email,
      password: hashPassword,
      image: imageUpload.secure_url,
    });

    return res.status(201).json({
      success: true,
      message: "Company registered successfully.",
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    console.error(
      "Register Company Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while registering the company.",
      error: `Register Company Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Login Company -------- */
export const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    // if (!email || !password) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Email and password are required.",
    //   });
    // }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required.",
      });
    }

    const company = await Company.findOne({ email });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "No company found with the provided email.",
      });
    }

    if (await bcrypt.compare(password, company.password)) {
      return res.status(200).json({
        success: true,
        message: "Login successful.",
        company: {
          _id: company._id,
          name: company.name,
          email: company.email,
          image: company.image,
        },
        token: generateToken(company._id),
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.error(
      "Login Company Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while logging in the company.",
      error: `Login Company Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Get Company Data -------- */
export const getCompanyData = async (req, res) => {
  try {
    const company = req.company;

    return res.status(200).json({
      success: true,
      message: "Company data fetched successfully.",
      company,
    });
  } catch (error) {
    console.error(
      "Get Company Data Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while fetching company data.",
      error: `Get Company Data Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Post Job -------- */
export const postJob = async (req, res) => {
  try {
    const { title, description, location, category, level, salary } = req.body;
    const companyId = req.company._id;

    // if (!title || !description || !location || !category || !level || !salary) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "All job details are required to create a job posting.",
    //   });
    // }

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Job title is required.",
      });
    }

    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Job description is required.",
      });
    }

    if (!location) {
      return res.status(400).json({
        success: false,
        message: "Job location is required.",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Job category is required.",
      });
    }

    if (!level) {
      return res.status(400).json({
        success: false,
        message: "Job level is required.",
      });
    }

    if (!salary) {
      return res.status(400).json({
        success: false,
        message: "Job salary is required.",
      });
    }

    const newJob = new Job({
      title,
      description,
      location,
      category,
      level,
      salary,
      date: Date.now(),
      companyId,
    });

    await newJob.save();

    return res.status(201).json({
      success: true,
      message: "Job posted successfully.",
      newJob,
    });
  } catch (error) {
    console.error("Post Job Error:", error?.stack || error?.message || error);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while posting the job.",
      error: `Post Job Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Get Company Posted Jobs -------- */
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;
    const jobs = await Job.find({ companyId });

    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await JobApplication.find({ jobId: job._id });
        return { ...job.toObject(), applicants: applicants.length };
      }),
    );

    return res.status(200).json({
      success: true,
      message:
        jobsData.length === 0
          ? "No job postings found."
          : "Jobs fetched successfully.",
      jobsData,
    });
  } catch (error) {
    console.error(
      "Get Company Posted Jobs Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while fetching the company's posted jobs.",
      error: `Get Company Posted Jobs Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Change Job Visibility -------- */
export const changeVisiblity = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "The requested job could not be found.",
      });
    }

    // if (companyId.toString() === job.companyId.toString()) {
    //   job.visible = !job.visible;
    // }

    if (companyId.toString() !== job.companyId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to modify this job.",
      });
    }

    job.visible = !job.visible;

    await job.save();

    const visibilityStatus = job.visible ? "visible" : "hidden";

    return res.status(200).json({
      success: true,
      message: `Job visibility changed successfully to ${visibilityStatus}`,
      job,
    });
  } catch (error) {
    console.error(
      "Change Job Visibility Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while changing job visibility.",
      error: `Change Job Visibility Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Update Job -------- */
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, location, category, level, salary } = req.body;

    const companyId = req.company._id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Job id is required.",
      });
    }

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Job title is required.",
      });
    }

    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Job description is required.",
      });
    }

    if (!location) {
      return res.status(400).json({
        success: false,
        message: "Job location is required.",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Job category is required.",
      });
    }

    if (!level) {
      return res.status(400).json({
        success: false,
        message: "Job level is required.",
      });
    }

    if (!salary) {
      return res.status(400).json({
        success: false,
        message: "Job salary is required.",
      });
    }

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "The requested job could not be found.",
      });
    }

    if (companyId.toString() !== job.companyId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this job.",
      });
    }

    job.title = title;
    job.description = description;
    job.location = location;
    job.category = category;
    job.level = level;
    job.salary = salary;

    await job.save();

    return res.status(200).json({
      success: true,
      message: "Job updated successfully.",
      job,
    });
  } catch (error) {
    console.error("Update Job Error:", error?.stack || error?.message || error);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while updating the job.",
      error: `Update Job Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Delete Job -------- */
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Job id is required.",
      });
    }

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "The requested job could not be found.",
      });
    }

    if (companyId.toString() !== job.companyId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this job.",
      });
    }

    await JobApplication.deleteMany({ jobId: job._id });
    await Job.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Job Error:", error?.stack || error?.message || error);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while deleting the job.",
      error: `Delete Job Error: ${error?.stack || error?.message || error}`,
    });
  }
};
