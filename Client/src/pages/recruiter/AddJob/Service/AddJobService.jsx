// Client / src / pages / recruiter / AddJob / Service / AddJobService.jsx
import { postJob, updateJob } from "../../../../services/mutations";

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

export const updateJobApi = async ({
  id,
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

  const data = await updateJob(id, jobData, companyToken);
  return data;
};
