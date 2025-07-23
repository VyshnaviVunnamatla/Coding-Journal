import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_BASE = "https://coding-journal-hqbn.onrender.com/api/problems";

function ProblemList() {
  const [problems, setProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");
  const { user, logout } = useAuth(); // 👈 Added logout
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await fetch(API_BASE, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        if (res.status === 401) {
          logout();
          navigate("/login");
          return;
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          console.error("Expected an array, got:", data);
          setProblems([]);
          return;
        }

        setProblems(data);
      } catch (err) {
        console.error("Fetch failed", err);
        setProblems([]);
      }
    };

    if (user) fetchProblems();
  }, [user, navigate, logout]);

  const handleEdit = (problem) => navigate(`/edit/${problem._id}`);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this problem?")) return;

    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (res.ok) setProblems(problems.filter((p) => p._id !== id));
      else alert("Failed to delete problem");
    } catch (err) {
      alert("Error deleting problem");
    }
  };

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = filterDifficulty ? problem.difficulty === filterDifficulty : true;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="App">
      <h2 className="mb-4 text-center">Your Coding Problems</h2>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
          >
            <option value="">All Difficulties</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </Form.Select>
        </Col>
      </Row>

      {filteredProblems.map((problem) => (
        <Card key={problem._id} className="mb-3">
          <Card.Body>
            <Card.Title>
              {problem.title}{" "}
              <span className="badge bg-secondary">{problem.difficulty}</span>
            </Card.Title>
            <Card.Text>{problem.description}</Card.Text>
            <pre>{problem.code}</pre>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="outline-primary" onClick={() => handleEdit(problem)}>
                Edit
              </Button>
              <Button variant="outline-danger" onClick={() => handleDelete(problem._id)}>
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default ProblemList;
