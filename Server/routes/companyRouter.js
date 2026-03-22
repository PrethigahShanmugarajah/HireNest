// Server / routes / companyRouter.js
import express from "express";
import {
  loginCompany,
  postJob,
  registerCompany,
} from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middleware/authMiddleware.js";

const companyRouter = express.Router();

companyRouter.post("/register", upload.single("image"), registerCompany);
companyRouter.post("/login", loginCompany);
companyRouter.post("/post-job", protectCompany, postJob);

export default companyRouter;
