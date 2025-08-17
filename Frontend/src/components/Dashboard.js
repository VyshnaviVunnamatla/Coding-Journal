import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Editor from "@monaco-editor/react";
import { reviewCode } from "../services/api";

export default function Dashboard() {
  const [code, setCode] = useState("// Write your solution...");
  const [review, setReview] = useState([]);

  const handleReview = async () => {
    try {
      const data = await reviewCode({ code, language: "javascript" });
      setReview(data.review.split("\n").filter(Boolean));
    } catch (e) {
      setReview(["❌ Failed to fetch review"]);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Coding Journal</h3>
          <button className="btn btn-primary" onClick={handleReview}>New Problem</button>
        </div>

        <div className="content-grid">
          <div className="editor-box">
            <Editor
              height="400px"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={(val) => setCode(val)}
            />
          </div>
          <div className="review-box">
            <h5>AI Review</h5>
            <ul>
              {review.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
