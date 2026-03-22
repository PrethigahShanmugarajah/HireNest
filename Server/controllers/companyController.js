// Server / controllers / companyController.js
import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";

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
