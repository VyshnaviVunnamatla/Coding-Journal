import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/review", async (req, res) => {
  const { code, language = "javascript" } = req.body || {};
  const apiKey = process.env.OPENAI_API_KEY;

  if (!code || code.trim().length === 0) {
    return res.status(400).json({ error: "Code is required." });
  }

  // Fallback mock if no key provided
  if (!apiKey) {
    return res.json({
      suggestions: [
        "Handle edge cases (empty inputs, null checks).",
        "Document time and space complexity.",
        "Prefer early returns to reduce nesting.",
        "Add unit tests for typical and boundary cases.",
        "Validate inputs and sanitize data."
      ]
    });
  }

  try {
    const prompt = `You are a strict senior engineer. Review the following ${language} code and give 5 concise bullet points of improvements. Respond as a JSON array of strings only.\n\nCODE:\n${code}`;

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2
      })
    });

    if (!resp.ok) {
      const text = await resp.text();
      return res.status(500).json({ error: "OpenAI API failed", detail: text });
    }

    const data = await resp.json();
    const content = data.choices?.[0]?.message?.content?.trim() || "[]";
    let suggestions;
    try {
      suggestions = JSON.parse(content);
      if (!Array.isArray(suggestions)) throw new Error("not array");
    } catch {
      suggestions = content.split("\n").filter(Boolean).slice(0, 5);
    }

    return res.json({ suggestions });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Review failed", detail: err.message });
  }
});

export default router;
