// Server / routes / companyRouter.js
import express from "express";
import {
  loginCompany,
  registerCompany,
} from "../controllers/companyController.js";
import upload from "../config/multer.js";

const companyRouter = express.Router();

companyRouter.post("/register", upload.single("image"), registerCompany);
companyRouter.post("/login", loginCompany);

export default companyRouter;
