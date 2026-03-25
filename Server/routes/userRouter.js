import express from "express";
import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  updateUserResume,
} from "../controllers/userController.js";
import upload from "../config/multer.js";

const userRouter = express.Router();

userRouter.get("/me", getUserData);
userRouter.post("/apply", applyForJob);
userRouter.get("/applications", getUserJobApplications);
userRouter.patch("/resume", upload.single("resume"), updateUserResume);

export default userRouter;
