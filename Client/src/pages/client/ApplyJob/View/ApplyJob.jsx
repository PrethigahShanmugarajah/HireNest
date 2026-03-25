import { useEffect, useState } from "react";
import { useAppContext } from "../../../../context/AppContext";
import { useParams } from "react-router-dom";
import { Commet } from "react-loading-indicators";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";
import {
  applyJobApi,
  fetchJobByIdApi,
  fetchUserApplicationsApi,
} from "../Service/ApplyJobService";
import ApplyJobHeaderCard from "../Components/ApplyJobHeaderCard";
import ApplyJobDescriptionSection from "../Components/ApplyJobDescriptionSection";
import ApplyMoreJobSection from "../Components/ApplyMoreJobSection";

const ApplyJob = () => {
  const { navigate, jobs, userData } = useAppContext();

  const { id } = useParams();

  const [jobData, setJobData] = useState(null);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(null);
  const [applyLoading, setApplyLoading] = useState(false);
  const [userApplications, setUserApplications] = useState([]);

  const { getToken } = useAuth();

  useEffect(() => {
    const fetchJobIdService = async () => {
      try {
        const job = await fetchJobByIdApi(id);
        setJobData(job);
      } catch {
        //
      }
    };

    fetchJobIdService();
  }, [id]);

  const applyHandler = async () => {
    try {
      if (!userData?.resume) {
        navigate("/applications");
        return toast.error("Upload resume to apply");
      }

      setApplyLoading(true);

      const token = await getToken();
      if (!token) return;

      const data = await applyJobApi(jobData._id, token);

      if (data?.success) {
        setIsAlreadyApplied(true);
        const applications = await fetchUserApplicationsApi(token);
        setUserApplications(applications);
      }
    } catch {
      //
    } finally {
      setApplyLoading(false);
    }
  };

  useEffect(() => {
    if (!jobData) return;

    const hasApplied = userApplications.some(
      (item) => item?.jobId?._id === jobData?._id,
    );

    setIsAlreadyApplied(hasApplied);
  }, [jobData, userApplications]);

  useEffect(() => {
    const loadUserApplications = async () => {
      try {
        const token = await getToken();

        if (!token) return;
        const applications = await fetchUserApplicationsApi(token);
        setUserApplications(applications);
      } catch {
        //
      }
    };

    loadUserApplications();
  }, [getToken]);
  return jobData ? (
    <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
      <div className="bg-white text-black rounded-lg w-full">
        <ApplyJobHeaderCard
          jobData={jobData}
          applyHandler={applyHandler}
          isAlreadyApplied={isAlreadyApplied}
          applyLoading={applyLoading}
        />

        <div className="flex flex-col lg:flex-row justify-between items-start">
          <ApplyJobDescriptionSection
            jobData={jobData}
            applyHandler={applyHandler}
            isAlreadyApplied={isAlreadyApplied}
            applyLoading={applyLoading}
          />

          <ApplyMoreJobSection
            jobData={jobData}
            jobs={jobs}
            userApplications={userApplications}
          />
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
