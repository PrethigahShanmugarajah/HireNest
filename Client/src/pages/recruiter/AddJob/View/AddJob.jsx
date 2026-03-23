// Client / src / pages / recruiter / AddJob / View / AddJob.jsx
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Quill from "quill";
import {
  JobCategories,
  JobLevel,
  JobLocations,
} from "../../../../data/jobData";
import { useAppContext } from "../../../../context/AppContext";
import { postJobApi, updateJobApi } from "../Service/AddJobService";
import AddJobSelectFields from "../Components/AddJobSelectFields";
import AddJobTitleField from "../Components/AddJobTitleField";
import AddJobDescriptionEditor from "../Components/AddJobDescriptionEditor";
import AddJobSalaryField from "../Components/AddJobSalaryField";
import AddJobSubmitButton from "../Components/AddJobSubmitButton";
import { fetchCompanyPostedJobs } from "../../../../services/fetch";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Colombo");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner level");
  const [salary, setSalary] = useState(0);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { navigate, setJobs, companyToken } = useAppContext();
  const routerLocation = useLocation();
  const { id } = useParams();
  const editJob = routerLocation.state?.job;
  const isEdit = Boolean(editJob && id);

  const resetForm = () => {
    setTitle("");
    setSalary(0);
    setLocation("Colombo");
    setCategory("Programming");
    setLevel("Beginner level");

    if (quillRef.current) {
      quillRef.current.root.innerHTML = "";
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const description = quillRef.current.root.innerHTML;

      const data = isEdit
        ? await updateJobApi({
            id,
            title,
            description,
            location,
            salary,
            category,
            level,
            companyToken,
          })
        : await postJobApi({
            title,
            description,
            location,
            salary,
            category,
            level,
            companyToken,
          });

      if (data.success) {
        if (isEdit) {
          const updatedJobs = await fetchCompanyPostedJobs(companyToken);
          console.log("Updated Company Posted Jobs:", updatedJobs);
          setJobs(
            (updatedJobs?.jobsData || []).sort(
              (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
            ),
          );
          navigate("/dashboard/manage-jobs");
        } else {
          resetForm();
        }
      }
    } catch {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  useEffect(() => {
    if (isEdit && editJob && quillRef.current) {
      setTitle(editJob.title || "");
      setLocation(editJob.location || "Colombo");
      setCategory(editJob.category || "Programming");
      setLevel(editJob.level || "Beginner level");
      setSalary(editJob.salary || 0);
      quillRef.current.root.innerHTML = editJob.description || "";
    }
  }, [isEdit, editJob]);

  const categoryOptions = JobCategories.map((item) => ({
    value: item,
    label: item,
  }));

  const locationOptions = JobLocations.map((item) => ({
    value: item,
    label: item,
  }));

  const levelOptions = JobLevel.map((item) => ({
    value: item,
    label: item,
  }));

  return (
    <form
      onSubmit={onSubmitHandler}
      className="container p-4 flex flex-col w-full items-start gap-3"
    >
      <h2 className="text-2xl font-semibold mb-2">
        {isEdit ? "Update Job" : "Add Job"}
      </h2>

      <AddJobTitleField title={title} setTitle={setTitle} />

      <AddJobDescriptionEditor editorRef={editorRef} />

      <AddJobSelectFields
        category={category}
        setCategory={setCategory}
        location={location}
        setLocation={setLocation}
        level={level}
        setLevel={setLevel}
        categoryOptions={categoryOptions}
        locationOptions={locationOptions}
        levelOptions={levelOptions}
      />

      <AddJobSalaryField salary={salary} setSalary={setSalary} />

      <AddJobSubmitButton loading={loading} isEdit={isEdit} />
    </form>
  );
};

export default AddJob;
