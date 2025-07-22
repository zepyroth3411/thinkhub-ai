import { useCallback } from "react";

export default function useTextToSpeech() {
  const speak = useCallback((text, lang = "en-US") => {
    if (!window.speechSynthesis) {
      console.warn("Speech Synthesis not supported in this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.cancel(); // 🔇 Cancela cualquier voz previa
    speechSynthesis.speak(utterance);
  }, []);

  return { speak };
}
