import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/pdf",
});

export default API;

export const compressPdf = async (file, quality) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("quality", quality);

  const { data } = await API.post("/compress", formData);

  return data;
};