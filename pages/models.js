"use client";

import { useState } from "react";

import DockNavbar from "@/components/DockNavbar";
import dockItems from "@/config/dockItems";
import Aurora from "@/components/Aurora";
import ModelCard from "@/components/ModelCard";
import EmotionModal from "@/components/EmotionModal";
import EmotionRetrainModal from "@/components/EmotionRetrainModal";
import ModelAccordionModal from "@/components/ModelAccordion";
import SpamModal from "@/components/SpamModal";
import SpamRetrainModal from "@/components/SpamRetrainModal";
import SummarizerModal from "@/components/SummarizerModal";
import ChatbotQA from "@/components/ChatbotModal";
import ChatbotHistoryPanel from "@/components/ChatbotHistorialModal";

import { RiEmotionLaughFill } from "react-icons/ri";
import { LuMessageCircleCode, LuNotebookPen, LuBrainCircuit } from "react-icons/lu";



export default function Models() {
  // estado local para el historial que mostrará el acordeón
  const [chatHistory, setChatHistory] = useState([]);

  return (
    <main className="text-white overflow-x-hidden px-4 flex flex-col min-h-screen">
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={1.0}
        amplitude={1.0}
        speed={0.5}
      />

      <div className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">AI Models</h1>
          <p className="text-lg">
            Explore our collection of interactive AI models and see their
            real-world impact.
          </p>
        </section>

        {/* Models Grid */}
        <section className="py-8 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          <ModelAccordionModal
            title="Emotion Analyzer"
            icon={<RiEmotionLaughFill />}
            MainComponent={EmotionModal}
            AccordionComponent={EmotionRetrainModal}
            accordionLabel="Open Retrain Tool"
          />

          <ModelAccordionModal
            title="Spam Detector"
            icon={<LuMessageCircleCode />}
            MainComponent={SpamModal}
            AccordionComponent={SpamRetrainModal}
            accordionLabel="Open Retrain Tool"
          />

          <ModelAccordionModal
            title="Text Summarizer"
            icon={<LuNotebookPen />}
            MainComponent={SummarizerModal}
          />

          {/* === Chatbot con historial en el acordeón === */}
          <ModelAccordionModal
            title="Chatbot"
            icon={<LuBrainCircuit />}
            MainComponent={ChatbotQA}
            AccordionComponent={ChatbotHistoryPanel}
            accordionLabel="Open History"
            mainProps={{
              title: "Chatbot",
              onAfterAnswer: (payload) => {
                const recent = Array.isArray(payload?.recent_history)
                  ? payload.recent_history
                  : [];
                setChatHistory(recent);
              },
            }}
            accordionProps={{
              history: chatHistory,
              title: "Recent Q&A",
            }}
          />
        </section>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-gray-400">
        © 2025 ThinkHubAI. All rights reserved.
      </footer>

      <DockNavbar items={dockItems} />
    </main>
  );
}
