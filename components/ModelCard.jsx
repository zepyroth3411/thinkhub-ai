"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

export default function ModelCard({ title, children }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef();

  // Cierra el modal al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setExpanded(false);
      }
    }

    if (expanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expanded]);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Tarjeta */}
      <div
        className="p-[1px] rounded-[20px] cursor-pointer transition-all duration-500 transform hover:scale-[1.02] bg-gradient-to-br from-white/10 via-white/5 to-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
        onClick={() => setExpanded(true)}
      >
        <div className="rounded-[20px] bg-black/40 backdrop-blur-md p-6 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-2 text-center drop-shadow-sm">
            {title}
          </h2>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black/60 backdrop-blur-md z-50"
          >
            <motion.div
              ref={cardRef}
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-[90%] max-w-2xl p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg"
            >
              {/* Botón de cerrar */}
              <button
                onClick={() => setExpanded(false)}
                className="absolute top-3 right-3 text-white text-2xl hover:text-red-400 transition"
              >
                <IoClose />
              </button>

              {/* Contenido dinámico */}
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
