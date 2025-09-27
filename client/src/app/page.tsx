"use client";

import { useEffect, useState } from "react";
import {
  Lock,
  CheckCircle,
  Star,
  Cat,
  Panda,
  PandaIcon,
  CatIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Level {
  id: number;
  route: string;
  section: string;
  x: number;
  y: number;
  gameType: "wordcard" | "crossword";
}

interface LessonProgress {
  levelId: number;
  completed: boolean;
}

const sectionColors: Record<
  string,
  { bg: string; dark: string; accent: string }
> = {
  WordCard: { bg: "bg-cyan-200", dark: "bg-cyan-600", accent: "bg-cyan-300" },
  CrossWord: {
    bg: "bg-fuchsia-200",
    dark: "bg-fuchsia-600",
    accent: "bg-fuchsia-300",
  },
  Colors: {
    bg: "bg-orange-200",
    dark: "bg-orange-600",
    accent: "bg-orange-300",
  },
  Animals: { bg: "bg-lime-200", dark: "bg-lime-600", accent: "bg-lime-300" },
  Food: { bg: "bg-rose-200", dark: "bg-rose-600", accent: "bg-rose-300" },
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
  return (
    <div
      className="absolute flex flex-col items-center z-10"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    ></div>
  );
};

export default function RoadMap() {
  const router = useRouter();
  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>([]);

  const levels: Level[] = [
    {
      id: 1,
      route: "/main/wordcard/0",
      section: "WordCard",
      x: 10,
      y: 85,
      gameType: "wordcard",
    },
    {
      id: 2,
      route: "/main/wordcard/1",
      section: "WordCard",
      x: 25,
      y: 75,
      gameType: "wordcard",
    },
    {
      id: 3,
      route: "/main/wordcard/2",
      section: "WordCard",
      x: 40,
      y: 85,
      gameType: "wordcard",
    },
    {
      id: 4,
      route: "/main/wordcard/3",
      section: "WordCard",
      x: 55,
      y: 75,
      gameType: "wordcard",
    },
    {
      id: 5,
      route: "/main/crossword/0",
      section: "CrossWord",
      x: 70,
      y: 85,
      gameType: "crossword",
    },
    {
      id: 6,
      route: "/main/wordcard/4",
      section: "WordCard",
      x: 85,
      y: 70,
      gameType: "wordcard",
    },
    {
      id: 7,
      route: "/main/wordcard/5",
      section: "WordCard",
      x: 70,
      y: 55,
      gameType: "wordcard",
    },
    {
      id: 8,
      route: "/main/wordcard/6",
      section: "WordCard",
      x: 55,
      y: 50,
      gameType: "wordcard",
    },
    {
      id: 9,
      route: "/main/wordcard/7",
      section: "WordCard",
      x: 40,
      y: 55,
      gameType: "wordcard",
    },
    {
      id: 10,
      route: "/main/crossword/1",
      section: "CrossWord",
      x: 25,
      y: 45,
      gameType: "crossword",
    },
    {
      id: 11,
      route: "/main/wordcard/8",
      section: "WordCard",
      x: 40,
      y: 35,
      gameType: "wordcard",
    },
    {
      id: 12,
      route: "/main/wordcard/9",
      section: "WordCard",
      x: 55,
      y: 25,
      gameType: "wordcard",
    },
    {
      id: 13,
      route: "/main/wordcard/10",
      section: "WordCard",
      x: 70,
      y: 35,
      gameType: "wordcard",
    },
    {
      id: 14,
      route: "/main/wordcard/11",
      section: "WordCard",
      x: 85,
      y: 25,
      gameType: "wordcard",
    },
    {
      id: 15,
      route: "/main/crossword/2",
      section: "CrossWord",
      x: 75,
      y: 15,
      gameType: "crossword",
    },
    {
      id: 16,
      route: "/main/wordcard/12",
      section: "WordCard",
      x: 60,
      y: 5,
      gameType: "wordcard",
    },
    {
      id: 17,
      route: "/main/wordcard/13",
      section: "WordCard",
      x: 45,
      y: 15,
      gameType: "wordcard",
    },
    {
      id: 18,
      route: "/main/wordcard/14",
      section: "WordCard",
      x: 30,
      y: 5,
      gameType: "wordcard",
    },
    {
      id: 19,
      route: "/main/wordcard/15",
      section: "WordCard",
      x: 15,
      y: 15,
      gameType: "wordcard",
    },
    {
      id: 20,
      route: "/main/crossword/3",
      section: "CrossWord",
      x: 10,
      y: 30,
      gameType: "crossword",
    },
  ];

  const sectionSeparators = [
    { section: "WordCard", x: 15, y: 70 },
    { section: "CrossWord", x: 78, y: 80 },
  ];

  useEffect(() => {
    const savedProgress = levels.map((level) => ({
      levelId: level.id,
      completed: localStorage.getItem(`level${level.id}`) === "completed",
    }));
    setLessonProgress(savedProgress);
  }, []);

  const getLevelStatus = (level: Level) => {
    const currentIndex = levels.findIndex((l) => l.id === level.id);
    if (currentIndex === 0) {
      const currentProgress = lessonProgress.find(
        (l) => l.levelId === level.id
      );
      return currentProgress?.completed ? "completed" : "current";
    }

    const prevLevel = levels[currentIndex - 1];
    const prevCompleted = lessonProgress.find(
      (l) => l.levelId === prevLevel.id
    )?.completed;

    if (!prevCompleted) return "locked";

    const currentProgress = lessonProgress.find((l) => l.levelId === level.id);
    return currentProgress?.completed ? "completed" : "current";
  };

  const handleLevelClick = (level: Level) => {
    if (getLevelStatus(level) === "locked") return;
    router.push(level.route);
  };

  const getLevelLabel = (level: Level) => {
    const index = parseInt(level.route.split("/").pop() || "0", 10) + 1;
    if (level.gameType === "wordcard") {
      return <PandaIcon className="w-5 h-5 text-black" />;
    } else {
      return <CatIcon className="w-5 h-5 text-black" />;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/green.avif')",
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
          const currentStatus = getLevelStatus(level);
          const isCompleted =
            prevStatus === "completed" &&
            (currentStatus === "completed" || currentStatus === "current");

          return (
            <g key={`line-${level.id}`}>
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
              {getLevelLabel(level)}
            </span>
          </div>
        );
      })}

      {/* Info Panel */}
      <div className="absolute top-4 right-4 bg-white/90 rounded-lg p-4 shadow-lg max-w-xs">
        <h3 className="font-bold text-lg mb-2">Тоглоомын зааварчилгаа</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="bg-cyan-200 text-cyan-800 px-2 py-1 rounded font-bold">
              <Cat />
            </span>
            <span>Үг бүтээх тоглоом</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-fuchsia-200 text-fuchsia-800 px-2 py-1 rounded font-bold">
              <Panda />
            </span>
            <span>Үг хайх тоглоом</span>
          </div>
        </div>
      </div>

      <div style={{ animationDelay: "1s" }}></div>
      <div style={{ animationDelay: "2s" }}></div>
    </div>
  );
}
