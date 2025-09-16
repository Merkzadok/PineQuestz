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

  const getMoodColors = () => {
    switch (mood) {
      case "excited":
        return "from-pink-400 via-purple-500 to-indigo-600";
      case "sleepy":
        return "from-blue-400 via-indigo-500 to-purple-600";
      default:
        return "from-emerald-400 via-teal-500 to-cyan-600";
    }
  };

  return (
    <div
      className={`${sizeClasses[size]} transition-all duration-500 filter drop-shadow-xl`}
    >
      <div className="relative w-full h-full">
        {/* Outer glow effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${getMoodColors()} rounded-full blur-sm opacity-30 scale-110`}
        ></div>

        {/* Main body with gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${getMoodColors()} rounded-full shadow-2xl border-2 border-white/20 ${
            animations[mood]
          }`}
        >
          {/* Glossy highlight */}
          <div className="absolute top-2 left-3 w-6 h-4 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-sm"></div>

          {/* Eyes with sparkle */}
          <div className="absolute top-5 left-3 w-4 h-4 bg-white rounded-full shadow-inner">
            <div className="absolute top-1 left-1 w-3 h-3 bg-gray-800 rounded-full">
              <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="absolute top-5 right-3 w-4 h-4 bg-white rounded-full shadow-inner">
            <div className="absolute top-1 left-1 w-3 h-3 bg-gray-800 rounded-full">
              <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Cute smile */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-8 h-4 border-b-3 border-white/90 rounded-full shadow-sm"></div>

          {/* Cheek blush */}
          <div className="absolute top-8 left-0 w-5 h-3 bg-pink-300/60 rounded-full blur-sm"></div>
          <div className="absolute top-8 right-0 w-5 h-3 bg-pink-300/60 rounded-full blur-sm"></div>

          {/* Decorative sparkles */}
          <div className="absolute top-3 right-2 w-1 h-1 bg-yellow-200 rounded-full animate-ping delay-300"></div>
          <div className="absolute bottom-3 left-2 w-1 h-1 bg-yellow-200 rounded-full animate-ping delay-700"></div>
        </div>

        {/* Enhanced arms with gradient */}
        <div
          className={`absolute -left-2 top-10 w-5 h-10 bg-gradient-to-b ${getMoodColors()} rounded-full transform rotate-12 shadow-lg border border-white/10`}
        ></div>
        <div
          className={`absolute -right-2 top-10 w-5 h-10 bg-gradient-to-b ${getMoodColors()} rounded-full transform -rotate-12 shadow-lg border border-white/10`}
        ></div>

        {/* Floating hearts for happy mood */}
        {mood === "happy" && (
          <>
            <div className="absolute -top-2 -right-1 text-pink-400 animate-float">
              💖
            </div>
            <div className="absolute -top-1 -left-2 text-pink-300 animate-float delay-500">
              ✨
            </div>
          </>
        )}

        {/* Zzz for sleepy mood */}
        {mood === "sleepy" && (
          <div className="absolute -top-3 right-0 text-blue-300 text-xs animate-float">
            💤
          </div>
        )}

        {/* Stars for excited mood */}
        {mood === "excited" && (
          <>
            <div className="absolute -top-2 -left-1 text-yellow-400 animate-spin">
              ⭐
            </div>
            <div className="absolute -bottom-1 -right-2 text-purple-400 animate-spin delay-300">
              ✨
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(10deg);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// Demo component to showcase the mascot
export default function MascotDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          ✨ Beautiful Mascot ✨
        </h1>

        <div className="grid grid-cols-3 gap-8 mb-8">
          <div className="text-center">
            <h3 className="text-white text-lg mb-4">Happy</h3>
            <Mascot mood="happy" size="large" />
          </div>
          <div className="text-center">
            <h3 className="text-white text-lg mb-4">Excited</h3>
            <Mascot mood="excited" size="large" />
          </div>
          <div className="text-center">
            <h3 className="text-white text-lg mb-4">Sleepy</h3>
            <Mascot mood="sleepy" size="large" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <h4 className="text-white text-sm mb-2">Small</h4>
            <Mascot mood="happy" size="small" />
          </div>
          <div className="text-center">
            <h4 className="text-white text-sm mb-2">Medium</h4>
            <Mascot mood="happy" size="medium" />
          </div>
          <div className="text-center">
            <h4 className="text-white text-sm mb-2">Large</h4>
            <Mascot mood="happy" size="large" />
          </div>
        </div>
      </div>
    </div>
  );
}
