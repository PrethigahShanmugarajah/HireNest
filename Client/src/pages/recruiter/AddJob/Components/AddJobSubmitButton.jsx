// Client / src / pages / recruiter / AddJob / Components / AddJobSubmitButton.jsx
import Button from "../../../../components/Button";
import { ClipLoader } from "react-spinners";

const AddJobSubmitButton = ({ loading }) => {
  return (
    <Button
      type="submit"
      className="w-28 mt-4"
      variant={"secondary"}
      disabled={loading}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <ClipLoader size={18} color="#FFFFFF" />
        </div>
      ) : (
        "Add"
      )}
    </Button>
  );
};

export default AddJobSubmitButton;
