// ThinkHubEmotionModelCard.tsx

import { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import ButtonGlass from "./ButtonGlass";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2, SendHorizonal, Sparkles } from "lucide-react";

export default function ThinkHubEmotionModelCard() {
  const [text, setText] = useState("");
  const [prediction, setPrediction] = (useState < string) | (null > null);
  const [probabilities, setProbabilities] = (useState < any) | (null > null);
  const [isLoading, setIsLoading] = useState(false);

  const [trainingSamples, setTrainingSamples] = useState("");
  const [retrainResult, setRetrainResult] = (useState < any) | (null > null);
  const [isRetraining, setIsRetraining] = useState(false);

  const handlePredict = async () => {
    setIsLoading(true);
    setPrediction(null);
    setProbabilities(null);
    try {
      const res = await axios.post("http://localhost:5000/predict", {
        text,
      });
      setPrediction(res.data.prediction);
      setProbabilities(res.data.probabilities);
    } catch (err) {
      alert("Error al predecir");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetrain = async () => {
    setIsRetraining(true);
    setRetrainResult(null);
    try {
      const lines = trainingSamples
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .map((l) => {
          const [label, ...contentArr] = l.split(",");
          return { label: label.trim(), text: contentArr.join(",").trim() };
        });

      const res = await axios.post("http://localhost:5000/retrain", {
        samples: lines,
      });
      setRetrainResult(res.data);
    } catch (err) {
      alert("Error al reentrenar");
    } finally {
      setTimeout(() => setIsRetraining(false), 8000);
    }
  };

  return (
    <Card className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-center">Emotion Analyzer</h2>

      {/* Prediction section */}
      <Card className="p-4">
        <h3 className="font-semibold mb-2">🔍 Predict Emotion</h3>
        <Input
          placeholder="Type a phrase..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <ButtonGlass
          onClick={handlePredict}
          className="mt-2"
          disabled={isLoading || !text}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <SendHorizonal />}{" "}
          Send
        </ButtonGlass>

        {prediction && (
          <div className="mt-4 text-center">
            <p className="text-lg font-bold">
              Predicted: <span className="text-blue-600">{prediction}</span>
            </p>
            <details className="mt-2">
              <summary className="cursor-pointer text-sm">
                Show probabilities
              </summary>
              <pre className="text-xs bg-gray-100 p-2 mt-2 rounded">
                {JSON.stringify(probabilities, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </Card>

      {/* Retrain section */}
      <Card className="p-4">
        <h3 className="font-semibold mb-2">🧠 Retrain with New Samples</h3>
        <Textarea
          placeholder="One sample per line. Format: label,text"
          value={trainingSamples}
          onChange={(e) => setTrainingSamples(e.target.value)}
        />
        <ButtonGlass
          onClick={handleRetrain}
          className="mt-2"
          disabled={isRetraining || trainingSamples.trim().length === 0}
        >
          {isRetraining ? <Loader2 className="animate-spin" /> : <Sparkles />}{" "}
          Retrain
        </ButtonGlass>

        {retrainResult && (
          <div className="mt-4 text-sm">
            <p className="font-semibold text-green-700">
              ✅ Retrained at{" "}
              {new Date(retrainResult.retrained_at).toLocaleString()}
            </p>
            <p className="text-xs">
              Samples added: {retrainResult.samples_added}
            </p>
            <details className="mt-1">
              <summary className="cursor-pointer">View distribution</summary>
              <pre className="text-xs bg-gray-100 p-2 mt-1 rounded">
                {JSON.stringify(retrainResult.class_distribution, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </Card>
    </Card>
  );
}
