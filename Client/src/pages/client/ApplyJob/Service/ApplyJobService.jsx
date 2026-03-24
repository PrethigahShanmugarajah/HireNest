// Client / src / pages / client / ApplyJob / Service / ApplyJobService.jsx
import {
  fetchJobByID,
  fetchUserJobApplications,
} from "../../../../services/fetch";
import { applyJob } from "../../../../services/mutations";

/* -------- Fetch Job By ID -------- */
export const fetchJobByIdApi = async (id) => {
  const data = await fetchJobByID(id);
  return data?.job || null;
};

/* -------- Apply Job -------- */
export const applyJobApi = async (jobId, token) => {
  const data = await applyJob(jobId, token);
  return data;
};

/* -------- Fetch User Applications -------- */
export const fetchUserApplicationsApi = async (token) => {
  const data = await fetchUserJobApplications(token);
  return data?.applications || [];
};
