// Client / src / App.jsx
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/client/Navbar";
import Home from "./pages/client/Home/View/Home";
import ApplyJob from "./pages/client/ApplyJob/View/ApplyJob";
import Applications from "./pages/client/Applications/View/Applications";
import Footer from "./components/client/Footer";

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
        <Footer />
      </div>
    </>
  );
};

export default App;
