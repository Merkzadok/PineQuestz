"use client";

import { useEffect, useState } from "react";
import { Lock, CheckCircle, Star, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

interface Level {
  id: number;
  route: string;
  section: string;
  x: number; // % position across width
  y: number; // % position across height
}

interface LessonProgress {
  levelId: number;
  completed: boolean;
}

const sectionColors: Record<
  string,
  { bg: string; dark: string; accent: string }
> = {
  Letters: { bg: "bg-cyan-200", dark: "bg-cyan-600", accent: "bg-cyan-300" },
  Colors: {
    bg: "bg-fuchsia-200",
    dark: "bg-fuchsia-600",
    accent: "bg-fuchsia-300",
  },
  Animals: {
    bg: "bg-orange-200",
    dark: "bg-orange-600",
    accent: "bg-orange-300",
  },
  Food: { bg: "bg-lime-200", dark: "bg-lime-600", accent: "bg-lime-300" },
  Misc: { bg: "bg-rose-200", dark: "bg-rose-600", accent: "bg-rose-300" },
};

const SectionSeparator = ({
  section,
  x,
  y,
}: {
  section: string;
  x: number;
  y: number;
}) => {
  const getSectionImage = (section: string) => {
    switch (section) {
      case "Letters":
        return "/alphabet-blocks-colorful-letters-abc.jpg";
      case "Colors":
        return "/rainbow-color-palette-paint-brush.jpg";
      case "Animals":
        return "/cute-cartoon-animals-lion-elephant.jpg";
      case "Food":
        return "/fresh-fruits-vegetables-apple-banana.jpg";
      case "Misc":
        return "/educational-icons-books-stars-learning.jpg";
      default:
        return "/learning-education.jpg";
    }
  };

  return (
    <div
      className="absolute flex flex-col items-center z-10"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative">
        <div className="w-28 h-28 rounded-full bg-white shadow-xl border-4 border-yellow-400 flex items-center justify-center mb-3">
          <img
            src={getSectionImage(section) || "/placeholder.svg"}
            alt={`${section} section`}
            className="w-20 h-20 rounded-full"
          />
        </div>
        <div className="absolute -top-2 -right-2">
          <Sparkles className="w-8 h-8 text-yellow-500" />
        </div>
      </div>
      <div className="bg-gradient-to-r from-yellow-300 to-orange-300 px-4 py-2 rounded-full shadow-lg border-2 border-white">
        <span className="text-lg font-bold text-gray-800">{section}</span>
      </div>
    </div>
  );
};

export default function RoadMap() {
  const router = useRouter();
  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>([]);

  const levels: Level[] = [
    { id: 1, route: "/main/crossword/1", section: "Letters", x: 5, y: 5 },
    { id: 2, route: "/main/crossword/2", section: "Letters", x: 20, y: 15 },
    { id: 3, route: "/main/wordSentence", section: "Letters", x: 35, y: 5 },
    { id: 4, route: "/main/wordSentence", section: "Letters", x: 50, y: 15 },
    { id: 5, route: "/main/wordSentence", section: "Letters", x: 65, y: 5 },

    { id: 6, route: "/main/wordSentence", section: "Colors", x: 75, y: 20 },
    { id: 7, route: "/main/wordSentence", section: "Colors", x: 60, y: 30 },
    { id: 8, route: "/main/wordSentence", section: "Colors", x: 45, y: 20 },
    { id: 9, route: "/main/wordSentence", section: "Colors", x: 30, y: 30 },
    { id: 10, route: "/main/wordSentence", section: "Colors", x: 15, y: 20 },

    { id: 11, route: "/main/wordSentence", section: "Animals", x: 25, y: 40 },
    { id: 12, route: "/main/wordSentence", section: "Animals", x: 40, y: 50 },
    { id: 13, route: "/main/wordSentence", section: "Animals", x: 55, y: 40 },
    { id: 14, route: "/main/wordSentence", section: "Animals", x: 70, y: 50 },
    { id: 15, route: "/main/wordSentence", section: "Animals", x: 85, y: 40 },

    { id: 16, route: "/main/wordSentence", section: "Food", x: 75, y: 60 },
    { id: 17, route: "/main/wordSentence", section: "Food", x: 60, y: 70 },
    { id: 18, route: "/main/wordSentence", section: "Food", x: 45, y: 60 },
    { id: 19, route: "/main/wordSentence", section: "Food", x: 30, y: 70 },
    { id: 20, route: "/main/wordSentence", section: "Food", x: 15, y: 60 },
  ];

  const sectionSeparators = [
    { section: "Letters", x: 15, y: 8 },
    { section: "Colors", x: 85, y: 25 },
    { section: "Animals", x: 10, y: 45 },
    { section: "Food", x: 90, y: 65 },
    { section: "Misc", x: 50, y: 85 },
  ];

  useEffect(() => {
    const savedProgress = levels.map((level) => ({
      levelId: level.id,
      completed: localStorage.getItem(`level${level.id}`) === "completed",
    }));
    setLessonProgress(savedProgress);
  }, []);

  const getLevelStatus = (level: Level) => {
    const prevLevel = levels[level.id - 2];
    const prevCompleted = prevLevel
      ? lessonProgress.find((l) => l.levelId === prevLevel.id)?.completed
      : true;
    const currentProgress = lessonProgress.find((l) => l.levelId === level.id);

    if (!prevCompleted) return "locked";
    if (currentProgress?.completed) return "completed";
    return "current";
  };

  const handleLevelClick = (level: Level) => {
    if (getLevelStatus(level) === "locked") return;
    router.push(level.route);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/aaaaa.jpg')",
          backgroundPosition: "center 20%",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/70 via-purple-100/60 to-pink-200/70" />

      <svg className="absolute w-full h-full">
        <defs>
          <pattern
            id="brickTexture"
            patternUnits="userSpaceOnUse"
            width="20"
            height="10"
          >
            <rect width="20" height="10" fill="#8B4513" />
            <rect x="0" y="0" width="10" height="5" fill="#A0522D" />
            <rect x="10" y="5" width="10" height="5" fill="#A0522D" />
            <rect x="0" y="5" width="10" height="5" fill="#CD853F" />
            <rect x="10" y="0" width="10" height="5" fill="#CD853F" />
          </pattern>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="50%" stopColor="#F7931E" />
            <stop offset="100%" stopColor="#FFD23F" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {levels.slice(1).map((level, idx) => {
          const prev = levels[idx];
          const prevStatus = getLevelStatus(prev);
          const status = getLevelStatus(level);
          const isCompleted =
            prevStatus === "completed" && status === "completed";

          return (
            <g key={level.id}>
              <line
                x1={`${prev.x}%`}
                y1={`${prev.y}%`}
                x2={`${level.x}%`}
                y2={`${level.y}%`}
                stroke="#654321"
                strokeWidth="16"
                strokeLinecap="round"
              />
              <line
                x1={`${prev.x}%`}
                y1={`${prev.y}%`}
                x2={`${level.x}%`}
                y2={`${level.y}%`}
                stroke={
                  isCompleted ? "url(#pathGradient)" : "url(#brickTexture)"
                }
                strokeWidth="12"
                strokeLinecap="round"
                filter={isCompleted ? "url(#glow)" : "none"}
                className={isCompleted ? "animate-pulse" : ""}
              />
              <line
                x1={`${prev.x}%`}
                y1={`${prev.y}%`}
                x2={`${level.x}%`}
                y2={`${level.y}%`}
                stroke="#FFD700"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="12,6"
              />
            </g>
          );
        })}
      </svg>

      {sectionSeparators.map((separator, idx) => (
        <SectionSeparator
          key={idx}
          section={separator.section}
          x={separator.x}
          y={separator.y}
        />
      ))}

      {levels.map((level) => {
        const status = getLevelStatus(level);
        const color = sectionColors[level.section];

        let bgClass = `${color.bg} border-gray-400`;
        let iconColor = "text-gray-600";
        let shadowClass = "shadow-lg";

        if (status === "completed") {
          bgClass = "bg-emerald-200 border-emerald-500";
          iconColor = "text-emerald-700";
          shadowClass = "shadow-xl shadow-emerald-300";
        } else if (status === "current") {
          bgClass = `${color.dark} border-yellow-400`;
          iconColor = "text-white";
          shadowClass = "shadow-2xl shadow-yellow-400";
        }

        return (
          <div
            key={level.id}
            className="absolute flex flex-col items-center z-20"
            style={{
              left: `${level.x}%`,
              top: `${level.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <button
              onClick={() => handleLevelClick(level)}
              disabled={status === "locked"}
              className={`relative w-18 h-18 rounded-full border-4 flex items-center justify-center transition-all duration-300 hover:scale-110 ${bgClass} ${shadowClass} ${
                status !== "locked"
                  ? "hover:shadow-2xl cursor-pointer"
                  : "cursor-not-allowed"
              }`}
            >
              {status === "completed" ? (
                <CheckCircle className={`w-8 h-8 ${iconColor}`} />
              ) : status === "current" ? (
                <>
                  <span className={`text-xl font-bold ${iconColor}`}>
                    {level.id}
                  </span>
                  <Star className="absolute -top-3 -right-3 w-6 h-6 text-yellow-400 animate-bounce" />
                </>
              ) : (
                <Lock className={`w-6 h-6 ${iconColor}`} />
              )}

              {status === "current" && (
                <div className="absolute inset-0 rounded-full border-4 border-yellow-400 animate-ping opacity-75"></div>
              )}
            </button>
            <span
              className={`mt-2 text-sm font-bold px-3 py-1 rounded-full ${
                status === "completed"
                  ? "bg-emerald-200 text-emerald-800"
                  : status === "current"
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {level.id}
            </span>
          </div>
        );
      })}

      <div className="absolute top-10 left-10 w-10 h-10 bg-yellow-300 rounded-full opacity-70 animate-bounce"></div>
      <div className="absolute top-20 right-20 w-8 h-8 bg-pink-300 rounded-full opacity-70 animate-pulse"></div>
      <div
        className="absolute bottom-20 left-20 w-12 h-12 bg-blue-300 rounded-full opacity-70 animate-bounce"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-10 right-10 w-9 h-9 bg-purple-300 rounded-full opacity-70 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  );
}
