// Client / src / pages / recruiter / AddJob / Service / AddJobService.jsx
import { postJob } from "../../../../services/mutations";

export const postJobApi = async ({
  title,
  description,
  location,
  salary,
  category,
  level,
  companyToken,
}) => {
  const jobData = {
    title,
    description,
    location,
    salary,
    category,
    level,
  };

  const data = await postJob(jobData, companyToken);
  return data;
};
