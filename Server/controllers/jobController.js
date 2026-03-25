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

/* -------- Get Job By ID -------- */
export const getJobByID = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id).populate({
      path: "companyId",
      select: "-password",
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "The requested job could not be found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job fetched successfully.",
      job,
    });
  } catch (error) {
    console.error("Get Job Error:", error?.stack || error?.message || error);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while fetching the job.",
      error: `Get Job Error: ${error?.stack || error?.message || error}`,
    });
  }
};
