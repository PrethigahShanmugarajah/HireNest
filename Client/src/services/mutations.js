// Client / src / services / mutations.js
import { toast } from "react-toastify";
import API_ROUTES from "../api/api_route";
import api from "../api/axios";

/* -------- Register Company -------- */
export const registerCompany = async (formData) => {
  try {
    const { data } = await api.post(API_ROUTES.COMPANY.REGISTER, formData);
    console.log("Register Company API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Register Company Success:", data?.message);
    } else {
      toast.warn(
        data?.message || "Company registration completed with warnings.",
      );
      console.warn(
        "Register Company Warning:",
        data?.message || "Register Company Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Register Company Error:", error);

    throw error;
  }
};

/* -------- Login Company -------- */
export const loginCompany = async (payload) => {
  try {
    const { data } = await api.post(API_ROUTES.COMPANY.LOGIN, payload);
    console.log("Login Company API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Login Company Success:", data?.message);
    } else {
      toast.warn(data?.message || "Company login completed with warnings.");
      console.warn(
        "Login Company Warning:",
        data?.message || "Login Company Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Login Company Error:", error);

    throw error;
  }
};

/* -------- Post Job -------- */
export const postJob = async (jobData, companyToken) => {
  try {
    const { data } = await api.post(API_ROUTES.COMPANY.POST_JOB, jobData, {
      headers: { Authorization: `Bearer ${companyToken}` },
    });

    console.log("Post Job API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Post Job Success:", data?.message);
    } else {
      toast.warn(data?.message || "Post job with warning");
      console.warn("Post Job Warning:", data?.message || "Post Job Warning");
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Post Job Error:", error);

    throw error;
  }
};
