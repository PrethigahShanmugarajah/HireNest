// Client / src / context / AppContext.jsx
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchCompanyData, fetchJobs } from "../services/fetch";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const CURRENCY = import.meta.env.VITE_CURRENCY;
  const backendUrl = import.meta.env.VITE_BASEURL;

  useEffect(() => {
    const fetchJobsService = async () => {
      try {
        const data = await fetchJobs();

        if (data?.success) {
          setJobs(data?.jobs || []);
        }
      } catch {
        //
      }
    };

    fetchJobsService();
  }, [backendUrl]);

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

  const getPaginatedData = useMemo(
    () =>
      (data = [], currentPage = 1, itemsPerPage = 10) => {
        const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = data?.slice(startIndex, endIndex) || [];

        return {
          totalPages,
          paginatedData,
        };
      },
    [],
  );

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
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    getPaginatedData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
