// "use client";
// import React, { useState } from "react";
// import { Mascot } from "@/app/parent/components/Mascot";
// import { ProgressRoadmap } from "@/app/parent/components/ProgressRoadMap";
// import { useRouter } from "next/navigation";

// // Type definitions
// interface Lesson {
//   id: number;
//   title: string;
// }

// const KidPage: React.FC = () => {
//   const router = useRouter();
//   const [currentLesson, setCurrentLesson] = useState<number>(1);

//   const lessons: Lesson[] = [
//     { id: 1, title: "Basic Greetings" },
//     { id: 2, title: "Family Members" },
//     { id: 3, title: "Colors & Numbers" },
//     { id: 4, title: "Animals" },
//     { id: 5, title: "Food & Drinks" },
//     { id: 6, title: "Weather" },
//     { id: 7, title: "Time & Days" },
//     { id: 8, title: "Transportation" },
//   ];

//   const handleLessonSelect = (lesson: Lesson) => {
//     if (lesson.id <= currentLesson) {
//       // Navigate to the dynamic lesson page
//       router.push(`/main/crossword/${lesson.id}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
//       {/* Header with Mascot */}
//       <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md flex flex-col items-center gap-4">
//         <Mascot mood="happy" size="large" />
//         <h1 className="text-2xl font-bold text-gray-800 text-center">
//           Сайн байна уу!
//         </h1>
//         <p className="text-gray-600 text-center">
//           Өнөөдөр суралцахад бэлэн үү?
//         </p>
//       </div>

//       {/* Progress Roadmap */}
//       <div className="mt-6 w-full max-w-md">
//         <ProgressRoadmap
//           lessons={lessons}
//           currentLesson={currentLesson}
//           onLessonSelect={handleLessonSelect}
//         />
//       </div>
//     </div>
//   );
// };

// export default KidPage;
"use client";
import React, { useState } from "react";
import { Mascot } from "@/app/parent/components/Mascot";
import { useRouter } from "next/navigation";
import { Play, Gamepad2, Star, Sparkles } from "lucide-react";

const KidPage: React.FC = () => {
  const router = useRouter();
  const [currentLesson, setCurrentLesson] = useState<number>(1);

  const handlePlayLesson = () => {
    // router.push(`/main/crossword/${currentLesson}`);
    router.push("roadmap");
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
        <button
          onClick={handleGames}
          className="w-full bg-card hover:bg-accent text-foreground border rounded-lg p-6 shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-4"
        >
          <Gamepad2 className="w-8 h-8" />
          <span className="text-xl font-semibold">GAMES</span>
        </button>

        {/* Stickers Button */}
        <button
          onClick={handleStickers}
          className="w-full bg-card hover:bg-accent text-foreground border rounded-lg p-6 shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-4"
        >
          <Sparkles className="w-8 h-8" />
          <span className="text-xl font-semibold">STICKERS</span>
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
