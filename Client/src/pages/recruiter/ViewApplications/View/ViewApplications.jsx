// Client / src / pages / recruiter / ViewApplications / View / ViewApplications.jsx
import { viewApplicationsPageData } from "../../../../assets/assets";
import Button from "../../../../components/Button";
import { formatText } from "../../../../utils/helpers";
import { Download, MoreHorizontal } from "lucide-react";

const ViewApplications = () => {
  return (
    <div className="container mx-auto p-4">
      <div>
        <table className="w-full max-w-5xl bg-white border border-gray-200 max-sm:text-sm text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4 text-left border-r border-gray-200">
                #
              </th>

              <th className="py-2 px-4 text-left border-r border-gray-200">
                User Name
              </th>

              <th className="py-2 px-4 text-left max-sm:hidden border-r border-gray-200">
                Job Title
              </th>

              <th className="py-2 px-4 text-left max-sm:hidden border-r border-gray-200">
                Location
              </th>

              <th className="py-2 px-4 text-left border-r border-gray-200">
                Resume
              </th>

              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {viewApplicationsPageData.map((applicant, index) => (
              <tr className="text-black">
                <td className="py-2 px-4 border-b border-r border-gray-200 text-center">
                  {index + 1}
                </td>

                <td className="py-2 px-4 border-b border-r border-gray-200 text-center flex">
                  <img
                    className="w-10 h-10 rounded-full mr-3 max-sm:hidden"
                    src={applicant.imgSrc}
                    alt=""
                  />{" "}
                  <span>{formatText(applicant.name)}</span>{" "}
                </td>

                <td className="py-2 px-4 border-b border-r border-gray-200 max-sm:hidden">
                  {applicant.jobTitle}
                </td>

                <td className="py-2 px-4 border-b border-r border-gray-200 max-sm:hidden">
                  {applicant.location}
                </td>

                <td className="py-2 px-4 border-b border-r border-gray-200">
                  <a href="" target="_blank">
                    Resume{" "}
                    <Download className="w-9 h-4 text-white bg-purple-500 p-0.5 rounded-md" />
                  </a>
                </td>

                <td className="py-2 px-4 border-b border-gray-200 relative">
                  <div className="relative inline-block text-left group">
                    <Button
                      variant="text"
                      className="p-0! border-none hover:bg-none"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>

                    <div className="z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block py-1">
                      <Button
                        className="block w-full py-0.5! text-green-500 hover:bg-green-100 border-none"
                        variant={"text"}
                      >
                        Accept
                      </Button>

                      <Button
                        className="block w-full  py-0.5! text-red-500 hover:bg-red-100 border-none"
                        variant={"text"}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
