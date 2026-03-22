// Server / routes / companyRouter.js
import express from "express";
import {
  changeVisiblity,
  getCompanyData,
  getCompanyPostedJobs,
  loginCompany,
  postJob,
  registerCompany,
} from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middleware/authMiddleware.js";

const companyRouter = express.Router();

companyRouter.post("/register", upload.single("image"), registerCompany);
companyRouter.post("/login", loginCompany);
companyRouter.get("/company", protectCompany, getCompanyData);
companyRouter.post("/post-job", protectCompany, postJob);
companyRouter.get("/list-jobs", protectCompany, getCompanyPostedJobs);
companyRouter.post("/change-visiblity", protectCompany, changeVisiblity);

export default companyRouter;
