import { toast } from "react-toastify";
import API_ROUTES from "../api/api_route";
import api from "../api/axios";

/* -------- Fetch Company Data  -------- */
export const fetchCompanyData = async (companyToken) => {
  try {
    const { data } = await api.get(API_ROUTES.COMPANY.COMPANY, {
      headers: { Authorization: `Bearer ${companyToken}` },
    });

    if (!data?.success) {
      toast.warn(data?.message || "Company data fetched with warnings.");
      console.warn(
        "Fetch Company Data Warning:",
        data?.message || "Fetch Company Data Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Fetch Company Data Error:", error);

    throw error;
  }
};

/* -------- Fetch Company Posted Jobs  -------- */
export const fetchCompanyPostedJobs = async (companyToken) => {
  try {
    const { data } = await api.get(API_ROUTES.COMPANY.LIST_JOBS, {
      headers: { Authorization: `Bearer ${companyToken}` },
    });

    if (!data?.success) {
      toast.warn(data?.message || "Fetch company posted jobs with warning");
      console.warn(
        "Fetch Company Posted Jobs Warning:",
        data?.message || "Fetch Company Posted Jobs Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Fetch Company Posted Jobs Error:", error);

    throw error;
  }
};

/* -------- Fetch Jobs  -------- */
export const fetchJobs = async () => {
  try {
    const { data } = await api.get(API_ROUTES.JOBS.GET);

    if (!data?.success) {
      toast.warn(data?.message || "Fetch jobs with warning");
      console.warn(
        "Fetch Jobs Warning:",
        data?.message || "Fetch Jobs with Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Fetch Jobs Error:", error);

    throw error;
  }
};

/* -------- Fetch User Data  -------- */
export const fetchUserData = async (token) => {
  try {
    const { data } = await api.get(API_ROUTES.USERS.ME, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!data?.success) {
      toast.warn(data?.message || "Fetch user data with warning");
      console.warn(
        "Fetch User Data Warning:",
        data?.message || "Fetch User Data with Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Fetch User Data Error:", error);

    throw error;
  }
};

/* -------- Fetch User Applied Applications -------- */
export const fetchUserJobApplications = async (token) => {
  try {
    const { data } = await api.get(API_ROUTES.USERS.APPLICATIONS, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!data?.success) {
      toast.warn(
        data?.message || "Fetch user applied applications with warning",
      );
      console.warn(
        "Fetch User Applied Applications Warning:",
        data?.message || "Fetch User Applied Applications with Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Fetch User Applied Applications Error:", error);

    throw error;
  }
};

/* -------- Fetch Job By ID  -------- */
export const fetchJobByID = async (id) => {
  try {
    const { data } = await api.get(API_ROUTES.JOBS.GET_BY_ID(id));

    if (!data?.success) {
      toast.warn(data?.message || "Fetch job with warning");
      console.warn(
        "Fetch Job By ID Warning:",
        data?.message || "Fetch Job By ID with Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Fetch Job By ID Error:", error);

    throw error;
  }
};

/* -------- Fetch Company Job Applicants  -------- */
export const fetchCompanyJobApplicants = async (companyToken) => {
  try {
    const { data } = await api.get(API_ROUTES.COMPANY.APPLICANTS, {
      headers: { Authorization: `Bearer ${companyToken}` },
    });

    if (!data?.success) {
      toast.warn(data?.message || "Company applicants fetched with warnings.");
      console.warn(
        "Fetch Company Job Applicants Warning:",
        data?.message || "Fetch Company Job Applicants with Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Fetch Company Job Applicants Error:", error);

    throw error;
  }
};
