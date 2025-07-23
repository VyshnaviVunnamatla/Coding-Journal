import React, { useEffect, useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://coding-journal-hqbn.onrender.com/api/problems";

function ProblemList() {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_BASE).then(res => res.json()).then(setProblems);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this problem?")) return;
    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    if (res.ok) setProblems(problems.filter(p => p._id !== id));
  };

  const getBadge = (level) => {
    const color = level === "Easy" ? "success" : level === "Medium" ? "warning" : "danger";
    return <Badge bg={color}>{level}</Badge>;
  };

  return (
    <div className="App">
      <h2>Saved Problems</h2>
      {problems.length === 0 ? (
        <p>No problems added yet.</p>
      ) : (
        problems.map(problem => (
          <Card key={problem._id} className="mb-3">
            <Card.Body>
              <Card.Title>{problem.title} {getBadge(problem.difficulty)}</Card.Title>
              <Card.Text>{problem.description}</Card.Text>
              <pre className="bg-light p-2">{problem.code}</pre>
              <Button variant="primary" className="me-2" onClick={() => navigate(`/edit-problem/${problem._id}`)}>Edit</Button>
              <Button variant="danger" onClick={() => handleDelete(problem._id)}>Delete</Button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

export default ProblemList;
