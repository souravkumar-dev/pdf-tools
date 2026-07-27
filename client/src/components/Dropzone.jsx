import { useDropzone } from "react-dropzone";

function Dropzone({
  onFileSelect,
  multiple = false,
  title = "Drag PDF here or click to upload",
}) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple,
    maxSize: 52428800,

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

      <p>{title}</p>
    </div>
  );
}

export default Dropzone;