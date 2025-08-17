import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchMyProblems } from '../services/api';

const sample = [
  { _id:'1', title:'Two Sum', topics:['Arrays'], difficulty:'Easy' },
  { _id:'2', title:'Longest Substring...', topics:['Strings','Sliding Window'], difficulty:'Medium' },
  { _id:'3', title:'Climbing Stairs', topics:['Dynamic Programming'], difficulty:'Easy' }
];

export default function ProblemList(){
  const { user, token } = useAuth();
  const [items, setItems] = useState(sample);

  useEffect(()=>{ const go = async ()=>{ if(!user || !token) return; try{ const data = await fetchMyProblems(token); if(Array.isArray(data) && data.length) setItems(data); }catch(e){} }; go(); }, [user, token]);

  return (
    <div className='row g-3'>
      {items.map(p=> (
        <div key={p._id||p.id} className='col-md-4'>
          <div className='panel p-3 h-100'>
            <h5 className='mb-2'>{p.title}</h5>
            <div className='d-flex flex-wrap gap-2 mb-2'>{(p.topics||[]).map((t,i)=><span key={i} className='tag'>{t}</span>)}</div>
            <div className='text-muted'>Difficulty: {p.difficulty}</div>
          </div>
        </div>
      ))}
    </div>
  );
}