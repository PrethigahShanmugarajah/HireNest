import Button from "../../../../components/Button";
import { ClipLoader } from "react-spinners";

const ApplyJobDescriptionSection = ({
  jobData,
  applyHandler,
  isAlreadyApplied,
  applyLoading,
}) => {
  return (
    <div className="w-full lg:w-2/3">
      <h2 className="font-bold text-2xl mb-4">Job Description</h2>
      <div
        className="rich-text"
        dangerouslySetInnerHTML={{ __html: jobData.description }}
      ></div>

      <Button
        onClick={applyHandler}
        className="mt-10"
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
    </div>
  );
};

export default ApplyJobDescriptionSection;
