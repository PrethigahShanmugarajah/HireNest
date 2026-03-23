// Client / src / App.jsx
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/client/Navbar";
import Home from "./pages/client/Home/View/Home";
import ApplyJob from "./pages/client/ApplyJob/View/ApplyJob";
import Applications from "./pages/client/Applications/View/Applications";
import Footer from "./components/client/Footer";
import RecruiterLogin from "./components/recruiter/RecruiterLogin";
import { useAppContext } from "./context/AppContext";
import Dashboard from "./pages/recruiter/Dashboard/View/Dashboard";
import AddJob from "./pages/recruiter/AddJob/View/AddJob";
import ManageJobs from "./pages/recruiter/ManageJobs/View/ManageJobs";
import ViewApplications from "./pages/recruiter/ViewApplications/View/ViewApplications";
import "quill/dist/quill.snow.css";

const App = () => {
  const { location, showRecruiterLogin, companyToken } = useAppContext();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      <ToastContainer />
      <div>
        {showRecruiterLogin && <RecruiterLogin />}
        {!isDashboard && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply-job/:id" element={<ApplyJob />} />
          <Route path="/applications" element={<Applications />} />

          <Route path="/dashboard" element={<Dashboard />}>
            {companyToken ? (
              <>
                <Route path="manage-job" element={<ManageJobs />} />
                <Route path="add-job" element={<AddJob />} />
                <Route
                  path="view-applications"
                  element={<ViewApplications />}
                />
              </>
            ) : null}
          </Route>
        </Routes>
        {!isDashboard && <Footer />}
      </div>
    </>
  );
};

export default App;
