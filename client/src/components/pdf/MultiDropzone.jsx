import { useDropzone } from "react-dropzone";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { Upload } from "lucide-react";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableFileCard from "./SortableFileCard";

function MultiDropzone({
  files,
  onFileSelect,
  onRemoveFile,
  onDragEnd,
  title = "Drag PDFs here or click to upload",
}) {
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: true,
    maxSize: 52428800,
    noClick: true,
    onDrop: (acceptedFiles) => {
      if (!acceptedFiles.length) return;

      onFileSelect(acceptedFiles);
    },
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed rounded-lg p-8 cursor-pointer hover:bg-gray-50 transition"
    >
      <input {...getInputProps()} />

      {files.length === 0 ? (
        <div
          onClick={open}
          className="flex flex-col items-center justify-center py-10 cursor-pointer"
        >
          <Upload size={48} className="text-blue-600 mb-4" />

          <h3 className="text-xl font-semibold">Drag & Drop PDFs Here</h3>

          <p className="text-gray-500 mt-2">or click to browse your files</p>

          <p className="text-sm text-gray-400 mt-3">Maximum file size: 50 MB</p>
        </div>
      ) : (
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext
            items={files.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {files.map((item, index) => (
                <SortableFileCard
                  key={item.id}
                  item={item}
                  index={index}
                  onRemove={onRemoveFile}
                />
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  open();
                }}
                className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
              >
                + Add More PDFs
              </button>
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}

export default MultiDropzone;
