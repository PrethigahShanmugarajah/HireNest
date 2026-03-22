// Client / src / pages / recruiter / AddJob / View / AddJob.jsx
import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import Button from "../../../../components/Button";
import {
  JobCategories,
  JobLevel,
  JobLocations,
} from "../../../../data/jobData";
import { InputField } from "../../../../components/FormField/InputField";
import { SelectInput } from "../../../../components/FormField/SelectInput";
import { useAppContext } from "../../../../context/AppContext";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Colombo");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner level");
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { CURRENCY } = useAppContext();

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
    <form className="container p-4 flex flex-col w-full items-start gap-3">
      <div className="w-full max-w-lg">
        <InputField
          label="Job Title"
          labelPosition="top"
          name="title"
          type="text"
          placeholder="Job Title"
          size="s"
          value={title}
          onChange={setTitle}
          required
        />
      </div>

      <div className="w-full max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-3xl">
        <p className="my-2">
          Job Description <span className="text-red-500 ml-1">*</span>
        </p>

        <div className="quill-focus">
          <div ref={editorRef}></div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-3xl">
        <div className="w-full sm:max-w-66">
          <SelectInput
            label="Job Category"
            options={categoryOptions}
            placeholder="Select Job Category"
            size="m"
            value={category}
            onChange={setCategory}
            labelClassName="mt-2"
            required
          />
        </div>

        <div className="w-full sm:max-w-49">
          <SelectInput
            label="Job Location"
            options={locationOptions}
            placeholder="Select Job Location"
            size="m"
            value={location}
            onChange={setLocation}
            required
            labelClassName="mt-2"
          />
        </div>

        <div className="w-full sm:max-w-53.5">
          <SelectInput
            label="Job Level"
            options={levelOptions}
            placeholder="Select Job Level"
            size="m"
            value={level}
            onChange={setLevel}
            required
            labelClassName="mt-2"
          />
        </div>
      </div>

      <div className="w-full sm:w-32 max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-3xl">
        <InputField
          label="Job Salary"
          labelPosition="top"
          name="salary"
          type="number"
          placeholder={`${CURRENCY} 2500`}
          size="s"
          value={salary}
          onChange={setSalary}
          min={0}
          required
          labelClassName="mt-2"
        />
      </div>

      <Button type="submit" className="w-28 mt-4" variant={"secondary"}>
        Add
      </Button>
    </form>
  );
};

export default AddJob;
