import { InputField } from "../../../../components/FormField/InputField";
import { useAppContext } from "../../../../context/AppContext";

const AddJobSalaryField = ({ salary, setSalary }) => {
  const { CURRENCY } = useAppContext();

  return (
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
  );
};

export default AddJobSalaryField;
