import { Commet } from "react-loading-indicators";
import { formatText } from "../../../../utils/helpers";
import { BeatLoader } from "react-spinners";
import Button from "../../../../components/Button";
import { Download, MoreHorizontal } from "lucide-react";

const ViewApplicationsTable = ({
  applicants,
  pageLoading,
  validApplicants,
  paginatedData,
  currentPage,
  itemsPerPage,
  statusLoading,
  openStatusConfirmPopup,
}) => {
  return (
    <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm text-xs sm:text-sm md:text-base">
      <thead>
        <tr className="border-b border-gray-200">
          <th className="py-2 px-4 text-left border-r border-gray-200">#</th>

          <th className="py-2 px-4 text-left border-r border-gray-200">
            User Name
          </th>

          <th className="py-2 px-4 text-left max-sm:hidden border-r border-gray-200">
            Job Title
          </th>

          <th className="py-2 px-4 text-left max-sm:hidden border-r border-gray-200">
            Location
          </th>

          <th className="py-2 px-4 text-center border-r border-gray-200">
            Resume
          </th>

          <th className="py-2 px-4 text-left">Action</th>
        </tr>
      </thead>

      <tbody>
        {applicants === null || pageLoading ? (
          <tr>
            <td colSpan={6} className="py-10">
              <div className="flex justify-center items-center">
                <Commet color="#9333EA" size="medium" text="" textColor="" />
              </div>
            </td>
          </tr>
        ) : validApplicants.length === 0 ? (
          <tr>
            <td colSpan={6} className="py-4 text-center text-gray-500">
              No applicants found.
            </td>
          </tr>
        ) : (
          paginatedData.map((applicant, index) => (
            <tr key={applicant?._id} className="text-black">
              <td className="py-2 px-4 border-b border-r border-gray-200 text-center">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>

              <td className="py-2 px-4 border-b border-r border-gray-200">
                <div className="flex items-center gap-2 w-52 max-w-52 min-w-0">
                  <img
                    className="w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-10 lg:h-10 rounded-full max-sm:hidden"
                    src={applicant?.userId?.image}
                    alt={formatText(applicant?.userId?.name)}
                  />

                  <span className="text-xs sm:text-sm md:text-sm lg:text-base whitespace-nowrap overflow-hidden text-ellipsis">
                    {formatText(applicant?.userId?.name)}
                  </span>
                </div>
              </td>

              <td className="py-2 px-4 border-b border-r border-gray-200 max-sm:hidden">
                <span className="line-clamp-2">{applicant?.jobId?.title}</span>
              </td>

              <td className="py-2 px-4 border-b border-r border-gray-200 max-sm:hidden">
                {applicant?.jobId?.location}
              </td>

              <td className="py-2 px-4 border-b border-r border-gray-200">
                <a
                  href={applicant?.userId?.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="flex gap-2 items-center justify-center"
                >
                  <span>Resume</span>{" "}
                  <Download className="w-9 h-4 text-white bg-purple-500 p-0.5 rounded-md" />
                </a>
              </td>

              <td className="py-2 px-4 border-b border-gray-200 relative">
                {applicant?.status === "Pending" ? (
                  <div className="relative inline-block text-left group">
                    {statusLoading === applicant?._id ? (
                      <div className="flex items-center justify-center w-5 h-5">
                        <BeatLoader size={6} color="#9333EA" />
                      </div>
                    ) : (
                      <Button
                        variant="text"
                        className="p-0! border-none hover:bg-none"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                    )}

                    <div className="z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block py-1">
                      <Button
                        className="block w-full py-0.5! text-green-500 hover:bg-green-100 border-none"
                        variant={"text"}
                        onClick={() =>
                          openStatusConfirmPopup(applicant, "Accept")
                        }
                      >
                        Accept
                      </Button>

                      <Button
                        className="block w-full  py-0.5! text-red-500 hover:bg-red-100 border-none"
                        variant={"text"}
                        onClick={() =>
                          openStatusConfirmPopup(applicant, "Reject")
                        }
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ) : (
                  <span
                    className={`${
                      applicant?.status === "Accept"
                        ? "bg-green-300 text-green-900"
                        : applicant?.status === "Reject"
                          ? "bg-red-300 text-red-900"
                          : "bg-purple-300 text-purple-900"
                    } px-4 py-1.5 rounded`}
                  >
                    {applicant?.status}
                  </span>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ViewApplicationsTable;
