import { fetchUserJobApplications } from "../../../../services/fetch";
import { updateUserResume } from "../../../../services/mutations";

export const fetchUserApplicationsApi = async (token) => {
  const data = await fetchUserJobApplications(token);
  return data?.applications || [];
};

export const updateUserResumeApi = async (resume, token) => {
  const data = await updateUserResume(resume, token);
  return data;
};
