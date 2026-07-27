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
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: true,
    maxSize: 52428800,

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
        <p className="text-center">{title}</p>
      ) : (
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext
            items={files.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {files.map((item) => (
                <SortableFileCard
                  key={item.id}
                  item={item}
                  onRemove={onRemoveFile}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}

export default MultiDropzone;
