const AddJobDescriptionEditor = ({ editorRef }) => {
  return (
    <div className="w-full max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-3xl">
      <p className="my-2">
        Job Description <span className="text-red-500 ml-1">*</span>
      </p>

      <div className="quill-focus">
        <div ref={editorRef}></div>
      </div>
    </div>
  );
};

export default AddJobDescriptionEditor;
