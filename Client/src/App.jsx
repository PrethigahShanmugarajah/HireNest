// Client / src / App.jsx
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/client/Navbar";
import Home from "./pages/Home/View/Home";
import ApplyJob from "./pages/ApplyJob/View/ApplyJob";
import Applications from "./pages/Applications/View/Applications";

const App = () => {
  return (
    <>
      <ToastContainer />
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply-job/:id" element={<ApplyJob />} />
          <Route path="/applications" element={<Applications />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
