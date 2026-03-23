// Client / src / pages / recruiter / AddJob / View / AddJob.jsx
import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import {
  JobCategories,
  JobLevel,
  JobLocations,
} from "../../../../data/jobData";
import { useAppContext } from "../../../../context/AppContext";
import { postJobApi } from "../Service/AddJobService";
import AddJobSelectFields from "../Components/AddJobSelectFields";
import AddJobTitleField from "../Components/AddJobTitleField";
import AddJobDescriptionEditor from "../Components/AddJobDescriptionEditor";
import AddJobSalaryField from "../Components/AddJobSalaryField";
import AddJobSubmitButton from "../Components/AddJobSubmitButton";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Colombo");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner level");
  const [salary, setSalary] = useState(0);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { companyToken } = useAppContext();

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

      const data = await postJobApi({
        title,
        description,
        location,
        salary,
        category,
        level,
        companyToken,
      });

      if (data.success) {
        resetForm();
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

      <AddJobSubmitButton loading={loading} />
    </form>
  );
};

export default AddJob;
