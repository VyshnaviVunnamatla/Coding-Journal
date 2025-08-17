import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { reviewCode } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function EditorPanel() {
  const { user, token } = useAuth(); // ✅ get user and token
  const [code, setCode] = useState("// write your code here");
  const [language, setLanguage] = useState("javascript");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");

  const onReview = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await reviewCode({ code, language, token });
      setSuggestions(data.suggestions || []);
      const el = document.getElementById("ai-review-placeholder");
      if (el)
        el.innerHTML =
          "<ul>" +
          (data.suggestions || []).map((s) => "<li>" + s + "</li>").join("") +
          "</ul>";
    } catch (e) {
      setError(e?.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ marginBottom: 10, display: "flex", gap: 8 }}>
        <select
          className="form-select w-auto"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
        <button
          className="btn btn-light btn-sm"
          onClick={onReview}
          disabled={loading}
        >
          {loading ? "Reviewing..." : "Review My Code"}
        </button>
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <Editor
          height="100%"
          defaultLanguage={language}
          theme="vs-dark"
          value={code}
          onChange={(v) => setCode(v || "")}
          options={{ minimap: { enabled: false }, fontSize: 14 }}
        />
      </div>
      {error && <div className="mt-2 alert alert-danger">{error}</div>}
    </div>
  );
}
