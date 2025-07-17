// src/components/ui/ModelCard.js
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ModelCard({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Card */}
      <div
        onClick={() => setIsOpen(true)}
        className="w-full max-w-sm p-[1px] rounded-[20px] bg-gradient-to-br from-white/10 via-white/5 to-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.2)] cursor-pointer transition hover:scale-[1.02]"
      >
        <div className="rounded-[20px] bg-black/40 backdrop-blur-[12px] p-6 border border-white/10">
          <h2 className="text-xl font-bold text-white text-center drop-shadow-sm">
            {title}
          </h2>
        </div>
      </div>

      {/* Modal animado */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="modal-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              key="modal-content"
              ref={modalRef}
              className="w-full max-w-2xl mx-4 rounded-[20px] bg-black/60 backdrop-blur-[20px] border border-white/10 p-6 shadow-lg"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white text-xl font-semibold">{title}</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-red-400 text-2xl font-light"
                >
                  ×
                </button>
              </div>
              <div className="text-white">{children}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
