// Client / src / pages / recruiter / ManageJobs / Components / ManageJobsTable.jsx
import { ClipLoader } from "react-spinners";
import { formatDate } from "../../../../utils/helpers";
import { SingleCheckboxField } from "../../../../components/FormField/CheckboxField";
import Button from "../../../../components/Button";
import { Edit, Trash2 } from "lucide-react";
import { Commet } from "react-loading-indicators";

const ManageJobsTable = ({
  paginatedData,
  currentPage,
  itemsPerPage,
  visibilityLoading,
  deleteLoading,
  openVisibilityPopup,
  openDeletePopup,
  openEditJobPage,
  pageLoading,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 max-sm:text-sm">
        <thead>
          <tr className="text-left">
            <th className="py-2 px-4 border-b border-r border-gray-300 max-sm:hidden">
              #
            </th>

            <th className="py-2 px-4 border-b border-r border-gray-300">
              Job Title
            </th>

            <th className="py-2 px-4 border-b border-r border-gray-300 max-sm:hidden">
              Date
            </th>

            <th className="py-2 px-4 border-b border-r border-gray-300 max-sm:hidden">
              Location
            </th>

            <th className="py-2 px-4 border-b border-r border-gray-300 text-center">
              Applications
            </th>

            <th className="py-2 px-4 border-b border-r border-gray-300">
              Visible
            </th>

            <th className="py-2 px-4 border-b border-r border-gray-300 text-center">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {pageLoading ? (
            <tr>
              <td colSpan={7} className="py-10">
                <div className="flex justify-center items-center">
                  <Commet color="#9333EA" size="medium" text="" textColor="" />
                </div>
              </td>
            </tr>
          ) : (
            paginatedData.map((job, index) => (
              <tr key={index} className="text-black text-left">
                <td className="py-2 px-4 border-b border-r border-gray-300 max-sm:hidden">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>

                <td className="py-2 px-4 border-b border-r border-gray-300 text-left">
                  {job.title}
                </td>

                <td className="py-2 px-4 border-b border-r border-gray-300 max-sm:hidden">
                  {formatDate(job.date)}
                </td>

                <td className="py-2 px-4 border-b border-r border-gray-300 max-sm:hidden">
                  {job.location}
                </td>

                <td className="py-2 px-4 border-b border-r border-gray-300 text-center">
                  {job.applicants}
                </td>

                <td className="py-2 px-4 border-b border-r border-gray-300">
                  <div className="ml-4">
                    {visibilityLoading === job._id ? (
                      <div className="flex justify-start">
                        <ClipLoader size={18} color="#A855F7" />
                      </div>
                    ) : (
                      <SingleCheckboxField
                        name={`visible-${index}`}
                        value={job.visible}
                        size="s"
                        className="flex justify-start"
                        checkboxClassName="cursor-pointer"
                        onChange={() => openVisibilityPopup(job)}
                        checked={job.visible}
                      />
                    )}
                  </div>
                </td>

                <td className="border-b border-gray-300 text-center">
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="text"
                      onClick={() => openEditJobPage(job)}
                      className="border-none hover:bg-transparent px-0! py-0!"
                    >
                      <Edit
                        size={18}
                        className="text-purple-500 hover:text-purple-700"
                      />
                    </Button>

                    <Button
                      variant="text"
                      onClick={() => openDeletePopup(job)}
                      className="border-none hover:bg-transparent px-0! py-0!"
                      disabled={deleteLoading === job._id}
                    >
                      {deleteLoading === job._id ? (
                        <div className="flex items-center justify-center">
                          <ClipLoader size={18} color="#EF4444" />
                        </div>
                      ) : (
                        <Trash2
                          size={18}
                          className="text-red-500 hover:text-red-700"
                        />
                      )}
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageJobsTable;
