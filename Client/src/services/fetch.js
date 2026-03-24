// Client / src / services / fetch.js
import { toast } from "react-toastify";
import API_ROUTES from "../api/api_route";
import api from "../api/axios";

/* -------- Fetch Company Data  -------- */
export const fetchCompanyData = async (companyToken) => {
  try {
    const { data } = await api.get(API_ROUTES.COMPANY.COMPANY, {
      headers: { Authorization: `Bearer ${companyToken}` },
    });

    console.log("Fetch Company Data API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
      console.log("Fetch Company Data Success:", data?.message);
    } else {
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
    console.log("Fetch Company Posted Jobs API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
      console.log("Fetch Company Posted Jobs Success:", data?.message);
    } else {
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
    console.log("Fetch Jobs API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
      console.log("Fetch Jobs Success:", data?.message);
    } else {
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

    console.log("Fetch User Data API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
      console.log("Fetch User Data Success:", data?.message);
    } else {
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

    console.log("Fetch User Applied Applications API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
      console.log("Fetch User Applied Applications Success:", data?.message);
    } else {
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

    console.log("Fetch Job By ID API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
      console.log("Fetch Job By ID Success:", data?.message);
    } else {
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
