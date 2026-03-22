// Server / routes / userRouter.js
import express from "express";
import {
  applyForJob,
  getUserData,
  getUserJobApplications,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/me", getUserData);
userRouter.post("/apply", applyForJob);
userRouter.get("/applications", getUserJobApplications);

export default userRouter;
