import { fetchCompanyJobApplicants } from "../../../../services/fetch";
import { changeJobApplicationStatus } from "../../../../services/mutations";

export const fetchCompanyJobApplicantsApi = async (companyToken) => {
  const data = await fetchCompanyJobApplicants(companyToken);
  return data?.applications?.slice().reverse() || [];
};

export const changeJobApplicationStatusApi = async (
  companyToken,
  id,
  status,
) => {
  const data = await changeJobApplicationStatus(companyToken, id, status);
  return data;
};
