import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProblemList from "./components/ProblemList";
import EditorPage from "./components/EditorPage";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#151925', borderBottom: '1px solid #23293a' }}>
        <div className="container">
          <Link className="navbar-brand" to="/">Coding Journal</Link>
          <div className="d-flex gap-2">
            <Link className="btn btn-outline-light btn-sm" to="/editor">Open Editor</Link>
          </div>
        </div>
      </nav>
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<ProblemList />} />
          <Route path="/editor" element={<EditorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
