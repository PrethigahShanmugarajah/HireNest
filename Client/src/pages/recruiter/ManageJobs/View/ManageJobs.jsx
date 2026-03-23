// Client / src / pages / recruiter / ManageJobs / View / ManageJobs.jsx
import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../../../context/AppContext";
import Button from "../../../../components/Button";
import {
  changeJobVisibilityApi,
  deleteJobApi,
  fetchCompanyJobsApi,
} from "../Service/ManageJobsService";
import ConfirmPopup from "../../../../components/ConfirmPopup";
import Pagination from "../../../../components/Pagination";
import ManageJobsTable from "../Components/ManageJobsTable";

const ManageJobs = () => {
  const {
    navigate,
    jobs,
    setJobs,
    companyToken,
    currentPage,
    setCurrentPage,
    getPaginatedData,
  } = useAppContext();

  const [selectedJob, setSelectedJob] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [visibilityLoading, setVisibilityLoading] = useState(null);
  const [showVisibilityPopup, setShowVisibilityPopup] = useState(false);
  const [selectedVisibilityJob, setSelectedVisibilityJob] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchCompanyJobs = useCallback(async () => {
    try {
      const jobsData = await fetchCompanyJobsApi(companyToken);
      setJobs(jobsData);
    } catch {
      //
    }
  }, [companyToken, setJobs]);

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken, fetchCompanyJobs]);

  const openVisibilityPopup = (job) => {
    setSelectedVisibilityJob(job);
    setShowVisibilityPopup(true);
  };

  const closeVisibilityPopup = () => {
    if (visibilityLoading) return;
    setSelectedVisibilityJob(null);
    setShowVisibilityPopup(false);
  };

  const changeJobVisibilityService = async (id) => {
    if (!id) return;

    try {
      setVisibilityLoading(id);

      const data = await changeJobVisibilityApi(id, companyToken);
      if (data?.success) {
        await fetchCompanyJobs();
        setShowVisibilityPopup(false);
        setSelectedJob(null);
      }
    } catch {
      //
    } finally {
      setVisibilityLoading(null);
    }
  };

  const openDeletePopup = (job) => {
    setSelectedJob(job);
    setShowDeletePopup(true);
  };

  const closeDeletePopup = () => {
    if (deleteLoading) return;
    setSelectedJob(null);
    setShowDeletePopup(false);
  };

  const deleteJobService = async (id) => {
    if (!selectedJob?._id) return;

    try {
      setDeleteLoading(selectedJob._id);

      const data = await deleteJobApi(id, companyToken);
      if (data?.success) {
        fetchCompanyJobs();
        setShowDeletePopup(false);
        setSelectedJob(null);
      }
    } catch {
      //
    } finally {
      setDeleteLoading(null);
    }
  };

  const { totalPages, paginatedData } = getPaginatedData(
    jobs,
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

  const openEditJobPage = (job) => {
    navigate(`/dashboard/update-job/${job._id}`, {
      state: { job, isEdit: true },
    });
  };

  return (
    <>
      <div className="container p-4 max-w-6xl">
        <ManageJobsTable
          paginatedData={paginatedData}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          visibilityLoading={visibilityLoading}
          deleteLoading={deleteLoading}
          openVisibilityPopup={openVisibilityPopup}
          openDeletePopup={openDeletePopup}
          openEditJobPage={openEditJobPage}
          pageLoading={pageLoading}
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

        <div className="mt-4 flex justify-end">
          <Button
            onClick={() => navigate("/dashboard/add-job")}
            variant={"secondary"}
          >
            Add new job
          </Button>
        </div>
      </div>

      {showDeletePopup && selectedJob && (
        <ConfirmPopup
          onClose={closeDeletePopup}
          onConfirm={() => deleteJobService(selectedJob._id)}
          loading={deleteLoading === selectedJob._id}
          item={selectedJob.title}
          title="Delete Job"
          description={
            <>
              Are you sure you want to delete <b>{selectedJob.title}</b>?
              <br />
              This action cannot be undone.
            </>
          }
          confirmText="Delete"
          closeText="Cancel"
        />
      )}

      {showVisibilityPopup && selectedVisibilityJob && (
        <ConfirmPopup
          onClose={closeVisibilityPopup}
          onConfirm={() =>
            changeJobVisibilityService(selectedVisibilityJob._id)
          }
          loading={visibilityLoading === selectedVisibilityJob._id}
          item={selectedVisibilityJob.title}
          title={selectedVisibilityJob.visible ? "Hide Job" : "Show Job"}
          description={
            <>
              Are you sure you want to{" "}
              <b>{selectedVisibilityJob.visible ? "hide" : "show"}</b>{" "}
              <b>{selectedVisibilityJob.title}</b>?
            </>
          }
          confirmText={selectedVisibilityJob.visible ? "Hide" : "Show"}
          closeText="Cancel"
        />
      )}
    </>
  );
};

export default ManageJobs;
