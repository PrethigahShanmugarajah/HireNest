// Client / src / pages / client / ApplyJob / Components / ApplyJobHeaderCard.jsx
import { Banknote, Briefcase, MapPin, User } from "lucide-react";
import { useAppContext } from "../../../../context/AppContext";
import { getTimeAgo, kConverter } from "../../../../utils/helpers";
import Button from "../../../../components/Button";
import { ClipLoader } from "react-spinners";

const ApplyJobHeaderCard = ({
  jobData,
  applyHandler,
  isAlreadyApplied,
  applyLoading,
}) => {
  const { CURRENCY } = useAppContext();

  return (
    <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-violet-50 border border-violet-400 rounded-xl">
      <div className="flex flex-col md:flex-row items-center">
        <img
          src={jobData?.companyId?.image}
          alt="Company_Icon"
          className="h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border border-gray-200"
        />

        <div className="text-center md:text-left text-neutral-700">
          <h1 className="text-2xl sm:text-4xl font-medium">{jobData.title}</h1>

          <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-500 mt-2">
            <span className="flex items-center gap-1 text-black">
              <Briefcase className="w-4 h-4 text-gray-500" />
              {jobData?.companyId?.name}
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
        <Button
          onClick={applyHandler}
          className="py-2.5! px-10!"
          disabled={isAlreadyApplied || applyLoading}
        >
          {applyLoading ? (
            <div className="flex items-center justify-center">
              <ClipLoader size={18} color="#FFFFFF" />
            </div>
          ) : isAlreadyApplied ? (
            "Already Applied"
          ) : (
            "Apply Now"
          )}
        </Button>

        <p className="mt-2 text-gray-500">Posted {getTimeAgo(jobData.date)}</p>
      </div>
    </div>
  );
};

export default ApplyJobHeaderCard;
