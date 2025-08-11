import React, { useRef, useState } from "react";
import axios from "axios";
import { FiSend, FiRotateCcw, FiMessageCircle } from "react-icons/fi";

export default function ChatbotQA({ title = "Chatbot" }) {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const textareaRef = useRef(null);

  const handleClear = () => {
    setPrompt("");
    setAnswer("");
    setError(null);
    textareaRef.current?.focus();
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!prompt.trim() || loading) return;

    const url = `${process.env.NEXT_PUBLIC_API_BASE}/api/chatbot/ask`;
    const payload = { question: prompt.trim() };

    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });
      const botText = data?.current?.bot || data?.response || "";
      setAnswer(botText);
    } catch (err) {
      console.error("❌ Chatbot request failed:", err);
      setError("No se pudo consultar el chatbot");
    } finally {
      setLoading(false);
      setPrompt("");
      textareaRef.current?.focus();
    }
  };

  return (
    <div className="text-white w-full">
      <div className="flex items-center gap-2 mb-3">
        <FiMessageCircle className="h-5 w-5" />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <div className="p-4 rounded-xl border border-white/10 bg-zinc-800/50">
        <p className="text-sm text-zinc-400 mb-1">Bot reply:</p>
        <div className="text-sm text-zinc-100 whitespace-pre-line min-h-[120px] max-h-56 overflow-y-auto pr-2">
          {answer || "Waiting for a question…"}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your question for the chatbot…"
          className="min-h-[140px] w-full resize-y rounded-xl border border-white/10 bg-zinc-800/60 px-3 py-3 placeholder:text-zinc-500 focus:border-indigo-400/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
        {error && <p className="-mt-1 text-sm text-red-400">{error}</p>}
        <div className="mt-1 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/5"
          >
            <FiRotateCcw className="h-4 w-4" />
            Clear
          </button>
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-700 px-4 py-2 text-sm font-medium text-white transition enabled:hover:bg-zinc-600 disabled:opacity-50"
          >
            <FiSend className="h-4 w-4" />
            {loading ? "Sending…" : "Ask"}
          </button>
        </div>
      </form>
    </div>
  );
}
