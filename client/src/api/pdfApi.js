import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api/pdf",
  baseURL: import.meta.env.VITE_API_URL,
});

export default API;

export const compressPdf = async (file, quality, onUploadProgress) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("quality", quality);

  const response = await API.post("/compress", formData, {
    onUploadProgress,
    responseType: "blob",
  });

  return {
    blob: response.data,
    originalSize: Number(response.headers["x-original-size"]),
    compressedSize: Number(response.headers["x-compressed-size"]),
    savedBytes: Number(response.headers["x-saved-bytes"]),
    savedPercentage: response.headers["x-saved-percentage"],
  };
};

export async function mergePdfs(files) {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await API.post("/merge", formData, {
    responseType: "blob",
  });

  return {
    blob: response.data,
    totalFiles: Number(response.headers["x-total-files"]),
    mergedSize: Number(response.headers["x-merged-size"]),
  };
}
