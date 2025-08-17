import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Sidebar(){
  const { user, logout } = useAuth();
  return (
    <div className='sidebar'>
      <div className='logo'>Coding Journal</div>
      <input className='search' placeholder='Search' />
      <div className='menu'>
        <Link to='/'>🏠 Home</Link>
        <div className='section'>Topics</div>
        <Link to='/?topic=Arrays'>Arrays</Link>
        <Link to='/?topic=Strings'>Strings</Link>
        <Link to='/?topic=Trees'>Trees</Link>
      </div>
      <div style={{marginTop:'auto'}} className='menu'>
        <div className='section'>My Profile</div>
        {user ? (
          <>
            <Link to='/add-problem'>➕ Add Problem</Link>
            <button onClick={logout}>🚪 Logout</button>
          </>
        ) : (
          <>
            <Link to='/login'>🔑 Login</Link>
            <Link to='/register'>📝 Register</Link>
          </>
        )}
      </div>
    </div>
  )
}