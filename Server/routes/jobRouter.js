// Server / routes / jobRouter.js
import express from "express";
import { getJobs } from "../controllers/jobController.js";

const jobRouter = express.Router();

jobRouter.get("/get", getJobs);

export default jobRouter;
