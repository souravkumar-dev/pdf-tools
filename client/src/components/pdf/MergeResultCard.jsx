import { formatFileSize } from "../../utils/formatFileSize";

function MergeResultCard({ result }) {
  if (!result) return null;

  function handleDownload() {
    if (!result.blob) {
      console.error("Merged PDF blob not found.");
      return;
    }

    const blobUrl = window.URL.createObjectURL(result.blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "merged-pdf.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Release the temporary browser URL
    window.URL.revokeObjectURL(blobUrl);
  }

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

      <button
        onClick={handleDownload}
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
      >
        Download Merged PDF
      </button>
    </div>
  );
}

export default MergeResultCard;