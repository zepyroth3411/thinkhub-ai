"use client";

import { useState } from "react";
import axios from "axios";
import { MdSummarize } from "react-icons/md";

export default function SummarizerModal() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setSummary(null);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/summarizer/predict`,
        { text },
        { headers: { "Content-Type": "application/json" } }
      );
      setSummary(response.data.summary);
    } catch (error) {
      console.error("❌ Error summarizing text:", error);
      setSummary("Error summarizing text.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder="Paste or type your text here to summarize..."
        className="w-full rounded-lg p-3 text-white bg-white/10 backdrop-blur-[10px] border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
      />
      <button
        onClick={handleSummarize}
        disabled={loading}
        className="w-full bg-white/20 backdrop-blur-[10px] border border-white/30 px-4 py-2 rounded-lg text-white font-semibold hover:bg-white/30 transition disabled:opacity-50"
      >
        {loading ? "Summarizing..." : "Summarize Text"}
      </button>

      {summary && (
        <div className="mt-4 px-4 py-2 rounded-lg text-white text-left w-full bg-indigo-500/20 border border-indigo-400">
          <MdSummarize className="text-3xl mb-2" />
          <p className="text-sm">{summary}</p>
        </div>
      )}
    </div>
  );
}
