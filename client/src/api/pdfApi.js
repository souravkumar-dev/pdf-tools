import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/pdf",
});

export default API;

export const compressPdf = async (file, quality, onUploadProgress) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("quality", quality);

  const { data } = await API.post("/compress", formData, {
    onUploadProgress,
  });

  return data;
};

export async function mergePdfs(files) {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const { data } = await API.post("/merge", formData);

  return data;
}
