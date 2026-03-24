// Client / src / components / client / JobCard.jsx
import Button from "../Button";
import { useAppContext } from "../../context/AppContext";

const JobCard = ({ job, isAlreadyApplied = false }) => {
  const { navigate } = useAppContext();

  return (
    <div className="border border-gray-200 p-6 shadow rounded">
      <div className="flex justify-between items-center">
        <img className="h-8" src={job.companyId.image} alt="Company_Icon" />
      </div>

      <h4 className="font-bold text-xl mt-2">{job.title}</h4>

      <div className="flex items-center gap-3 mt-2 text-xs">
        <span className="bg-purple-300 px-4 py-1.5 rounded">
          {job.location}
        </span>

        <span className="bg-pink-300 px-4 py-1.5 rounded">{job.level}</span>
      </div>

      <p
        className="text-gray-500 text-sm mt-4"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
      ></p>

      <div className="mt-4 flex gap-4 text-sm">
        <Button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="px-4!"
          disabled={isAlreadyApplied}
        >
          {isAlreadyApplied ? "Already Applied" : "Apply Now"}
        </Button>

        <Button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="px-4!"
          variant={"text"}
        >
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
