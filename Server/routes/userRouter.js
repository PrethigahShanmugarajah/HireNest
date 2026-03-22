// Server / routes / userRouter.js
import express from "express";
import { applyForJob, getUserData } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/me", getUserData);
userRouter.post("/apply", applyForJob);

export default userRouter;
