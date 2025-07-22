"use client";

import { useState } from "react";
import axios from "axios";
import { MdVolumeUp } from "react-icons/md";
import useTextToSpeech from "@/src/hooks/useTextToSpeech";

export default function SummarizerModal() {
  const { speak } = useTextToSpeech();
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  const handleSummarize = async () => {
    if (!text.trim()) return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/summarizer/predict`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSummary(response.data.summary || "No summary generated");
    } catch (error) {
      console.error("❌ Error summarizing:", error);
      setSummary("Error summarizing text.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <textarea
        className="w-full rounded-md p-4 bg-zinc-800 text-white placeholder-gray-400"
        rows={6}
        placeholder="Paste or type your text here to summarize..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handleSummarize}
        className="bg-zinc-700 hover:bg-zinc-600 text-white font-semibold py-2 px-4 rounded"
      >
        Summarize Text
      </button>

      {summary && (
        <div className="bg-black/40 border border-white/10 rounded-md p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Summary</h3>
            <button
              onClick={() => speak(summary, "en-US")}
              className="text-white text-2xl hover:text-gray-300"
              title="Listen"
            >
              <MdVolumeUp />
            </button>
          </div>
          <p className="text-white/80">{summary}</p>
        </div>
      )}
    </div>
  );
}
