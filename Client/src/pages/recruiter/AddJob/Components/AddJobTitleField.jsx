import { InputField } from "../../../../components/FormField/InputField";

const AddJobTitleField = ({ title, setTitle }) => {
  return (
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
  );
};

export default AddJobTitleField;
