// Client / src / pages / recruiter / Dashboard / View / Dashboard.jsx
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../../../context/AppContext";
import { company_icon, Logo } from "../../../../assets/assets";
import Sidebar from "../../../../components/recruiter/Sidebar";

const Dashboard = () => {
  const { navigate } = useAppContext();

  return (
    <div className="min-h-screen">
      {/* -------- Navbar for Recruiter Panel -------- */}
      <div className="shadow py-4">
        <div className="px-5 flex justify-between items-center">
          <img
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            className="max-sm:w-32 w-32 cursor-pointer"
            src={Logo}
            alt="Logo"
          />
          <div className="flex items-center gap-3">
            <p className="max-sm:hidden">Welcome, Sathya!</p>

            <div className="relative group">
              <img className="w-8 rounded-full" src={company_icon} alt="" />

              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-2 bg-white rounded-md border border-gray-200 text-sm">
                  <li className="py-1 px-2 cursor-pointer">Logout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start">
        <Sidebar />
        <div className="flex-1 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
