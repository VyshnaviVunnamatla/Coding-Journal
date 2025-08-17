import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export const reviewCode = async ({ code, language }) => {
  const { data } = await api.post("/api/review", { code, language });
  return data; // { suggestions: [...] }
};

export default api;
