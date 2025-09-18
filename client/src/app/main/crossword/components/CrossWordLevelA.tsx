"use client";

import { useState } from "react";
import Image from "next/image";
import { Volume2, Star, CheckCircle } from "lucide-react";
import { playAudioDemo } from "@/app/utils/Demospeak";

export default function CrossWordLevelA() {
  const [step, setStep] = useState(1);
  const [foundCount, setFoundCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Letters for mini-game
  const letters = ["А", "Э", "И", "А", "О", "А", "Ү", "Ө", "У", "А"];

  const handleFind = (idx: number) => {
    if (letters[idx] === "А") {
      setFoundCount((prev) => prev + 1);
    }
  };

  // When they find 3 As → complete activity
  if (foundCount >= 3 && step === 3) {
    setTimeout(() => {
      setCompleted(true);
    }, 500);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Step 1: Show the letter А */}
        {step === 1 && (
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-gray-900">А</h1>
            <h2 className="text-6xl font-bold text-gray-700">а</h2>
            <button
              onClick={() => playAudioDemo("/audio/a.mp3")}
              className="mt-4 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-md hover:bg-blue-500"
            >
              <Volume2 className="w-6 h-6" />
              Дууг сонсох
            </button>
            <button
              onClick={() => setStep(2)}
              className="block mx-auto mt-6 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800"
            >
              Дараах
            </button>
          </div>
        )}

        {/* Step 2: Word with picture */}
        {step === 2 && (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Аав</h2>
            <div className="relative w-40 h-40 mx-auto">
              <Image
                src="/images/father.png"
                alt="Аав"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-lg text-gray-700">
              <span className="text-red-600 font-bold">А</span>ав
            </p>
            <button
              onClick={() => setStep(3)}
              className="mt-6 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800"
            >
              Дараах
            </button>
          </div>
        )}

        {/* Step 3: Mini activity - find А */}
        {step === 3 && !completed && (
          <div className="text-center space-y-4">
            <h2 className="text-xl font-bold text-gray-800">"А" үсгийг дар!</h2>
            <div className="grid grid-cols-5 gap-3 justify-center">
              {letters.map((letter, idx) => (
                <button
                  key={idx}
                  onClick={() => handleFind(idx)}
                  disabled={letter === "✓"}
                  className={`w-12 h-12 text-2xl font-bold border-2 rounded-lg transition 
                  ${
                    letter === "А"
                      ? "bg-blue-100 hover:bg-blue-200 text-blue-700 border-blue-300"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
            <p className="text-gray-600 mt-2">Олсон: {foundCount}/3</p>
          </div>
        )}

        {/* Step 4: Completion */}
        {completed && (
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto animate-bounce" />
            <h2 className="text-2xl font-bold text-green-700">Баяр хүргэе!</h2>
            <p className="text-gray-700">Чи "А" үсгийг сурлаа!</p>
            <div className="flex justify-center gap-2 mt-4">
              {[1, 2, 3].map((i) => (
                <Star
                  key={i}
                  className="w-8 h-8 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <button
              onClick={() => {
                setStep(1);
                setFoundCount(0);
                setCompleted(false);
              }}
              className="mt-6 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800"
            >
              Дахин тоглох
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
