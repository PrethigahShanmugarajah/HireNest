import { Upload } from "lucide-react";
import { FileInputField } from "../../../../components/FormField/FileInputField";
import Button from "../../../../components/Button";
import { ClipLoader } from "react-spinners";

const ApplicationResumeSection = ({
  isEdit,
  userData,
  resume,
  setResume,
  setIsEdit,
  updateUserResumeService,
  saveLoading,
}) => {
  return (
    <>
      <h2 className="text-xl font-semibold">Your Resume</h2>
      <div className="flex gap-2 mb-6 mt-3">
        {isEdit || (userData && userData?.resume === "") ? (
          <>
            <FileInputField
              name="resumeUpload"
              accept="application/pdf"
              size="m"
              trigger
              triggerText={resume ? resume.name : "Select Resume"}
              TriggerIcon={Upload}
              value={resume}
              onChange={(files) => setResume(files?.[0] || null)}
              triggerClassName="bg-purple-100 text-purple-600 border-purple-200 hover:bg-purple-200"
            />

            <Button
              onClick={updateUserResumeService}
              variant="primary"
              color="green"
              disabled={saveLoading}
              className="min-w-20"
            >
              {saveLoading ? (
                <div className="flex items-center justify-center">
                  <ClipLoader size={18} color="#FFFFFF" />
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </>
        ) : (
          <div className="flex gap-2">
            <a
              className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg"
              href=""
            >
              Resume
            </a>

            <Button onClick={() => setIsEdit(true)} variant={"text"}>
              Edit
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ApplicationResumeSection;
