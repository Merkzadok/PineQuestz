"use client";

import { useParams, useRouter } from "next/navigation";
import { WordCard } from "../components/WordCard";
import { words, WordData } from "@/app/utils/data";
import { levels } from "@/app/utils/level";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function WordCardPage() {
  const params = useParams();
  const router = useRouter();

  const wordIndex = Number(params.id);
  const wordData: WordData | undefined = words[wordIndex];

  const handleNext = (correct: boolean) => {
    if (correct && wordData) {
      const currentLevelIndexInArray = levels.findIndex(
        (level) => level.route === `/main/wordcard/${wordIndex}`
      );

      if (currentLevelIndexInArray !== -1) {
        const currentLevel = levels[currentLevelIndexInArray];

        localStorage.setItem(`level${currentLevel.id}`, "completed");
        console.log(`Progress saved for level ID: ${currentLevel.id}`);

        const nextLevel = levels[currentLevelIndexInArray + 1];

        if (nextLevel) {
          console.log(`Navigating to next level: ${nextLevel.route}`);
          router.push(nextLevel.route);
        } else {
          console.log("Last level completed! Returning to roadmap.");
          alert("🎉 Баяр хүргэе! Та бүх үеийг дуусгалаа!");
          router.push("/main/roadmap");
        }
      } else {
        console.error("Could not find the current level in the levels array.");
        router.push("/main/roadmap");
      }
    }
  };

  if (!wordData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          ❌ Энэ үе олдсонгүй!
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
    <div
      className="relative p-4 sm:p-6 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      style={{
        backgroundImage: "url('/images/green.avif')",
        backgroundPosition: "center 20%",
      }}
    >
      {/* overlay to soften image */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />

      <Link
        href="/"
        className="absolute top-4 right-4 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition z-10"
      >
        <ArrowLeft size={20} />
        Буцах
      </Link>

      <div className="z-10">
        <WordCard wordData={wordData} onNext={handleNext} />
      </div>
    </div>
  );
}
