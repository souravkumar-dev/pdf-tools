import { useDropzone } from "react-dropzone";

function Dropzone({
  onFileSelect,
  selectedFile,
  onRemoveFile,
  multiple = false,
  title = "Drag PDF here or click to upload",
}) {
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple,
    maxSize: 52428800,
    noClick: !!selectedFile,
    onDrop: (acceptedFiles) => {
      if (!acceptedFiles.length) return;

      if (multiple) {
        onFileSelect(acceptedFiles);
      } else {
        onFileSelect(acceptedFiles[0]);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-gray-50 transition"
    >
      <input {...getInputProps()} />

      {!selectedFile ? (
        <p>{title}</p>
      ) : (
        <div className="space-y-3">
          <div className="text-5xl">📄</div>

          <h2 className="text-lg font-semibold text-green-600">PDF Selected</h2>

          <p className="font-medium break-all">{selectedFile.name}</p>

          <p className="text-gray-600">
            {(selectedFile.size / 1024).toFixed(2)} KB
          </p>

          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                open();
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Change PDF
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveFile();
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Remove PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropzone;
