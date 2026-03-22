// Server / routes / companyRouter.js
import express from "express";
import { registerCompany } from "../controllers/companyController.js";
import upload from "../config/multer.js";

const companyRouter = express.Router();

companyRouter.post("/register", upload.single("image"), registerCompany);

export default companyRouter;
