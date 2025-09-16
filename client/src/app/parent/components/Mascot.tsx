"use client";
import React from "react";

interface MascotProps {
  mood?: "happy" | "excited" | "sleepy";
  size?: "small" | "medium" | "large";
}

export const Mascot: React.FC<MascotProps> = ({
  mood = "happy",
  size = "medium",
}) => {
  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24",
    large: "w-32 h-32",
  };
  const animations = {
    happy: "animate-bounce",
    excited: "animate-pulse",
    sleepy: "animate-pulse opacity-70",
  };

  return (
    <div
      className={`${sizeClasses[size]} ${animations[mood]} transition-all duration-500`}
    >
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-green-500 rounded-full shadow-lg">
          <div className="absolute top-6 left-4 w-3 h-3 bg-black rounded-full"></div>
          <div className="absolute top-6 right-4 w-3 h-3 bg-black rounded-full"></div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-6 h-3 border-b-2 border-black rounded-full"></div>
          <div className="absolute top-10 left-1 w-4 h-2 bg-green-400 rounded-full opacity-60"></div>
          <div className="absolute top-10 right-1 w-4 h-2 bg-green-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute -left-2 top-12 w-4 h-8 bg-green-500 rounded-full transform rotate-12"></div>
        <div className="absolute -right-2 top-12 w-4 h-8 bg-green-500 rounded-full transform -rotate-12"></div>
      </div>
    </div>
  );
};
