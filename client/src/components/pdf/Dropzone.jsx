import { useDropzone } from "react-dropzone";
import { Upload, FileText, Trash2, RefreshCw } from "lucide-react";
import Button from "../common/Button";

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
      console.log("Accepted Files:", acceptedFiles);
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
      className="md:mx-40 border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-gray-50 transition"
    >
      <input {...getInputProps()} />

      {!selectedFile ? (
        <div className="flex flex-col items-center justify-center py-10">
          <Upload size={48} className="text-blue-600 mb-4" />

          <h3 className="text-xl font-semibold">Drag & Drop PDF Here</h3>

          <p className="text-gray-500 mt-2">or click to browse your file</p>

          <p className="text-sm text-gray-400 mt-3">Maximum file size: 50 MB</p>
        </div>
      ) : (
        <div className="space-y-4 rounded-xl border border-green-200 bg-green-50 p-6">
          <FileText size={56} className="text-red-500 mx-auto" />

          <h2 className="text-xl font-bold text-green-700">PDF Selected</h2>

          <p className="font-medium text-gray-800 break-all">
            {selectedFile.name}
          </p>

          <p className="text-sm text-gray-500">
            {(selectedFile.size / 1024).toFixed(2)} KB
          </p>

          <div className="flex justify-center gap-4">
            <Button
              type="button"
              variant="primary"
              leftIcon={<RefreshCw size={18} />}
              onClick={(e) => {
                e.stopPropagation();
                open();
              }}
            >
              Change PDF
            </Button>

            <Button
              type="button"
              variant="danger"
              leftIcon={<Trash2 size={18} />}
              onClick={(e) => {
                e.stopPropagation();
                onRemoveFile();
              }}
            >
              Remove PDF
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropzone;
