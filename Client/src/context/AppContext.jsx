// Client / src / context / AppContext.jsx
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jobsData } from "../assets/assets";
import { fetchCompanyData } from "../services/fetch";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  // const [companyToken, setCompanyToken] = useState(null);
  const [companyToken, setCompanyToken] = useState(() => {
    return localStorage.getItem("companyToken") || null;
  });
  const [companyData, setCompanyData] = useState(null);

  const CURRENCY = import.meta.env.VITE_CURRENCY;
  const backendUrl = import.meta.env.VITE_BASEURL;

  useEffect(() => {
    const fetchJobs = async () => {
      setJobs(jobsData);
    };

    fetchJobs();

    // const storedCompanyToken = localStorage.getItem("companyToken");

    // if (storedCompanyToken) {
    //   setCompanyToken(storedCompanyToken);
    // }
  }, []);

  useEffect(() => {
    const fetchCompanyDataService = async () => {
      try {
        const data = await fetchCompanyData(companyToken);

        if (data?.success) {
          setCompanyData(data?.company);
        }
      } catch {
        //
      }
    };

    if (companyToken) {
      fetchCompanyDataService();
    }
  }, [companyToken, backendUrl]);

  const value = {
    navigate,
    location,
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    CURRENCY,
    showRecruiterLogin,
    setShowRecruiterLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    backendUrl,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
