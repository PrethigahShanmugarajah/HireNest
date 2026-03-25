import { fetchCompanyPostedJobs } from "../../../../services/fetch";
import { changeJobVisibility, deleteJob } from "../../../../services/mutations";

export const fetchCompanyJobsApi = async (companyToken) => {
  const data = await fetchCompanyPostedJobs(companyToken);
  return data?.jobsData?.slice().reverse() || [];
};

export const changeJobVisibilityApi = async (id, companyToken) => {
  const data = await changeJobVisibility(id, companyToken);
  return data;
};

export const deleteJobApi = async (id, companyToken) => {
  const data = await deleteJob(id, companyToken);
  return data;
};
