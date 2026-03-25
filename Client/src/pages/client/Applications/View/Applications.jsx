import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../../../context/AppContext";
import { useAuth } from "@clerk/clerk-react";
import Pagination from "../../../../components/Pagination";
import {
  fetchUserApplicationsApi,
  updateUserResumeApi,
} from "../Service/ApplicationsService";
import ApplicationsTable from "../Components/ApplicationsTable";
import ApplicationResumeSection from "../Components/ApplicationResumeSection";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  const [userApplications, setUserApplications] = useState([]);
  const [saveLoading, setSaveLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageLoading, setPageLoading] = useState(false);

  const {
    currentPage,
    setCurrentPage,
    getPaginatedData,
    userData,
    fetchUserDataService,
  } = useAppContext();

  const { getToken } = useAuth();

  const fetchUserApplicationsService = useCallback(async () => {
    try {
      setPageLoading(true);
      const token = await getToken();
      if (!token) return;

      const applications = await fetchUserApplicationsApi(token);
      setUserApplications(applications);
    } catch {
      //
    } finally {
      setPageLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchUserApplicationsService();
  }, [fetchUserApplicationsService]);

  const updateUserResumeService = async () => {
    try {
      if (!resume) return;
      setSaveLoading(true);

      const token = await getToken();
      const data = await updateUserResumeApi(resume, token);

      if (data?.success) {
        await fetchUserDataService();
        setIsEdit(false);
        setResume(null);
      }
    } catch {
      //
    } finally {
      setSaveLoading(false);
    }
  };

  const { totalPages, paginatedData } = getPaginatedData(
    userApplications,
    currentPage,
    itemsPerPage,
  );

  useEffect(() => {
    setPageLoading(true);

    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentPage, itemsPerPage]);

  return (
    <div className="conatiner px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
      <ApplicationResumeSection
        isEdit={isEdit}
        userData={userData}
        resume={resume}
        setResume={setResume}
        setIsEdit={setIsEdit}
        updateUserResumeService={updateUserResumeService}
        saveLoading={saveLoading}
      />

      <ApplicationsTable
        pageLoading={pageLoading}
        userApplications={userApplications}
        paginatedData={paginatedData}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(value) => {
          setItemsPerPage(value);
          setCurrentPage(1);
        }}
        itemsPerPageOptions={[5, 10, 15]}
      />
    </div>
  );
};

export default Applications;
