import { formatDate } from "../../../../utils/helpers";
import { Commet } from "react-loading-indicators";

const ApplicationsTable = ({
  pageLoading,
  userApplications,
  paginatedData,
  currentPage,
  itemsPerPage,
}) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr>
            <th className="py-3 px-4 border-b border-r border-gray-200 text-left max-sm:hidden">
              #
            </th>

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

            <th className="py-3 px-4 border-b border-r border-gray-200 text-center">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {pageLoading ? (
            <tr>
              <td colSpan={6} className="py-10">
                <div className="flex justify-center items-center">
                  <Commet color="#9333EA" size="medium" text="" textColor="" />
                </div>
              </td>
            </tr>
          ) : userApplications.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
                No job applications found.
              </td>
            </tr>
          ) : (
            paginatedData.map((job, index) =>
              // eslint-disable-next-line no-constant-condition
              true ? (
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-r border-gray-200 max-sm:hidden">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>

                  <td className="py-3 px-4 flex items-center gap-2 border-b border-r border-gray-200">
                    <img
                      className="w-8 h-8"
                      src={job.companyId.image}
                      alt="Logo"
                    />
                    {job?.companyId?.name}
                  </td>

                  <td className="py-2 px-4 border-b border-r border-gray-200">
                    {job?.jobId?.title}
                  </td>

                  <td className="py-2 px-4 border-b border-r border-gray-200 max-sm:hidden">
                    {job?.jobId?.location}
                  </td>

                  <td className="py-2 px-4 border-b border-r border-gray-200 max-sm:hidden">
                    {formatDate(job.date)}
                  </td>

                  <td className="py-2 px-4 border-b border-r border-gray-200 text-center">
                    <span
                      className={`${
                        job.status === "Accept"
                          ? "bg-green-300"
                          : job.status === "Reject"
                            ? "bg-red-300"
                            : "bg-purple-300"
                      } px-4 py-1.5 rounded`}
                    >
                      {job?.status}
                    </span>
                  </td>
                </tr>
              ) : null,
            )
          )}
        </tbody>
      </table>
    </>
  );
};

export default ApplicationsTable;
