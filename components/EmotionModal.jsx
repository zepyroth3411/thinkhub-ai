import { useState } from "react";
import axios from "axios";

// Importa los íconos que quieras usar
import { LiaGrinStars, LiaFrown, LiaAngry, LiaGrimace, LiaSmileBeam } from "react-icons/lia";
import { FaHeart, FaSurprise } from "react-icons/fa";
import { IoSadSharp } from "react-icons/io5";

export default function EmotionModal() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

const handlePredict = async () => {
  if (!input.trim()) return;
  setLoading(true);
  const payload = { text: input };
  console.log("📤 Payload enviado al backend:", payload); // 👈 DEBUG aquí

  try {
    const response = await axios.post(
      "http://192.168.100.36:5000/api/emotion/predict",
      payload,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    console.log("✅ Respuesta del backend:", response.data); // 👈 DEBUG aquí
    setResult(response.data);
  } catch (error) {
    console.error("❌ Prediction failed:", error);
  } finally {
    setLoading(false);
  }
};

  // Mapeo usando íconos visualmente más ricos
  const iconMap = {
    joy: <LiaSmileBeam className="text-6xl text-yellow-300 drop-shadow" />,
    happiness: <LiaGrinStars className="text-6xl text-yellow-200 drop-shadow" />,
    love: <FaHeart className="text-6xl text-pink-400 drop-shadow" />,
    anger: <LiaAngry className="text-6xl text-red-500 drop-shadow" />,
    sadness: <IoSadSharp className="text-6xl text-blue-400 drop-shadow" />,
    worry: <LiaGrimace className="text-6xl text-orange-300 drop-shadow" />,
    surprise: <FaSurprise className="text-6xl text-purple-300 drop-shadow" />,
    hate: <LiaAngry className="text-6xl text-red-600 drop-shadow" />,
    relief: <LiaGrinStars className="text-6xl text-green-300 drop-shadow" />,
    boredom: <LiaFrown className="text-6xl text-gray-300 drop-shadow" />,
    empty: <LiaGrimace className="text-6xl text-white/40 drop-shadow" />,
    neutral: <LiaGrimace className="text-6xl text-white/50 drop-shadow" />,
    fun: <LiaSmileBeam className="text-6xl text-cyan-300 drop-shadow" />,
    enthusiasm: <LiaGrinStars className="text-6xl text-orange-300 drop-shadow" />,
  };

  return (
    <div className="w-full space-y-6">
      {/* Resultado */}
      <div className="rounded-xl bg-white/10 border border-white/20 backdrop-blur-[30px] shadow-[inset_0_0_20px_rgba(255,255,255,0.15),0_4px_50px_rgba(0,0,0,0.3)] p-6 flex flex-col space-y-4 text-center transition-all duration-300">
        <div className="flex justify-center">
          {result?.prediction ? iconMap[result.prediction] || "🔍" : <LiaGrimace className="text-6xl text-white/40" />}
        </div>
        <div className="text-2xl font-bold text-white drop-shadow">
          {result?.prediction ? result.prediction.toUpperCase() : "Emotion"}
        </div>
        <div className="text-sm grid grid-cols-2 gap-2 text-white/90">
          {result?.probabilities &&
            Object.entries(result.probabilities).map(([emo, val]) => (
              <div key={emo} className="flex justify-between">
                <span>{emo}</span>
                <span>{(val * 100).toFixed(1)}%</span>
              </div>
            ))}
        </div>
      </div>

      {/* Input */}
      <textarea
        className="w-full rounded-lg p-3 text-white bg-white/10 backdrop-blur-[10px] border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Type a phrase to analyze..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={3}
      ></textarea>

      {/* Botón */}
      <button
        className="w-full bg-white/20 backdrop-blur-[10px] border border-white/30 px-4 py-2 rounded-lg text-white font-semibold hover:bg-white/30 transition disabled:opacity-50"
        onClick={handlePredict}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Send"}
      </button>
    </div>
  );
}
