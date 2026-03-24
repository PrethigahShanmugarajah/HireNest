// Client / src / pages / client / ApplyJob / Components / ApplyMoreJobSection.jsx
import JobCard from "../../../../components/client/JobCard";

const ApplyMoreJobSection = ({ jobData, jobs, userApplications }) => {
  const appliedJobsIds = new Set(
    userApplications.map((app) => app?.jobId?._id),
  );

  return (
    <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5">
      <h2>More Jobs From {jobData.companyId.name}</h2>

      {jobs
        .filter(
          (job) =>
            job._id !== jobData._id &&
            job?.companyId?._id === jobData?.companyId?._id,
        )
        .filter((job) => !appliedJobsIds.has(job._id))
        .slice(0, 4)
        .map((job, index) => (
          <JobCard
            key={index}
            job={job}
            isAlreadyApplied={appliedJobsIds.has(job._id)}
          />
        ))}
    </div>
  );
};

export default ApplyMoreJobSection;
