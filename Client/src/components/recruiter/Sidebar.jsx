// Client / src / components / recruiter / Sidebar.jsx
import { Home, PlusSquare, UserRoundCheck } from "lucide-react";
import { NavLink } from "react-router-dom";

const sidebarLinks = [
  { name: "Add Job", path: "/dashboard/add-job", icon: PlusSquare },
  { name: "Manage Job", path: "/dashboard/manage-jobs", icon: Home },
  {
    name: "View Applications",
    path: "/dashboard/view-applications",
    icon: UserRoundCheck,
  },
];

const Sidebar = () => {
  return (
    <div className="min-h-screen border-r-2 border-gray-200 w-16 md:w-56 transition-all duration-300">
      <ul className="flex flex-col pt-5">
        {sidebarLinks.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-center md:justify-start gap-3 p-3 md:px-6 w-full hover:bg-purple-100 ${
                  isActive ? "bg-purple-200 border-r-4 border-purple-500" : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-6 h-6 shrink-0 ${
                      isActive ? "text-purple-500" : "text-black"
                    }`}
                  />
                  <p className="hidden md:block whitespace-nowrap">
                    {item.name}
                  </p>
                </>
              )}
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
