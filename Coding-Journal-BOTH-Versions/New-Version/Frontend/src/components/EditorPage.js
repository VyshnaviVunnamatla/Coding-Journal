import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { reviewCode } from "../services/api";

export default function EditorPage() {
  const [code, setCode] = useState("// write your code here");
  const [language, setLanguage] = useState("javascript");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");

  const onReview = async () => {
    setLoading(true);
    setError("");
    try {
      const { suggestions } = await reviewCode({ code, language });
      setSuggestions(suggestions || []);
    } catch (e) {
      setError(e?.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="mb-2 d-flex gap-2 align-items-center">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="form-select w-auto"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>
          <button className="btn btn-light btn-sm" onClick={onReview} disabled={loading}>
            {loading ? "Reviewing..." : "Review My Code"}
          </button>
        </div>
        <div className="border rounded shadow-sm" style={{ height: "55vh", borderColor: '#23293a' }}>
          <Editor
            height="100%"
            defaultLanguage={language}
            language={language}
            value={code}
            theme="vs-dark"
            onChange={(v) => setCode(v ?? "")}
            options={{ minimap: { enabled: false }, fontSize: 14 }}
          />
        </div>

        <div className="mt-3">
          <h6 className="mb-2">AI Review</h6>
          {error && <div className="alert alert-danger">{error}</div>}
          <ul className="list-group">
            {suggestions.map((s, i) => (
              <li key={i} className="list-group-item">{s}</li>
            ))}
          </ul>
          {!suggestions.length && !loading && (
            <div className="text-muted">No suggestions yet. Click "Review My Code".</div>
          )}
        </div>
      </div>
    </div>
  );
}
