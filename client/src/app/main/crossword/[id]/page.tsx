"use client";

import { useParams, useRouter } from "next/navigation";
import CrossWordGame from "../components/CrossWordGame";
import { levels } from "@/app/utils/level";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CrossWordPage() {
  const params = useParams();
  const router = useRouter();
  const crosswordIndex = Number(params.id);

  // roadmap array дотор одоогийн crossword level-ийг олно
  const currentLevelIndexInArray = levels.findIndex(
    (level) => level.route === `/main/crossword/${crosswordIndex}`
  );
  const currentLevel =
    currentLevelIndexInArray !== -1
      ? levels[currentLevelIndexInArray]
      : undefined;

  const handleNext = () => {
    if (!currentLevel) {
      console.error("Could not find the current crossword in the levels array.");
      router.push("/main/roadmap");
      return;
    }

    // progress хадгална
    localStorage.setItem(`level${currentLevel.id}`, "completed");
    console.log(`Progress saved for level ID: ${currentLevel.id}`);

    // дараагийн үе рүү шилжинэ
    const nextLevel = levels[currentLevelIndexInArray + 1];
    if (nextLevel) {
      console.log(`Navigating to next level: ${nextLevel.route}`);
      router.push(nextLevel.route);
    } else {
      console.log("Last crossword level completed! Returning to roadmap.");
      alert("🎉 Баяр хүргэе! Та бүх үеийг дуусгалаа!");
      router.push("/main/roadmap");
    }
  };

  if (!currentLevel) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          ❌ Энэ crossword үе олдсонгүй!
        </h2>
        <p className="text-gray-700 mb-6">
          Магадгүй та бүх үеийг дуусгасан байх.
        </p>
        <Link
          href="/"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Газрын зураг руу буцах
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <Link
        href="/"
        className="absolute top-4 right-4 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
      >
        <ArrowLeft size={20} />
        Буцах
      </Link>
      <CrossWordGame levelIndex={crosswordIndex} onNext={handleNext} />
    </div>
  );
}
