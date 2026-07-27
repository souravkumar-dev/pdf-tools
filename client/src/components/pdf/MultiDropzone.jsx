import { useDropzone } from "react-dropzone";
import { DndContext, closestCenter } from "@dnd-kit/core";

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
        <div onClick={open} className="text-center py-8 cursor-pointer">
          <p>{title}</p>
        </div>
      ) : (
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext
            items={files.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {files.map((item,index) => (
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
