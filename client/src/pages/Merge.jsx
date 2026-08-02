import { useState } from "react";
import toast from "react-hot-toast";
import Layout from "../layouts/Layout";
import MultiDropzone from "../components/pdf/MultiDropzone";
import { mergePdfs } from "../api/pdfApi";
import { arrayMove } from "@dnd-kit/sortable";
import { formatFileSize } from "../utils/formatFileSize";
import MergeResultCard from "../components/pdf/MergeResultCard";
import Button from "../components/common/Button";
import ProgressBar from "../components/common/ProgressBar";

function Merge() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(0);

  function handleFiles(selectedFiles) {
    const newFiles = selectedFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    setResult(null);

    toast.success(`${selectedFiles.length} PDF(s) added`);
  }

  function handleRemove(id) {
    setFiles((prev) => prev.filter((item) => item.id !== id));

    setResult(null);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setFiles((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      return arrayMove(items, oldIndex, newIndex);
    });
  }

  async function handleMerge() {
    if (files.length < 2) {
      return toast.error("Please select at least 2 PDFs.");
    }

    try {
      setLoading(true);
      setProgress(10);

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return prev;
          return prev + Math.floor(Math.random() * 8) + 2;
        });
      }, 250);

      const data = await mergePdfs(files.map((item) => item.file));
      clearInterval(timer);
      setProgress(100);

      setResult(data);

      toast.success("PDFs merged successfully.");
    } catch (error) {
      clearInterval(timer);
      setProgress(0);
      toast.error(error.response?.data?.message || "Merge failed");
    } finally {
      setLoading(false);

      setTimeout(() => {
        setProgress(0);
      }, 500);
    }
  }
  const totalSize = files.reduce((sum, item) => sum + item.file.size, 0);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Merge PDFs</h1>

      {files.length > 0 && (
        <div className="mb-6 rounded-lg border bg-gray-50 p-4">
          <p className="font-semibold">{files.length} PDF(s) Selected</p>

          <p className="text-gray-600">
            Total Size: {formatFileSize(totalSize)}
          </p>
        </div>
      )}

      <MultiDropzone
        files={files}
        onFileSelect={handleFiles}
        onRemoveFile={handleRemove}
        onDragEnd={handleDragEnd}
      />

      <Button
        onClick={handleMerge}
        disabled={loading || files.length < 2}
        className="mt-6"
      >
        {loading ? "Merging..." : "Merge PDFs"}
      </Button>
      {loading && <ProgressBar progress={progress} />}
      <MergeResultCard result={result} />
    </Layout>
  );
}

export default Merge;
