// Server / routes / jobRouter.js
import express from "express";
import { getJobByID, getJobs } from "../controllers/jobController.js";

const jobRouter = express.Router();

jobRouter.get("/get", getJobs);
jobRouter.get("/get/:id", getJobByID);

export default jobRouter;
