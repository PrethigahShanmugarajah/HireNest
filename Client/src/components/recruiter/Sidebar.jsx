import { FilePenLine, Home, PlusSquare, UserRoundCheck } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const sidebarLinks = [
  {
    name: "Add Job",
    path: "/dashboard/add-job",
    activePaths: ["/dashboard/add-job", "/dashboard/update-job"],
    icon: PlusSquare,
  },
  { name: "Manage Job", path: "/dashboard/manage-jobs", icon: Home },
  {
    name: "View Applications",
    path: "/dashboard/view-applications",
    icon: UserRoundCheck,
  },
];

const Sidebar = () => {
  const { location } = useAppContext();

  return (
    <div className="min-h-full border-r-2 border-gray-200 w-16 md:w-56 transition-all duration-300">
      <ul className="flex flex-col pt-5">
        {sidebarLinks.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
              // className={({ isActive }) =>
              //   `flex items-center justify-center md:justify-start gap-3 p-3 md:px-6 w-full hover:bg-purple-100 ${
              //     isActive ? "bg-purple-200 border-r-4 border-purple-500" : ""
              //   }`
              // }
              className={() => {
                const isCustomActive = item.activePaths
                  ? item.activePaths.some((path) =>
                      location.pathname.startsWith(path),
                    )
                  : location.pathname === item.path;

                return `flex items-center justify-center md:justify-start gap-3 p-3 md:px-6 w-full hover:bg-purple-100 ${
                  isCustomActive
                    ? "bg-purple-200 border-r-4 border-purple-500"
                    : ""
                }`;
              }}
            >
              {() => {
                const isCustomActive = item.activePaths
                  ? item.activePaths.some((path) =>
                      location.pathname.startsWith(path),
                    )
                  : location.pathname === item.path;

                const isUpdatePage = location.pathname.startsWith(
                  "/dashboard/update-job",
                );

                const DynamicIcon =
                  item.path === "/dashboard/add-job" && isUpdatePage
                    ? FilePenLine
                    : Icon;

                return (
                  <>
                    <DynamicIcon
                      className={`w-6 h-6 shrink-0 ${
                        isCustomActive ? "text-purple-500" : "text-black"
                      }`}
                    />

                    <p className="hidden md:block whitespace-nowrap">
                      {item.path === "/dashboard/add-job" && isUpdatePage
                        ? "Update Job"
                        : item.name}
                    </p>
                  </>
                );
              }}
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
