"use client";

import { useParams, useRouter } from "next/navigation";
import CrossWordGame from "../components/CrossWordGame";
import { levels } from "@/app/utils/data";

export default function CrossWordPage() {
  const params = useParams();
  const router = useRouter();
  const levelIndex = Number(params.id);

  const handleNext = () => {
    localStorage.setItem(`level${levelIndex + 1}`, "completed");
    router.push(`/main/crossword/${levelIndex + 1}`);
  };

  if (!levels[levelIndex]) {
    return <div className="p-6 text-red-500">❌ Энэ crossword level олдсонгүй</div>;
  }

  return (
    <div className="p-6">
      <CrossWordGame
        levelIndex={levelIndex}
        wordsForLevel={levels[levelIndex]}
        onNext={handleNext}
      />
    </div>
  );
}