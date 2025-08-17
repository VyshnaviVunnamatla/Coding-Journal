// src/services/api.js
import axios from "axios";

const baseURL =
  process.env.REACT_APP_API_BASE_URL ||
  (typeof window !== "undefined" &&
    window.__ENV__ &&
    window.__ENV__.REACT_APP_API_BASE_URL) ||
  "http://localhost:5000";

// ✅ default client for public endpoints (register, login)
const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// ✅ helper to include token
const authApi = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};

// ===================== AUTH =====================
export const registerUser = async (userData) => {
  const { data } = await api.post("/api/auth/register", userData);
  return data;
};

export const loginUser = async (credentials) => {
  const { data } = await api.post("/api/auth/login", credentials);
  return data;
};

// ===================== PROBLEMS =====================
export const fetchMyProblems = async () => {
  const client = authApi();
  const { data } = await client.get("/api/problems");
  return data;
};

export const addProblem = async (problem) => {
  const client = authApi();
  const { data } = await client.post("/api/problems", problem);
  return data;
};

export const deleteProblem = async (id) => {
  const client = authApi();
  const { data } = await client.delete(`/api/problems/${id}`);
  return data;
};

// ===================== AI REVIEW =====================
export const reviewCode = async ({ code, language }) => {
  const client = authApi();
  const { data } = await client.post("/api/review", { code, language });
  return data;
};

export default api;
