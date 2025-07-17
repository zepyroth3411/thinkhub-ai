// src/components/ui/ModelCard.jsx
import React from "react";

export default function ModelCard({ title, children }) {
  return (
    <div className="w-full max-w-xl mx-auto p-[1px] rounded-[20px] bg-gradient-to-br from-white/20 via-white/5 to-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
      <div className="rounded-[20px] bg-black/40 backdrop-blur-[12px] p-6 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-4 text-center drop-shadow-sm">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
