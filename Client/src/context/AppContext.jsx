/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchCompanyData,
  fetchJobs,
  fetchUserData,
  fetchUserJobApplications,
} from "../services/fetch";
import { useAuth, useUser } from "@clerk/clerk-react";

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
  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplications] = useState([]);

  const CURRENCY = import.meta.env.VITE_CURRENCY;
  const backendUrl = import.meta.env.VITE_BASEURL;

  const { user } = useUser();
  const { getToken } = useAuth();

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
  }, [companyToken]);

  const fetchUserDataService = useCallback(async () => {
    try {
      const token = await getToken();
      const data = await fetchUserData(token);

      if (data?.success) {
        setUserData(data?.user);
      }
    } catch {
      //
    }
  }, [getToken]);

  const fetchUserJobApplicationsService = useCallback(async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const applicationsData = await fetchUserJobApplications(token);

      if (applicationsData?.success) {
        setUserApplications(applicationsData?.applications || []);
      }
    } catch {
      //
    }
  }, [getToken]);

  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;

      await fetchUserDataService();
      await fetchUserJobApplicationsService();
    };

    loadUserData();
  }, [user, fetchUserDataService, fetchUserJobApplicationsService]);

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
    getPaginatedData,
    userData,
    setUserData,
    userApplications,
    setUserApplications,
    fetchUserDataService,
    fetchUserJobApplicationsService,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
