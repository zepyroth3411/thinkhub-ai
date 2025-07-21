"use client";

import { useState } from "react";
import axios from "axios";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

export default function SpamModal() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckSpam = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult(null);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/spam/predict`,
        { text },
        { headers: { "Content-Type": "application/json" } }
      );
      setResult(response.data);
    } catch (error) {
      console.error("❌ Error while predicting:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        placeholder="Type the message to analyze..."
        className="w-full rounded-lg p-3 text-white bg-white/10 backdrop-blur-[10px] border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
      />
      <button
        onClick={handleCheckSpam}
        disabled={loading}
        className="w-full bg-white/20 backdrop-blur-[10px] border border-white/30 px-4 py-2 rounded-lg text-white font-semibold hover:bg-white/30 transition disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Detect Spam"}
      </button>

      {result && (
        <div
          className={`mt-4 px-4 py-3 rounded-lg text-white text-center w-full ${
            result.prediction === "Spam"
              ? "bg-red-500/30 border border-red-500"
              : "bg-green-500/30 border border-green-500"
          }`}
        >
          <MdOutlineMarkEmailUnread className="text-3xl mx-auto mb-2" />
          <p className="text-lg font-bold">
            {result.prediction === "Spam" ? "Spam Detected" : "Not Spam"}
          </p>
        </div>
      )}
    </div>
  );
}
