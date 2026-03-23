// Client / src / services / fetch.js
import { toast } from "react-toastify";
import API_ROUTES from "../api/api_route";
import api from "../api/axios";

/* -------- Fetch Company Data  -------- */
export const fetchCompanyData = async (companyToken) => {
  try {
    const { data } = await api.get(API_ROUTES.COMPANY.COMPANY, {
      headers: {
        Authorization: `Bearer ${companyToken}`,
      },
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
