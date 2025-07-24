import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";


const API_BASE = "https://coding-journal-hqbn.onrender.com/api/problems";

function ProblemForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [outputText, setOutputText] = useState("");
  
  const { user } = useAuth();
  console.log("Auth Token:", user?.token);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`${API_BASE}/${id}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title);
          setDescription(data.description);
          setCode(data.code);
          setDifficulty(data.difficulty);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const problem = { title, description, code, difficulty };

    const res = await fetch(id ? `${API_BASE}/${id}` : API_BASE, {
      method: id ? "PUT" : "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(problem),
    });

    if (res.ok) {
      setOutputText(id ? "Problem updated successfully!" : "Problem created successfully!");
      //setTimeout(() => navigate("/"), 2000);
    } else setOutputText("Error saving problem. Please try again.");
  };

  return (
    <div className="add-page">
      <Card className="form-wrapper">
        <Card.Body>
          <h2>{id ? "Edit Problem" : "Add New Problem"}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Difficulty</Form.Label>
              <Form.Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Code</Form.Label>
              <Form.Control as="textarea" value={code} onChange={(e) => setCode(e.target.value)} rows={5} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Output</Form.Label>
              <Form.Control as="textarea" value={outputtext} onChange={(e) => setOutputText(e.target.value)} rows={4} readOnly />
            </Form.Group>
            <Button type="submit">{id ? "Update" : "Create"}</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProblemForm;
