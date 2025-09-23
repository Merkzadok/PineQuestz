"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

type CelebrationProps = {
  status: "correct" | "wrong" | null;
  word?: string;
  onDone?: () => void;
};

export default function Celebration({
  status,
  word,
  onDone,
}: CelebrationProps) {
  useEffect(() => {
    if (status === "correct") {
      // fire confetti burst
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });

      // auto-clear after 2s
      const timer = setTimeout(() => onDone?.(), 2000);
      return () => clearTimeout(timer);
    }

    if (status === "wrong") {
      const timer = setTimeout(() => onDone?.(), 1500);
      return () => clearTimeout(timer);
    }
  }, [status, onDone]);

  return (
    <AnimatePresence>
      {status && (
        <motion.div
          key={status}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, type: "spring" }}
          className={`absolute top-10 left-1/2 -translate-x-1/2 text-2xl font-bold px-4 py-2 rounded-2xl shadow-md ${
            status === "correct"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status === "correct" ? `🎉 Зөв байна! 🟢` : "😅 Буруу байна"}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
