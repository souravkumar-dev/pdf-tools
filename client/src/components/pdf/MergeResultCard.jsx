import { formatFileSize } from "../../utils/formatFileSize";

function MergeResultCard({ result }) {
  if (!result) return null;

  return (
    <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-green-700">
        ✅ PDFs Merged Successfully
      </h2>

      <div className="mt-4 space-y-2">
        <p>
          <strong>Files Merged:</strong> {result.totalFiles}
        </p>

        <p>
          <strong>Merged Size:</strong>{" "}
          {formatFileSize(result.mergedSize)}
        </p>
      </div>

      <a
        href={`http://localhost:5000${result.downloadUrl}`}
        download
        className="inline-block mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition"
      >
        Download Merged PDF
      </a>
    </div>
  );
}

export default MergeResultCard;