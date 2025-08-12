// components/ChatbotHistoryPanel.jsx
"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { FaHistory } from "react-icons/fa";

/**
 * ChatbotHistoryPanel
 * - Carga el historial desde el backend (chatlog.json vía /api/chatbot/history)
 * - Renderiza el historial con scroll
 *
 * Props:
 * - refreshKey?: any                // cambia este valor para forzar refetch (ej. ++ al recibir respuesta)
 * - onReuseQuestion?: (text) => {}  // opcional: callback para reusar pregunta
 * - title?: string                  // título del panel
 */
export default function ChatbotHistoryPanel({
  refreshKey,
  onReuseQuestion,
  title = "Recent Q&A",
}) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/chatbot/history`
      );
      setHistory(Array.isArray(data?.recent_history) ? data.recent_history : []);
    } catch (e) {
      console.error("❌ Error fetching history:", e);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // carga inicial + refetch al cambiar refreshKey
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory, refreshKey]);

  return (
    <div className="text-white w-[360px] max-w-full">
      <div className="flex items-center gap-2 mb-3">
        <FaHistory className="h-4 w-4" />
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>

      <div className="max-h-80 overflow-y-auto pr-2 rounded-xl border border-white/10 bg-zinc-900/30">
        {loading ? (
          <div className="p-4 text-sm text-zinc-400">Loading history…</div>
        ) : history.length === 0 ? (
          <div className="p-4 text-sm text-zinc-400">No recent items.</div>
        ) : (
          <ul className="p-3 space-y-3">
            {history.map((h, idx) => {
              const q = h.user || h.question || "";
              const a = h.bot || h.response || "";
              return (
                <li
                  key={idx}
                  className="rounded-lg border border-white/10 bg-zinc-900/50 p-3"
                >
                  <p className="text-xs uppercase tracking-wide text-zinc-400">You</p>
                  <p className="text-sm text-white">{q}</p>

                  <p className="mt-2 text-xs uppercase tracking-wide text-zinc-400">Bot</p>
                  <p className="text-sm text-zinc-300 whitespace-pre-line">{a}</p>

                  {onReuseQuestion && q && (
                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        onClick={() => onReuseQuestion(q)}
                        className="rounded-lg border border-white/10 px-2 py-1 text-xs text-zinc-300 transition hover:bg-white/5"
                      >
                        Reuse question
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
