import React, { useState } from "react";
import toast from "react-hot-toast";
import Layout from "../layouts/Layout";
import Dropzone from "../components/Dropzone";
import { compressPdf } from "../api/pdfApi";

function Compress() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [quality, setQuality] = useState("balanced");

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
      const data = await compressPdf(selectedFile, quality);

      console.log("Selected Quality:", quality);
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

  function handleRemoveFile() {
    setSelectedFile(null);
    setResult(null);

    toast.success("PDF removed");
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Compress PDF</h1>

      <Dropzone
        onFileSelect={handleUpload}
        selectedFile={selectedFile}
        onRemoveFile={handleRemoveFile}
      />
      <div className="mt-6 border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Compression Quality</h2>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="quality"
              value="best"
              checked={quality === "best"}
              onChange={(e) => setQuality(e.target.value)}
            />
            <div>
              <p className="font-medium">Best Quality</p>
              <p className="text-sm text-gray-500">
                Highest visual quality, larger file
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="quality"
              value="balanced"
              checked={quality === "balanced"}
              onChange={(e) => setQuality(e.target.value)}
            />
            <div>
              <p className="font-medium">Balanced (Recommended)</p>
              <p className="text-sm text-gray-500">
                Good quality with smaller size
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="quality"
              value="maximum"
              checked={quality === "maximum"}
              onChange={(e) => setQuality(e.target.value)}
            />
            <div>
              <p className="font-medium">Maximum Compression</p>
              <p className="text-sm text-gray-500">
                Smallest file size, reduced image quality
              </p>
            </div>
          </label>
        </div>
      </div>

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
