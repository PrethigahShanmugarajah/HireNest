// Client / src / pages / recruiter / ViewApplications / View / ViewApplications.jsx
import { useEffect, useState } from "react";
import { useAppContext } from "../../../../context/AppContext";
import { formatText } from "../../../../utils/helpers";
import {
  changeJobApplicationStatusApi,
  fetchCompanyJobApplicantsApi,
} from "../Service/ViewApplicationsService";
import ConfirmPopup from "../../../../components/ConfirmPopup";
import Pagination from "../../../../components/Pagination";
import ViewApplicationsTable from "../Components/ViewApplicationsTable";

const ViewApplications = () => {
  const { companyToken, currentPage, setCurrentPage, getPaginatedData } =
    useAppContext();

  const [applicants, setApplicants] = useState(null);
  const [statusLoading, setStatusLoading] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageLoading, setPageLoading] = useState(false);

  const fetchCompanyJobApplicantsService = async () => {
    const applications = await fetchCompanyJobApplicantsApi(companyToken);
    setApplicants(applications);
  };

  useEffect(() => {
    let isMounted = true;

    const getApplicants = async () => {
      if (!companyToken) return;
      const applications = await fetchCompanyJobApplicantsApi(companyToken);
      if (!isMounted) return;
      setApplicants(applications);
    };

    getApplicants();

    return () => {
      isMounted = false;
    };
  }, [companyToken]);

  const openStatusConfirmPopup = (applicant, status) => {
    setSelectedApplication({ ...applicant, nextStatus: status });
    setShowConfirmPopup(true);
  };

  const changeJobApplicationStatusService = async (id, status) => {
    try {
      setStatusLoading(id);
      const data = await changeJobApplicationStatusApi(
        companyToken,
        id,
        status,
      );

      if (data?.success) {
        await fetchCompanyJobApplicantsService();
      }
    } catch {
      //
    } finally {
      setStatusLoading(null);
    }
  };

  const validApplicants =
    applicants?.filter((item) => item?.jobId && item?.userId) || [];

  const { totalPages, paginatedData } = getPaginatedData(
    validApplicants,
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
    <div className="container mx-auto p-4 max-w-6xl">
      <div>
        <ViewApplicationsTable
          applicants={applicants}
          pageLoading={pageLoading}
          validApplicants={validApplicants}
          paginatedData={paginatedData}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          statusLoading={statusLoading}
          openStatusConfirmPopup={openStatusConfirmPopup}
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

      {showConfirmPopup && selectedApplication && (
        <ConfirmPopup
          onClose={() => {
            if (statusLoading) return;
            setShowConfirmPopup(false);
            setSelectedApplication(null);
          }}
          onConfirm={async () => {
            await changeJobApplicationStatusService(
              selectedApplication._id,
              selectedApplication.nextStatus,
            );
            setShowConfirmPopup(false);
            setSelectedApplication(null);
          }}
          loading={statusLoading === selectedApplication._id}
          title={
            selectedApplication.nextStatus === "Accept"
              ? "Accept Application"
              : "Reject Application"
          }
          description={
            selectedApplication.nextStatus === "Accept" ? (
              <>
                You are about to accept the application from{" "}
                <b>{formatText(selectedApplication?.userId?.name)}</b>.
                <br />
                Job: <b>{selectedApplication?.jobId?.title}</b>
                <br />
                Location: <b>{selectedApplication?.jobId?.location}</b>
                <br />
                Do you want to continue?
              </>
            ) : (
              <>
                You are about to reject the application from{" "}
                <b>{formatText(selectedApplication?.userId?.name)}</b>.
                <br />
                Job: <b>{selectedApplication?.jobId?.title}</b>
                <br />
                Location: <b>{selectedApplication?.jobId?.location}</b>
                <br />
                Do you want to continue?
              </>
            )
          }
          confirmText={
            selectedApplication.nextStatus === "Accept" ? "Accept" : "Reject"
          }
          confirmColor={
            selectedApplication.nextStatus === "Accept" ? "green" : "red"
          }
        />
      )}
    </div>
  );
};

export default ViewApplications;
