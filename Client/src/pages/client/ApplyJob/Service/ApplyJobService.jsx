import {
  fetchJobByID,
  fetchUserJobApplications,
} from "../../../../services/fetch";
import { applyJob } from "../../../../services/mutations";

export const fetchJobByIdApi = async (id) => {
  const data = await fetchJobByID(id);
  return data?.job || null;
};

export const applyJobApi = async (jobId, token) => {
  const data = await applyJob(jobId, token);
  return data;
};

export const fetchUserApplicationsApi = async (token) => {
  const data = await fetchUserJobApplications(token);
  return data?.applications || [];
};
