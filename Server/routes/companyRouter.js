import express from "express";
import {
  changeJobApplicationStatus,
  changeVisibility,
  deleteJob,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  loginCompany,
  postJob,
  registerCompany,
  updateJob,
} from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middleware/authMiddleware.js";

const companyRouter = express.Router();

companyRouter.post("/register", upload.single("image"), registerCompany);
companyRouter.post("/login", loginCompany);
companyRouter.get("/company", protectCompany, getCompanyData);
companyRouter.post("/post-job", protectCompany, postJob);
companyRouter.get("/applicants", protectCompany, getCompanyJobApplicants);
companyRouter.get("/list-jobs", protectCompany, getCompanyPostedJobs);
companyRouter.patch(
  "/change-status/:id/:status",
  protectCompany,
  changeJobApplicationStatus,
);
companyRouter.patch("/change-visibility/:id", protectCompany, changeVisibility);
companyRouter.put("/update-job/:id", protectCompany, updateJob);
companyRouter.delete("/delete-job/:id", protectCompany, deleteJob);

export default companyRouter;
