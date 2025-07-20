import { useState } from "react";
import axios from "axios";


console.log(process.env.NEXT_PUBLIC_API_URL)
const EMOTION_LABELS = [
  "joy", "love", "anger", "sadness", "worry", "surprise",
  "hate", "relief", "boredom", "empty", "neutral", "fun", "enthusiasm"
];

export default function EmotionRetrainModal() {
  const [text, setText] = useState("");
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleRetrain = async () => {
    if (!text.trim() || !label.trim()) return;

    const payload = {
      samples: [{ text: text.trim(), label: label.trim().toLowerCase() }]
    };

    setLoading(true);
    try {
      const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/emotion/retrain`,
    payload,
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      setResult(response.data);
      console.log("✅ Reentreno completo:", response.data);
    } catch (err) {
      console.error("❌ Error durante reentreno:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Card visual */}
      <div className="rounded-xl bg-white/10 border border-white/20 backdrop-blur-[30px] shadow-[inset_0_0_20px_rgba(255,255,255,0.15),0_4px_50px_rgba(0,0,0,0.3)] p-6 flex flex-col space-y-4 text-center">
        <h2 className="text-2xl font-bold text-white">📚 Retrain Model</h2>
        <p className="text-sm text-white/70">
          Emociones válidas: <br />
          <span className="text-white/90">{EMOTION_LABELS.join(", ")}</span>
        </p>
        
        <textarea
          className="w-full rounded-lg p-3 text-white bg-white/10 backdrop-blur-[10px] border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
          placeholder="New training phrase..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
        />

        <input
          type="text"
          className="w-full rounded-lg p-3 text-white bg-white/10 backdrop-blur-[10px] border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
          placeholder="Emotion label (e.g., joy)"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />

        <button
          className="w-full bg-white/20 backdrop-blur-[10px] border border-white/30 px-4 py-2 rounded-lg text-white font-semibold hover:bg-white/30 transition disabled:opacity-50"
          onClick={handleRetrain}
          disabled={loading}
        >
          {loading ? "Re-training..." : "Submit Sample"}
        </button>
      </div>

      {/* Resultados */}
      {result?.updated_distribution && (
        <div className="rounded-xl bg-white/10 border border-white/20 backdrop-blur-[30px] p-4 text-sm text-white/90 space-y-2">
          <h3 className="font-bold text-lg text-white">📊 Updated Emotion Distribution</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(result.updated_distribution).map(([emo, val]) => (
              <div key={emo} className="flex justify-between">
                <span>{emo}</span>
                <span>{(val * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
