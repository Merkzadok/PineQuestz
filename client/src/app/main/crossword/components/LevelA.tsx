"use client";

import { useState } from "react";
import Image from "next/image";
import { Volume2, CheckCircle, RotateCcw } from "lucide-react";
import { playAudioDemo } from "@/app/utils/Demospeak";

export default function CrossWordLevelA() {
  const [step, setStep] = useState(1);
  const [foundCount, setFoundCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [clickedLetters, setClickedLetters] = useState<boolean[]>(
    new Array(10).fill(false)
  );
  const [wrongCells, setWrongCells] = useState<number[]>([]);

  // Letters for mini-game
  const letters = ["А", "Э", "И", "А", "О", "А", "Ү", "Ө", "У", "А"];
  const handleFind = (idx: number) => {
    if (clickedLetters[idx]) return; // Already clicked

    const newClicked = [...clickedLetters];
    newClicked[idx] = true;

    if (letters[idx] === "А") {
      setClickedLetters(newClicked);
      setFoundCount((prev) => prev + 1);

      if (foundCount + 1 >= 4) {
        setTimeout(() => {
          setCompleted(true);
          localStorage.setItem("level1", "completed");
        }, 500);
      }
    } else {
      // Wrong letter: trigger shake
      setWrongCells((prev) => [...prev, idx]);
      setTimeout(() => {
        setWrongCells((prev) => prev.filter((i) => i !== idx));
      }, 600); // duration of shake animation
    }
  };

  const resetGame = () => {
    setStep(1);
    setFoundCount(0);
    setCompleted(false);
    setClickedLetters(new Array(10).fill(false));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Step 1: Show the letter А */}
        {step === 1 && (
          <div className="bg-card rounded-3xl border shadow-lg p-8 text-center space-y-6">
            <div className="space-y-4">
              <div className="text-8xl font-bold text-foreground">А</div>
              <div className="text-6xl font-bold text-muted-foreground">а</div>
            </div>

            <button
              onClick={() => playAudioDemo("/audio/a.mp3")}
              className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold shadow-md hover:bg-primary/90 transition-colors"
            >
              <Volume2 className="w-5 h-5" />
              Listen
            </button>

            <button
              onClick={() => setStep(2)}
              className="block w-full mt-6 px-6 py-3 bg-secondary text-secondary-foreground rounded-2xl font-semibold hover:bg-secondary/80 transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: Word with picture */}
        {step === 2 && (
          <div className="bg-card rounded-3xl border shadow-lg p-8 text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Алим</h2>

            <div className="relative w-32 h-32 mx-auto bg-muted rounded-2xl overflow-hidden">
              <Image
                src="/images/apple.jpg"
                alt="apple"
                fill
                className="object-contain p-2"
              />
            </div>

            <p className="text-xl text-foreground">
              <span className="text-primary font-bold text-2xl">А</span>ав
            </p>

            <button
              onClick={() => setStep(3)}
              className="block w-full px-6 py-3 bg-secondary text-secondary-foreground rounded-2xl font-semibold hover:bg-secondary/80 transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 3: Mini activity - find А */}
        {step === 3 && !completed && (
          <div className="bg-card rounded-3xl border shadow-lg p-8 text-center space-y-6">
            <h2 className="text-2xl font-bold text-foreground">
              Find all А letters!
            </h2>

            <div className="grid grid-cols-5 gap-3">
              {letters.map((letter, idx) => {
                const isCorrect = letter === "А";
                const isClicked = clickedLetters[idx];
                const isWrong = wrongCells.includes(idx);

                return (
                  <button
                    key={idx}
                    onClick={() => handleFind(idx)}
                    disabled={isClicked}
                    className={`w-12 h-12 text-2xl font-bold rounded-xl transition-all duration-200 border-2
        ${
          isClicked && isCorrect
            ? "bg-green-100 text-green-700 border-green-300 scale-110"
            : isWrong
            ? "bg-background text-red-600 border-red-300 animate-shake"
            : "bg-background hover:bg-muted text-foreground border-border hover:scale-105"
        }
        ${isClicked ? "cursor-not-allowed" : "cursor-pointer"}
      `}
                  >
                    {isClicked && isCorrect ? "✓" : letter}
                  </button>
                );
              })}
            </div>

            <div className="bg-muted rounded-2xl p-4">
              <p className="text-muted-foreground">Found: {foundCount}/4</p>
              <div className="w-full bg-border rounded-full h-2 mt-2">
                <div
                  className="bg-primary rounded-full h-2 transition-all duration-300"
                  style={{ width: `${(foundCount / 4) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Completion */}
        {completed && (
          <div className="bg-card rounded-3xl border shadow-lg p-8 text-center space-y-6">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto animate-bounce" />

            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-green-700">Great job!</h2>
              <p className="text-muted-foreground text-lg">
                You learned the letter А!
              </p>
            </div>

            {/* Success animation */}
            <div className="text-6xl animate-pulse">🎉</div>

            <div className="flex gap-4">
              <button
                onClick={resetGame}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-2xl font-semibold hover:bg-secondary/80 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Play Again
              </button>

              <button
                onClick={() => window.history.back()}
                className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold hover:bg-primary/90 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
