"use client";
import React, { useEffect, useState } from "react";
import { Star, Lock, CheckCircle, Circle } from "lucide-react";

interface Level {
  id: number;
  status: "completed" | "current" | "locked";
  stars: number;
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [levels, setLevels] = useState<Level[]>([
    { id: 1, status: "completed", stars: 3 },
    { id: 2, status: "completed", stars: 2 },
    { id: 3, status: "current", stars: 0 },
    { id: 4, status: "locked", stars: 0 },
    { id: 5, status: "locked", stars: 0 },
  ]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleLevelClick = (levelId: number) => {
    const level = levels.find((l) => l.id === levelId);
    if (level && level.status !== "locked") {
      console.log(`Starting level ${levelId}`);
    }
  };

  const renderStars = (count: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < count ? "text-gray-800 fill-gray-800" : "text-gray-300"
        }`}
      />
    ));
  };

  const getLevelIcon = (level: Level) => {
    switch (level.status) {
      case "completed":
        return <CheckCircle className="w-6 h-6 text-gray-800" />;
      case "current":
        return <Circle className="w-6 h-6 text-gray-800" />;
      case "locked":
        return <Lock className="w-6 h-6 text-gray-400" />;
    }
  };

  const getLevelStyles = (level: Level) => {
    const baseStyles =
      "relative w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-pointer";

    switch (level.status) {
      case "completed":
        return `${baseStyles} bg-white border-gray-800 hover:scale-110 hover:shadow-lg`;
      case "current":
        return `${baseStyles} bg-gray-800 border-gray-800 text-white hover:scale-110 hover:shadow-lg animate-pulse`;
      case "locked":
        return `${baseStyles} bg-gray-100 border-gray-300 cursor-not-allowed`;
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div
        className={`max-w-md w-full transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Level Progress
          </h1>
          <p className="text-gray-600">
            Complete each level to unlock the next
          </p>
        </div>

        {/* Roadmap Path */}
        <div className="relative">
          {/* Connecting Lines */}
          <div className="absolute left-1/2 top-8 bottom-8 w-0.5 bg-gray-300 transform -translate-x-px">
            {/* Progress Line */}
            <div
              className="absolute top-0 left-0 w-full bg-gray-800 transition-all duration-1000 ease-out"
              style={{
                height: `${
                  ((levels.findIndex((l) => l.status === "current") + 1) /
                    levels.length) *
                  100
                }%`,
              }}
            />
          </div>

          {/* Level Nodes */}
          <div className="space-y-8">
            {levels.map((level, index) => (
              <div
                key={level.id}
                className={`flex items-center transition-all duration-500 ${
                  isLoaded
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Level Number and Icon */}
                <div className="flex items-center w-full">
                  {/* Left side - Level info for odd levels */}
                  {index % 2 === 0 && (
                    <div className="flex-1 text-right pr-6">
                      <div className="inline-block text-right">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Level {level.id}
                        </h3>
                        {level.status === "completed" && (
                          <div className="flex justify-end gap-1 mt-1">
                            {renderStars(level.stars)}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Center - Level Button */}
                  <div className="relative z-10">
                    <button
                      onClick={() => handleLevelClick(level.id)}
                      className={getLevelStyles(level)}
                      disabled={level.status === "locked"}
                    >
                      {level.status === "current" ? (
                        <span className="text-xl font-bold">{level.id}</span>
                      ) : (
                        getLevelIcon(level)
                      )}

                      {/* Glow effect for current level */}
                      {level.status === "current" && (
                        <div className="absolute inset-0 rounded-full bg-gray-800 opacity-20 animate-ping" />
                      )}
                    </button>
                  </div>

                  {/* Right side - Level info for even levels */}
                  {index % 2 === 1 && (
                    <div className="flex-1 pl-6">
                      <div className="inline-block">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Level {level.id}
                        </h3>
                        {level.status === "completed" && (
                          <div className="flex gap-1 mt-1">
                            {renderStars(level.stars)}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Stats */}
        <div
          className={`mt-12 text-center transition-all duration-1000 delay-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex justify-center gap-8 text-sm text-gray-600">
            <div>
              <span className="font-semibold text-gray-800">
                {levels.filter((l) => l.status === "completed").length}
              </span>
              <span className="ml-1">Completed</span>
            </div>
            <div>
              <span className="font-semibold text-gray-800">
                {levels.reduce((sum, l) => sum + l.stars, 0)}
              </span>
              <span className="ml-1">Stars</span>
            </div>
            <div>
              <span className="font-semibold text-gray-800">
                {levels.filter((l) => l.status === "locked").length}
              </span>
              <span className="ml-1">Locked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
