import axios from 'axios';
const baseURL = process.env.REACT_APP_API_BASE_URL || (typeof window !== 'undefined' && window.__ENV__ && window.__ENV__.REACT_APP_API_BASE_URL) || 'http://localhost:5000';
const api = axios.create({ baseURL, headers:{'Content-Type':'application/json'} });
export const authApi = (token)=> axios.create({ baseURL, headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` } });
export const reviewCode = async ({code, language})=> { const { data } = await api.post('/api/review',{ code, language }); return data; };
export const fetchMyProblems = async (token)=> { const client = authApi(token); const { data } = await client.get('/api/problems'); return data; };
export default api;
