// Client / src / pages / recruiter / Dashboard / View / Dashboard.jsx
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../../../context/AppContext";
import { Logo } from "../../../../assets/assets";
import Sidebar from "../../../../components/recruiter/Sidebar";
import { formatText } from "../../../../utils/helpers";

const Dashboard = () => {
  const { navigate, setCompanyToken, companyData, setCompanyData } =
    useAppContext();

  const logout = () => {
    setCompanyToken(null);
    localStorage.removeItem("companyToken");
    setCompanyData(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
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

          {companyData && (
            <div className="flex items-center gap-3">
              <p className="max-sm:hidden">
                Welcome, {formatText(companyData.name)}
              </p>

              <div className="relative group">
                <img
                  className="w-8 rounded-full"
                  src={companyData.image}
                  alt={companyData.name}
                />

                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                  <ul className="list-none m-0 p-2 bg-white rounded-md border border-gray-200 text-sm">
                    <li onClick={logout} className="py-1 px-2 cursor-pointer">
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-stretch flex-1 min-h-0">
        <Sidebar />
        <div className="flex-1 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
