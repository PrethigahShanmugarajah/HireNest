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

const App = () => {
  const { showRecruiterLogin } = useAppContext();

  return (
    <>
      <ToastContainer />
      <div>
        {showRecruiterLogin && <RecruiterLogin />}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply-job/:id" element={<ApplyJob />} />
          <Route path="/applications" element={<Applications />} />

          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="add-job" element={<AddJob />} />
            <Route path="manage-jobs" element={<ManageJobs />} />
            <Route path="view-applications" element={<ViewApplications />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
