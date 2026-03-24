// Client / src / pages / client / Applications / Service / ApplicationsService.jsx
import { fetchUserJobApplications } from "../../../../services/fetch";
import { updateUserResume } from "../../../../services/mutations";

/* -------- Fetch User Applications -------- */
export const fetchUserApplicationsApi = async (token) => {
  const data = await fetchUserJobApplications(token);
  return data?.applications || [];
};

/* -------- Update User Resume -------- */
export const updateUserResumeApi = async (resume, token) => {
  const data = await updateUserResume(resume, token);
  return data;
};
