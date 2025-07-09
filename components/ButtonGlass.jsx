import { motion } from "framer-motion";

export default function ButtonGlass({ children, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="relative inline-flex items-center justify-center rounded-full text-white bg-black bg-opacity-60 backdrop-blur-md overflow-hidden"
      style={{
        fontSize: "0.95rem",
        fontWeight: "500",
        padding: "0.90rem 3rem",
      }}
    >
      {/* Animated gradient border */}
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{
          padding: "1px",
          background: "linear-gradient(90deg, #ff00cc, #333399, #ff00cc)",
          backgroundSize: "200% auto",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          boxSizing: "border-box",
        }}
        animate={{ backgroundPosition: ["0% center", "200% center"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {/* Button text */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
