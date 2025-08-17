import React, { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [err,setErr]=useState('');
  const { login } = useAuth(); const navigate = useNavigate();
  const onSubmit = async (e)=>{ e.preventDefault(); setErr(''); try{ const { data } = await api.post('/api/auth/login',{ email, password }); login(data.user, data.token); navigate('/'); }catch(e){ setErr(e?.response?.data?.error || e.message); } };
  return (
    <div style={{maxWidth:420, margin:'24px auto'}}>
      <h3>Login</h3>
      {err && <div className='alert alert-danger'>{err}</div>}
      <form onSubmit={onSubmit} className='d-grid gap-3'>
        <input className='form-control' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />
        <input className='form-control' placeholder='Password' type='password' value={password} onChange={e=>setPassword(e.target.value)} />
        <button className='btn btn-light'>Login</button>
      </form>
    </div>
  );
}