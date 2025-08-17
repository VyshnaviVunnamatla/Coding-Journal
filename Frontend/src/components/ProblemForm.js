import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/api';
export default function ProblemForm(){
  const [title,setTitle]=useState(''); const [topics,setTopics]=useState(''); const [difficulty,setDifficulty]=useState('Easy'); const [msg,setMsg]=useState('');
  const { token } = useAuth();
  const onSubmit = async (e)=>{ e.preventDefault(); setMsg(''); try{ const client = authApi(token); await client.post('/api/problems',{ title, topics: topics.split(',').map(s=>s.trim()).filter(Boolean), difficulty }); setMsg('Problem created'); setTitle(''); setTopics(''); setDifficulty('Easy'); }catch(e){ setMsg(e?.response?.data?.error || e.message); } };
  return (
    <div style={{maxWidth:720, margin:'24px auto'}}>
      <h3>New Problem</h3>
      {msg && <div className='alert alert-info'>{msg}</div>}
      <form onSubmit={onSubmit} className='d-grid gap-3'>
        <input className='form-control' placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)} />
        <input className='form-control' placeholder='Topics (comma separated)' value={topics} onChange={e=>setTopics(e.target.value)} />
        <select className='form-select' value={difficulty} onChange={e=>setDifficulty(e.target.value)}>
          <option>Easy</option><option>Medium</option><option>Hard</option>
        </select>
        <button className='btn btn-light'>Save</button>
      </form>
    </div>
  );
}