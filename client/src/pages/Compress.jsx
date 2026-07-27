import React, { useState } from "react";
import toast from "react-hot-toast";
import Layout from "../layouts/Layout";
import Dropzone from "../components/Dropzone";
import { compressPdf } from "../api/pdfApi";

function Compress() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  function handleUpload(file) {
    setSelectedFile(file);
    toast.success("PDF selected successfully");
  }

  async function handleCompress() {
    if (!selectedFile) {
      return toast.error("Please select a PDF first.");
    }

    try {
      setLoading(true);
      const data = await compressPdf(selectedFile);
      console.log(data);
      setResult(data);
      toast.success("PDF compressed successfully");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Compression failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Compress PDF</h1>

      <Dropzone onFileSelect={handleUpload} />

      <div className="mt-6">
        <button
          onClick={handleCompress}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded disabled:bg-gray-400"
        >
          {loading ? "Compressing..." : "Compress PDF"}
        </button>
      </div>
      
      {result && (
        <div className="mt-8 border rounded-lg p-6 w-full max-w-xl">
          <h2 className="text-2xl font-semibold mb-4">
            Compression Successful
          </h2>

          <div className="space-y-2">
            <p>
              <strong>Original Size:</strong>{" "}
              {(result.originalSize / 1024 / 1024).toFixed(2)} MB
            </p>

            <p>
              <strong>Compressed Size:</strong>{" "}
              {(result.compressedSize / 1024).toFixed(2)} KB
            </p>

            <p>
              <strong>Saved:</strong> {result.savedPercentage}%
            </p>

            <div className="mt-6">
              <a
                href={`http://localhost:5000${result.downloadUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
                  Download PDF
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Compress;
