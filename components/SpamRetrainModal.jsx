"use client";

import { useState } from "react";
import axios from "axios";
import { FiMail } from "react-icons/fi";

const LABELS = ["ham", "spam"];

export default function SpamRetrainModal() {
  const [text, setText] = useState("");
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleRetrain = async () => {
    if (!text.trim() || !label.trim()) return;

    const payload = {
      samples: [{ text: text.trim(), label: label.trim().toLowerCase() }],
    };

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/spam/retrain`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setResult(response.data);
    } catch (err) {
      console.error("❌ Error during retraining:", err);
    } finally {
      setLoading(false);
      setText("");
      setLabel("");
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl bg-white/10 border border-white/20 backdrop-blur-[30px] p-6 shadow-lg text-center">
        <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2 mb-2">
          <FiMail className="text-white text-2xl" />
          Retrain Spam Model
        </h2>
        <p className="text-sm text-white/70 mb-4">
          Valid labels:{" "}
          <span className="text-white/90">{LABELS.join(", ")}</span>
        </p>

        <div className="space-y-4">
          <textarea
            className="w-full rounded-lg p-3 text-white bg-white/10 backdrop-blur-[10px] border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="New message to train..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
          />

          <input
            type="text"
            className="w-full rounded-lg p-3 text-white bg-white/10 backdrop-blur-[10px] border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder='Label ("spam" or "ham")'
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />

          <button
            onClick={handleRetrain}
            disabled={loading}
            className="w-full bg-white/20 backdrop-blur-[10px] border border-white/30 px-4 py-2 rounded-lg text-white font-semibold hover:bg-white/30 transition disabled:opacity-50"
          >
            {loading ? "Retraining..." : "Submit Sample"}
          </button>
        </div>
      </div>

      {result?.updated_distribution && (
        <div className="rounded-xl bg-white/10 border border-white/20 backdrop-blur-[30px] p-4 text-sm text-white/90 space-y-2">
          <h3 className="font-bold text-lg text-white">
            📊 Updated Distribution
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(result.updated_distribution).map(
              ([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span>{label}</span>
                  <span>{(value * 100).toFixed(1)}%</span>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
