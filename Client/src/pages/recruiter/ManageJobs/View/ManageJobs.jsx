// Client / src / pages / recruiter / ManageJobs / View / ManageJobs.jsx
import { useAppContext } from "../../../../context/AppContext";
import Button from "../../../../components/Button";
import { formatDate } from "../../../../utils/helpers";
import { manageJobsData } from "../../../../assets/assets";
import { SingleCheckboxField } from "../../../../components/FormField/CheckboxField";

const ManageJobs = () => {
  const { navigate } = useAppContext();

  return (
    <div className="container p-4 max-w-5xl">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 max-sm:text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-r border-gray-300 text-left max-sm:hidden">
                #
              </th>

              <th className="py-2 px-4 border-b border-r border-gray-300 text-left">
                Job Title
              </th>

              <th className="py-2 px-4 border-b border-r border-gray-300 text-left max-sm:hidden">
                Date
              </th>

              <th className="py-2 px-4 border-b border-r border-gray-300 text-left max-sm:hidden">
                Location
              </th>

              <th className="py-2 px-4 border-b border-r border-gray-300 text-center">
                Applications
              </th>

              <th className="py-2 px-4 border-b border-r border-gray-300 text-left">
                Visible
              </th>
            </tr>
          </thead>

          <tbody>
            {manageJobsData.map((job, index) => (
              <tr key={index} className="text-black">
                <td className="py-2 px-4 border-b border-r border-gray-300 max-sm:hidden">
                  {index + 1}
                </td>

                <td className="py-2 px-4 border-b border-r border-gray-300">
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
                    <SingleCheckboxField
                      name={`visible-${index}`}
                      value={job.visible}
                      onChange={() => {}}
                      size="s"
                      className="flex justify-start"
                      checkboxClassName="cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          onClick={() => navigate("/dashboard/add-job")}
          variant={"secondary"}
        >
          Add new job
        </Button>
      </div>
    </div>
  );
};

export default ManageJobs;
