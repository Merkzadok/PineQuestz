"use client";
import React from "react";
import { Play } from "lucide-react";

interface ContinueButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const ContinueButton: React.FC<ContinueButtonProps> = ({
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg
        transform transition-all duration-200
        ${
          disabled
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-green-500 text-white shadow-lg hover:bg-green-600 hover:scale-105 active:scale-95 hover:shadow-xl"
        }
      `}
    >
      <Play className="w-6 h-6" />
      {disabled ? "Completed for today!" : "Үргэлжлүүлэх"}
    </button>
  );
};
