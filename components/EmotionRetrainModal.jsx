import { useState } from "react";
import axios from "axios";
import {
  LiaSmileBeam, LiaGrinStars, LiaAngry, LiaFrown, LiaGrimace
} from "react-icons/lia";
import { FaHeart, FaSurprise } from "react-icons/fa";
import { IoSadSharp } from "react-icons/io5";

const EMOTION_LABELS = [
  "joy", "love", "anger", "sadness", "worry", "surprise",
  "hate", "relief", "boredom", "empty", "neutral", "fun", "enthusiasm"
];

const iconMap = {
  joy: <LiaSmileBeam className="text-3xl text-yellow-300 drop-shadow" />,
  happiness: <LiaGrinStars className="text-3xl text-yellow-200 drop-shadow" />,
  love: <FaHeart className="text-3xl text-pink-400 drop-shadow" />,
  anger: <LiaAngry className="text-3xl text-red-500 drop-shadow" />,
  sadness: <IoSadSharp className="text-3xl text-blue-400 drop-shadow" />,
  worry: <LiaGrimace className="text-3xl text-orange-300 drop-shadow" />,
  surprise: <FaSurprise className="text-3xl text-purple-300 drop-shadow" />,
  hate: <LiaAngry className="text-3xl text-red-600 drop-shadow" />,
  relief: <LiaGrinStars className="text-3xl text-green-300 drop-shadow" />,
  boredom: <LiaFrown className="text-3xl text-gray-300 drop-shadow" />,
  empty: <LiaGrimace className="text-3xl text-white/40 drop-shadow" />,
  neutral: <LiaGrimace className="text-3xl text-white/50 drop-shadow" />,
  fun: <LiaSmileBeam className="text-3xl text-cyan-300 drop-shadow" />,
  enthusiasm: <LiaGrinStars className="text-3xl text-orange-300 drop-shadow" />,
};

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
        { headers: { "Content-Type": "application/json" } }
      );
      setResult(response.data);
      console.log("✅ Reentreno completo:", response.data);
      setText("")
      setLabel("")
    } catch (err) {
      console.error("❌ Error durante reentreno:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl bg-white/10 border border-white/20 backdrop-blur-[30px] shadow p-6 flex flex-col space-y-4 text-center">
        <h2 className="text-2xl font-bold text-white">📚 Retrain Model</h2>
        <p className="text-sm text-white/70">
          Emociones válidas: <br />
          <span className="text-white/90">{EMOTION_LABELS.join(", ")}</span>
        </p>

        <textarea
          className="w-full rounded-lg p-3 text-white bg-white/10 border border-white/20 placeholder-white/60"
          placeholder="New training phrase..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
        />

        <input
          type="text"
          className="w-full rounded-lg p-3 text-white bg-white/10 border border-white/20 placeholder-white/60"
          placeholder="Emotion label (e.g., joy)"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />

        <button
          className="w-full bg-white/20 border border-white/30 px-4 py-2 rounded-lg text-white font-semibold hover:bg-white/30 transition disabled:opacity-50"
          onClick={handleRetrain}
          disabled={loading}
        >
          {loading ? "Re-training..." : "Submit Sample"}
        </button>
      </div>

      {result?.class_distribution && (
        <div className="rounded-xl bg-white/10 border border-white/20 backdrop-blur-[30px] p-4 text-sm text-white/90 space-y-4">
          <h3 className="font-bold text-lg text-white">📊 Nueva distribución de emociones</h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(result.class_distribution).map(([emo, val]) => (
              <div key={emo} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2">
                  {iconMap[emo] || "❓"}
                  <span className="capitalize">{emo}</span>
                </div>
                <span className="font-mono">{val} muestras</span>
              </div>
            ))}
          </div>

          {result.retrained_at && (
            <p className="text-xs text-white/60 mt-2 text-right">
              Último reentrenamiento: {new Date(result.retrained_at).toLocaleString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
