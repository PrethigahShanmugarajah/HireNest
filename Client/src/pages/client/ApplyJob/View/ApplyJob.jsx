// Client / src / pages / client / ApplyJob / View / ApplyJob.jsx
import { useAppContext } from "../../../../context/AppContext";
import JobCard from "../../../../components/client/JobCard";
import { getTimeAgo, kConverter } from "../../../../utils/helpers";
import Button from "../../../../components/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Company_Icon } from "../../../../assets/assets";
import { Commet } from "react-loading-indicators";
import { Banknote, Briefcase, MapPin, User } from "lucide-react";

const ApplyJob = () => {
  const { jobs, CURRENCY } = useAppContext();
  const { id } = useParams();

  const [jobData, setjobData] = useState(null);

  useEffect(() => {
    const fetchJobId = async () => {
      const data = jobs.filter((job) => job._id === id);
      if (data.length !== 0) {
        setjobData(data[0]);
        console.log(data[0]);
      }
    };

    if (jobs.length > 0) {
      fetchJobId();
    }
  }, [id, jobs]);

  return jobData ? (
    <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
      <div className="bg-white text-black rounded-lg w-full">
        <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-violet-50 border border-violet-400 rounded-xl">
          <div className="flex flex-col md:flex-row items-center">
            <img
              src={Company_Icon}
              alt="Company_Icon"
              className="h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border border-gray-200"
            />

            <div className="text-center md:text-left text-neutral-700">
              <h1 className="text-2xl sm:text-4xl font-medium">
                {jobData.title}
              </h1>

              <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-500 mt-2">
                <span className="flex items-center gap-1 text-black">
                  <Briefcase className="w-4 h-4 text-gray-500" />
                  {jobData.companyId.name}
                </span>

                <span className="flex items-center gap-1 text-black">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  {jobData.location}
                </span>

                <span className="flex items-center gap-1 text-black">
                  <User className="w-4 h-4 text-gray-500" />
                  {jobData.level}
                </span>

                <span className="flex items-center gap-1 text-black">
                  <Banknote className="w-4 h-4 text-gray-500" />
                  CTC: {CURRENCY} {kConverter(jobData.salary)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
            <Button className="py-2.5! px-10!">Apply Now</Button>

            <p className="mt-2 text-gray-500">
              Posted {getTimeAgo(jobData.date)}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start">
          <div className="w-full lg:w-2/3">
            <h2 className="font-bold text-2xl mb-4">Job Description</h2>
            <div
              className="rich-text"
              dangerouslySetInnerHTML={{ __html: jobData.description }}
            ></div>

            <Button className="py-2.5! px-10! mt-10">Apply Now</Button>
          </div>

          {/* -------- Right Section More Jobs -------- */}
          <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5 font-bold">
            <h2>More Jobs From {jobData.companyId.name}</h2>

            {jobs
              .filter(
                (job) =>
                  job._id !== jobData._id &&
                  job.companyId._id === jobData.companyId._id,
              )
              // eslint-disable-next-line no-unused-vars
              .filter((job) => true)
              .slice(0, 4)
              .map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex justify-center items-center">
      <Commet color="#9333EA" size="medium" text="" textColor="" />
    </div>
  );
};

export default ApplyJob;
