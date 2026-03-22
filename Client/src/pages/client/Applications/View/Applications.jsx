// Client / src / pages / client / Applications / View / Applications.jsx
import { useState } from "react";
import Button from "../../../../components/Button";
import { jobsApplied } from "../../../../assets/assets";
import { formatDate } from "../../../../utils/helpers";
import { Upload } from "lucide-react";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [resume, setResume] = useState(null);

  return (
    <div className="conatiner px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
      <h2 className="text-xl font-semibold">Your Resume</h2>
      <div className="flex gap-2 mb-6 mt-3">
        {isEdit ? (
          <>
            <label htmlFor="resumeUpload" className="flex items-center">
              <p className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg mr-2">
                Select Resume
              </p>

              <input
                id="resumeUpload"
                onChange={(e) => setResume(e.target.files[0])}
                accept="application/pdf"
                type="file"
                hidden
              />

              <Upload className="w-9 h-9 text-white bg-purple-600 p-2 rounded-md" />
            </label>

            <Button
              onClick={(e) => {
                e.preventDefault();
                setIsEdit(false);
              }}
              className="bg-green-100! border border-green-400  hover:bg-green-200"
              variant={"text"}
            >
              Save
            </Button>
          </>
        ) : (
          <div className="flex gap-2">
            <a
              className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg"
              href=""
            >
              Resume
            </a>

            <Button onClick={() => setIsEdit(true)} variant={"text"}>
              Edit
            </Button>
          </div>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr>
            <th className="py-3 px-4 border-b border-r border-gray-200 text-left">
              Company
            </th>

            <th className="py-3 px-4 border-b border-r border-gray-200 text-left">
              Job Title
            </th>

            <th className="py-3 px-4 border-b border-r border-gray-200 text-left max-sm:hidden">
              Location
            </th>

            <th className="py-3 px-4 border-b border-r border-gray-200 text-left max-sm:hidden">
              Date
            </th>

            <th className="py-3 px-4 border-b border-r border-gray-200 text-left">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {jobsApplied.map((job, index) =>
            // eslint-disable-next-line no-constant-condition
            true ? (
              <tr key={index}>
                <td className="py-3 px-4 flex items-center gap-2 border-b border-r border-gray-200">
                  <img className="w-8 h-8" src={job.logo} alt="Logo" />
                  {job.company}
                </td>

                <td className="py-2 px-4 border-b border-r border-gray-200">
                  {job.title}
                </td>

                <td className="py-2 px-4 border-b border-r border-gray-200 max-sm:hidden">
                  {job.location}
                </td>

                <td className="py-2 px-4 border-b border-r border-gray-200 max-sm:hidden">
                  {formatDate(job.date)}
                </td>

                <td className="py-2 px-4 border-b border-r border-gray-200">
                  <span
                    className={`${
                      job.status === "Accepted"
                        ? "bg-green-300"
                        : job.status === "Rejected"
                          ? "bg-red-300"
                          : "bg-purple-300"
                    } px-4 py-1.5 rounded`}
                  >
                    {job.status}
                  </span>
                </td>
              </tr>
            ) : null,
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Applications;
