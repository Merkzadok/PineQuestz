"use client";
import React, { useState } from "react";
import { Mascot } from "@/app/parent/components/Mascot";
import { useRouter } from "next/navigation";
import { Play, Sparkles } from "lucide-react";

const KidPage: React.FC = () => {
  const router = useRouter();
  const [currentLesson, setCurrentLesson] = useState<number>(1);

  const handlePlayLesson = () => {
    // router.push(`/main/crossword/${currentLesson}`);
    router.push("/");
  };

  const handleGames = () => {
    // Navigate to games/practice mode
    router.push(`/main/games`);
  };

  const handleStickers = () => {
    // Navigate to stickers/rewards
    router.push(`/main/stickers`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Mascot */}
      <div className="mb-8">
        <Mascot mood="happy" size="large" />
      </div>

      {/* Three Main Buttons */}
      <div className="space-y-4 w-full max-w-sm">
        {/* Play Button - Primary */}
        <button
          onClick={handlePlayLesson}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg p-6 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-4"
        >
          <Play className="w-8 h-8" />
          <span className="text-xl font-semibold">PLAY</span>
        </button>

        {/* Games Button */}
        {/* <button
          onClick={handleGames}
          className="w-full bg-card hover:bg-accent text-foreground border rounded-lg p-6 shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-4"
        >
          <Gamepad2 className="w-8 h-8" />
          <span className="text-xl font-semibold">GAMES</span>
        </button> */}

        {/* Stickers Button */}
        <button
          onClick={handleStickers}
          className="w-full bg-card hover:bg-accent text-foreground border rounded-lg p-6 shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-4"
        >
          <Sparkles className="w-8 h-8" />
          <span className="text-xl font-semibold">Rewards</span>
        </button>
      </div>

      {/* Subtle decorative elements */}
      <div className="fixed top-10 left-10 w-2 h-2 bg-muted-foreground/20 rounded-full animate-pulse"></div>
      <div className="fixed top-20 right-10 w-3 h-3 bg-muted-foreground/10 rounded-full animate-pulse delay-300"></div>
      <div className="fixed bottom-20 left-10 w-2 h-2 bg-muted-foreground/15 rounded-full animate-pulse delay-700"></div>
      <div className="fixed bottom-10 right-20 w-4 h-4 bg-muted-foreground/10 rounded-full animate-pulse delay-500"></div>
    </div>
  );
};

export default KidPage;
