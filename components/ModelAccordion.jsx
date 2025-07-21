"use client";

import { useState } from "react";
import { FaChevronRight, FaChevronLeft, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ModelAccordionModal({
  title,
  icon,
  MainComponent,
  AccordionComponent,
  accordionLabel = "More Options",
  disableMainOnAccordion = true,
}) {
  const [showModal, setShowModal] = useState(false);
  const [showAccordion, setShowAccordion] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
    setShowAccordion(false);
  };

  const toggleAccordion = () => {
    setShowAccordion(!showAccordion);
  };

  return (
    <>
      <div
        className="rounded-2xl p-6 bg-white/5 hover:bg-white/10 border border-white/20 backdrop-blur-md cursor-pointer transition shadow-lg"
        onClick={toggleModal}
      >
        <div className="flex flex-col items-center text-center">
          <div className="text-4xl mb-2">{icon}</div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            key="modal"
            className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              key="panel"
              className="relative flex bg-white/5 border border-white/20 rounded-xl shadow-lg overflow-hidden"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6 w-[500px] relative">
                <button
                  className="absolute top-2 right-2 text-white text-xl"
                  onClick={toggleModal}
                >
                  <FaTimes />
                </button>

                <div className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  {icon}
                  {title}
                </div>

                {!disableMainOnAccordion || !showAccordion ? (
                  <MainComponent />
                ) : (
                  <div className="text-white/50 text-sm italic text-center mb-4">
                    This module is currently locked while using the side panel.
                  </div>
                )}

                {AccordionComponent && (
                  <div className="mt-6">
                    <button
                      onClick={toggleAccordion}
                      className="w-full bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded flex items-center justify-between"
                    >
                      <span>{accordionLabel}</span>
                      {showAccordion ? <FaChevronLeft /> : <FaChevronRight />}
                    </button>
                  </div>
                )}
              </div>

              <AnimatePresence>
                {showAccordion && AccordionComponent && (
                  <motion.div
                    key="accordion"
                    className="p-6 w-[400px] border-l border-white/20 bg-white/5 backdrop-blur-md"
                    initial={{ x: 400, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 400, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-4 text-white font-semibold">
                      <span>{accordionLabel}</span>
                      <button
                        onClick={toggleAccordion}
                        className="text-sm flex items-center gap-1 hover:text-white/80"
                      >
                        <FaChevronLeft /> Back to {title.split(" ")[0]}
                      </button>
                    </div>

                    <AccordionComponent />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
