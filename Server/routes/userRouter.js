// Server / routes / userRoutes.js
import express from "express";
import { getUserData } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/me", getUserData);

export default userRouter;
