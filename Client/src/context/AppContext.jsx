// Client / src / context / AppContext.jsx
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

  const CURRENCY = import.meta.env.VITE_CURRENCY;

  useEffect(() => {
    const fetchJobs = async () => {
      setJobs(jobsData);
    };

    fetchJobs();
  }, []);

  const value = {
    navigate,
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    CURRENCY,
    showRecruiterLogin,
    setShowRecruiterLogin,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
