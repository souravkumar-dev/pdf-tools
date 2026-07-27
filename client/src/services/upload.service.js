import api from "./api";

export async function uploadPdf(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post("/pdf/upload", formData);

  return response.data;
}