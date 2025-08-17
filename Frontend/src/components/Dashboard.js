import React from 'react';
import Sidebar from './Sidebar';
import EditorPanel from './EditorPanel';
export default function Dashboard(){ return (
  <div className='app-layout'>
    <Sidebar />
    <div className='main'>
      <div className='header-row'>
        <h3>Coding Journal</h3>
        <div><a className='btn btn-primary' href='/add-problem'>New Problem</a></div>
      </div>
      <div className='content-grid'>
        <div className='panel editor-box'><EditorPanel /></div>
        <div className='panel review-box'><h5>AI Review</h5><div id='ai-review-placeholder'>Run a review to see suggestions.</div></div>
      </div>
    </div>
  </div>
);}