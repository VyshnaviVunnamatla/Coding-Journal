import axios from "axios";

// 🔧 Hardcoded baseURL for production
const baseURL = "https://coding-journal.onrender.com";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export const authApi = (token) =>
  axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

// ✅ Now secured with token
export const reviewCode = async ({ code, language, token }) => {
  const client = authApi(token);
  const { data } = await client.post("/api/review", { code, language });
  return data;
};

export const fetchMyProblems = async (token) => {
  const client = authApi(token);
  const { data } = await client.get("/api/problems");
  return data;
};

export const addProblem = async (problem, token) => {
  const client = authApi(token);
  const { data } = await client.post("/api/problems", problem);
  return data;
};

export const deleteProblem = async (id, token) => {
  const client = authApi(token);
  const { data } = await client.delete(`/api/problems/${id}`);
  return data;
};

export default api;
