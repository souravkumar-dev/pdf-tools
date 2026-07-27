import { useState } from "react";
import toast from "react-hot-toast";
import Layout from "../layouts/Layout";
import MultiDropzone from "../components/pdf/MultiDropzone";
import { mergePdfs } from "../api/pdfApi";
import { arrayMove } from "@dnd-kit/sortable";

function Merge() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  function handleFiles(selectedFiles) {
    const newFiles = selectedFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    toast.success(`${selectedFiles.length} PDF(s) added`);
  }

  function handleRemove(id) {
    setFiles((prev) => prev.filter((item) => item.id !== id));
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

      const data = await mergePdfs(files.map((item) => item.file));

      setResult(data);

      toast.success("PDFs merged successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Merge failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Merge PDFs</h1>

      <MultiDropzone
        files={files}
        onFileSelect={handleFiles}
        onRemoveFile={handleRemove}
        onDragEnd={handleDragEnd}
      />

      <button
        onClick={handleMerge}
        disabled={loading || files.length < 2}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? "Merging..." : "Merge PDFs"}
      </button>
    </Layout>
  );
}

export default Merge;
