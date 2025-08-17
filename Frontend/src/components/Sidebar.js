import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <div className="sidebar">
      <h4 className="logo">Coding Journal</h4>
      <input type="text" className="search" placeholder="Search" />

      <div className="menu">
        <Link to="/">🏠 Home</Link>
        <div className="section">Topics</div>
        <Link to="/">Arrays</Link>
        <Link to="/">Strings</Link>
        <Link to="/">Trees</Link>
      </div>

      <div className="menu">
        <div className="section">My Profile</div>
        {user ? (
          <>
            <Link to="/add-problem">➕ Add Problem</Link>
            <button className="logout" onClick={logout}>🚪 Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">🔑 Login</Link>
            <Link to="/register">📝 Register</Link>
          </>
        )}
      </div>
    </div>
  );
}
