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
  Letters: { bg: "bg-blue-100", dark: "bg-blue-500", accent: "bg-blue-200" },
  Colors: {
    bg: "bg-purple-100",
    dark: "bg-purple-500",
    accent: "bg-purple-200",
  },
  Animals: {
    bg: "bg-orange-100",
    dark: "bg-orange-500",
    accent: "bg-orange-200",
  },
  Food: { bg: "bg-green-100", dark: "bg-green-500", accent: "bg-green-200" },
  Misc: { bg: "bg-pink-100", dark: "bg-pink-500", accent: "bg-pink-200" },
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
        return "/images/apple.jpg";
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
        <div className="w-20 h-20 rounded-full bg-white shadow-lg border-4 border-emerald-200 flex items-center justify-center mb-2">
          <img
            src={getSectionImage(section) || "/placeholder.svg"}
            alt={`${section} section`}
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div className="absolute -top-1 -right-1">
          <Sparkles className="w-6 h-6 text-emerald-500" />
        </div>
      </div>
      <div className="bg-white px-3 py-1 rounded-full shadow-md border border-emerald-200">
        <span className="text-sm font-bold text-emerald-700">{section}</span>
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
    { section: "Letters", x: 40, y: 10 },
    { section: "Colors", x: 45, y: 25 },
    { section: "Animals", x: 55, y: 45 },
    { section: "Food", x: 45, y: 65 },
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
    <div className="relative w-full h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 overflow-hidden">
      <svg className="absolute w-full h-full">
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
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
              {/* Road base */}
              <line
                x1={`${prev.x}%`}
                y1={`${prev.y}%`}
                x2={`${level.x}%`}
                y2={`${level.y}%`}
                stroke="#e5e7eb"
                strokeWidth="12"
                strokeLinecap="round"
              />
              {/* Road surface */}
              <line
                x1={`${prev.x}%`}
                y1={`${prev.y}%`}
                x2={`${level.x}%`}
                y2={`${level.y}%`}
                stroke={isCompleted ? "url(#pathGradient)" : "#d1d5db"}
                strokeWidth="8"
                strokeLinecap="round"
                filter={isCompleted ? "url(#glow)" : "none"}
                className={isCompleted ? "animate-pulse" : ""}
              />
              {/* Road center line */}
              <line
                x1={`${prev.x}%`}
                y1={`${prev.y}%`}
                x2={`${level.x}%`}
                y2={`${level.y}%`}
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="8,4"
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

        let bgClass = `${color.bg} border-gray-300`;
        let iconColor = "text-gray-400";
        let shadowClass = "shadow-md";

        if (status === "completed") {
          bgClass = "bg-emerald-100 border-emerald-400";
          iconColor = "text-emerald-600";
          shadowClass = "shadow-lg shadow-emerald-200";
        } else if (status === "current") {
          bgClass = `${color.dark} border-white`;
          iconColor = "text-white";
          shadowClass = "shadow-xl shadow-blue-300";
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
              className={`relative w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300 hover:scale-110 ${bgClass} ${shadowClass} ${
                status !== "locked"
                  ? "hover:shadow-2xl cursor-pointer"
                  : "cursor-not-allowed"
              }`}
            >
              {status === "completed" ? (
                <CheckCircle className={`w-7 h-7 ${iconColor}`} />
              ) : status === "current" ? (
                <>
                  <span className={`text-lg font-bold ${iconColor}`}>
                    {level.id}
                  </span>
                  <Star className="absolute -top-2 -right-2 w-5 h-5 text-yellow-400 animate-bounce" />
                </>
              ) : (
                <Lock className={`w-5 h-5 ${iconColor}`} />
              )}

              {/* Pulse animation for current level */}
              {status === "current" && (
                <div className="absolute inset-0 rounded-full border-4 border-blue-400 animate-ping opacity-75"></div>
              )}
            </button>
            <span
              className={`mt-2 text-sm font-bold px-2 py-1 rounded-full ${
                status === "completed"
                  ? "bg-emerald-100 text-emerald-700"
                  : status === "current"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {level.id}
            </span>
          </div>
        );
      })}

      <div className="absolute top-10 left-10 w-8 h-8 bg-yellow-200 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute top-20 right-20 w-6 h-6 bg-pink-200 rounded-full opacity-60 animate-pulse"></div>
      <div
        className="absolute bottom-20 left-20 w-10 h-10 bg-blue-200 rounded-full opacity-60 animate-bounce"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-10 right-10 w-7 h-7 bg-purple-200 rounded-full opacity-60 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  );
}
