// Client / src / pages / recruiter / AddJob / Components / AddJobSelectFields.jsx
import { SelectInput } from "../../../../components/FormField/SelectInput";

const AddJobSelectFields = ({
  category,
  setCategory,
  location,
  setLocation,
  level,
  setLevel,
  categoryOptions,
  locationOptions,
  levelOptions,
}) => {
  return (
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
  );
};

export default AddJobSelectFields;
