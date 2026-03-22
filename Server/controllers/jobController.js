// Server / controllers / jobController.js
import Job from "../models/Job.js";

/* -------- Get Jobs -------- */
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ visible: true }).populate({
      path: "companyId",
      select: "-password",
    });

    const count = jobs.length;

    return res.status(200).json({
      success: true,
      message: "Jobs fetched successfully.",
      count,
      jobs,
    });
  } catch (error) {
    console.error("Get Jobs Error:", error?.stack || error?.message || error);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while fetching jobs.",
      error: `Get Jobs Error: ${error?.stack || error?.message || error}`,
    });
  }
};
