import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProblemForm from "./components/ProblemForm";
import ProblemList from "./components/ProblemList";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProblemList />} />
        <Route path="/add-problem" element={<ProblemForm />} />
        <Route path="/edit-problem/:id" element={<ProblemForm />} />
      </Routes>
    </Router>
  );
}

export default App;
