import React from "react";

const sample = [
  { id: 1, title: "Two Sum", topics: ["Arrays"], difficulty: "Easy" },
  { id: 2, title: "Longest Substring Without Repeating Characters", topics: ["Strings", "Sliding Window"], difficulty: "Medium" },
  { id: 3, title: "Climbing Stairs", topics: ["Dynamic Programming"], difficulty: "Easy" }
];

export default function ProblemList() {
  return (
    <div className="row g-3">
      {sample.map(p => (
        <div key={p.id} className="col-md-4">
          <div className="card h-100 shadow-sm p-3">
            <h5 className="mb-2">{p.title}</h5>
            <div className="d-flex flex-wrap gap-2 mb-2">
              {p.topics.map((t, i) => (
                <span key={i} className="tag">{t}</span>
              ))}
            </div>
            <div className="text-muted">Difficulty: {p.difficulty}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
