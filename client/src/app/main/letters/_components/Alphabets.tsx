"use client";

import { useTextSpeaker } from "@/provider/TextContext";
import { MoveUp } from "lucide-react";
import { useState } from "react";

type Letter = {
  word: string;
};

type LetterWithVowels = {
  capital: string;
  vowels: string[];
};

const vowels: Letter[] = [
  { word: "А а" },
  { word: "Э э" },
  { word: "И и" },
  { word: "О о" },
  { word: "У у" },
  { word: "Ө ө" },
  { word: "Ү ү" },
  { word: "Я я" },
  { word: "Е е" },
  { word: "Ё ё" },
  { word: "Ю ю" },
  { word: "Й й" },
  { word: "Ы ы" },
];

const specialLetters: Letter[] = [{ word: "Ъ ъ" }, { word: "Ь ь" }];

const consonants: LetterWithVowels[] = [
  { capital: "Б", vowels: ["а", "э", "и", "о", "у", "ө", "ү"] },
  { capital: "В", vowels: ["а", "э", "и", "о", "у", "ө", "ү"] },
  { capital: "Г", vowels: ["а", "э", "и", "о", "у", "ө", "ү"] },
  { capital: "Д", vowels: ["а", "э", "и", "о", "у", "ө", "ү"] },
  { capital: "Ж", vowels: ["а", "э", "и", "о", "у", "ө", "ү"] },
  { capital: "З", vowels: ["а", "э", "и", "о", "у", "ө", "ү"] },
  { capital: "К", vowels: ["а", "э", "и", "о", "у", "ө", "ү"] },
  { capital: "Л", vowels: ["а", "э", "и", "о", "у", "ө", "ү"] },
  { capital: "М", vowels: ["а", "э", "и", "о", "у", "ө", "ү"] },
  { capital: "Н", vowels: ["а", "э", "и", "о", "у", "ө", "ү"] },
  { capital: "П", vowels: ["а", "э", "и", "о", "у", "ө", "ү"] },
  { capital: "Р", vowels: ["а", "э", "и", "о", "у", "ө", "ү"] },
  { capital: "С", vowels: ["а", "э", "и", "о", "у", "ө", "ү"] },
  { capital: "Т", vowels: ["а", "э", "и", "о", "у", "ө", "ү"] },
  { capital: "Ф", vowels: ["а", "э", "и", "о", "у", "ө", "ү"] },
  { capital: "Х", vowels: ["а", "э", "и", "о", "у", "ө", "ү"] },
  { capital: "Ц", vowels: ["а", "э", "и", "о", "у", "ө", "ү"] },
  { capital: "Ч", vowels: ["а", "э", "и", "о", "у", "ө", "ү"] },
  { capital: "Ш", vowels: ["а", "э", "и", "о", "у", "ө", "ү"] },
  { capital: "Щ", vowels: ["а", "э", "и", "о", "у", "ө", "ү"] },
];

export default function MongolianAlphabet() {
  const { speakText } = useTextSpeaker();
  const [selectedConsonant, setSelectedConsonant] =
    useState<LetterWithVowels | null>(null);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Custom Background Pattern */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50"
        style={{
          backgroundImage: "url('/images/green.avif')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/70 via-purple-100/60 to-pink-200/70" />

      <div className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Main Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-800 mb-4 drop-shadow-lg">
              Цагаан толгой
            </h1>
            <p className="text-gray-700 text-xl font-medium bg-white/30 backdrop-blur-sm rounded-full px-6 py-2 inline-block">
              Эгшиг болон гийгүүлэгч
            </p>
          </div>

          {/* Vowels Section */}
          <div className="mb-20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 drop-shadow-md">
                Эгшиг 13
              </h2>
              <p className="text-gray-700 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-1 inline-block">
                Монгол хэлний эгшиг үсгүүд
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
              {vowels.map((letter, index) => (
                <button
                  key={index}
                  onClick={() => speakText(letter.word)}
                  className="group relative w-28 h-24 bg-white/80 backdrop-blur-sm
                           border-2 border-white/50 rounded-3xl shadow-lg 
                           transition-all duration-300 transform
                           hover:bg-green-500 hover:text-white hover:border-blue-400
                           hover:shadow-2xl hover:-translate-y-1 hover:scale-105
                           active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300
                           overflow-hidden"
                >
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold transition-colors duration-300">
                      {letter.word}
                    </span>
                    <span className="text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      дарж сонсох
                    </span>
                  </div>

                  {/* Audio icon */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.824L4.7 13.324a1 1 0 00-.577-.18H2a1 1 0 01-1-1V7.856a1 1 0 011-1h2.123a1 1 0 00.577-.18l3.683-3.5a1 1 0 011-.1zM14 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Special Letters Section */}
          <div className="mb-20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 drop-shadow-md">
                Тэмдэг Үсэг 2
              </h2>
              <p className="text-gray-700 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-1 inline-block">
                Монгол хэлний тэмдэг үсгүүд
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center max-w-md mx-auto">
              {specialLetters.map((letter, index) => (
                <button
                  key={index}
                  onClick={() => speakText(letter.word)}
                  className="group relative w-28 h-24 bg-white/80 backdrop-blur-sm
                           border-2 border-white/50 rounded-3xl shadow-lg 
                           transition-all duration-300 transform
                           hover:bg-green-500 hover:text-white hover:border-purple-400
                           hover:shadow-2xl hover:-translate-y-1 hover:scale-105
                           active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-300
                           overflow-hidden"
                >
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold transition-colors duration-300">
                      {letter.word}
                    </span>
                    <span className="text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      дарж сонсох
                    </span>
                  </div>

                  {/* Audio icon */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.824L4.7 13.324a1 1 0 00-.577-.18H2a1 1 0 01-1-1V7.856a1 1 0 011-1h2.123a1 1 0 00.577-.18l3.683-3.5a1 1 0 011-.1zM14 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Consonants Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 drop-shadow-md">
                Гийгүүлэгч 20
              </h2>
              <p className="text-gray-700 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                {selectedConsonant
                  ? `Сонгосон үсэг: ${selectedConsonant.capital}`
                  : "Гийгүүлэгч сонгоно уу"}
              </p>
            </div>

            {/* Consonant Selection Grid */}
            <div className="mb-12">
              <div className="grid grid-cols-5 sm:grid-cols-7 lg:grid-cols-10 gap-3 justify-items-center">
                {consonants.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedConsonant(c)}
                    className={`
                      w-16 h-16 rounded-2xl font-bold text-xl backdrop-blur-sm
                      transition-all duration-200 transform shadow-lg
                      ${
                        selectedConsonant?.capital === c.capital
                          ? "bg-green-500 text-white border-2 border-green-400 scale-105"
                          : "bg-white/80 text-gray-700 border-2 border-white/50 hover:bg-green-500 hover:text-white hover:border-green-400 hover:scale-105"
                      }
                      active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-300
                    `}
                  >
                    {c.capital}
                  </button>
                ))}
              </div>
            </div>

            {/* Syllables Grid */}
            {selectedConsonant && (
              <div className="animate-in slide-in-from-bottom-4 duration-300">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center bg-white/30 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                  {selectedConsonant.capital} + эгшиг
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 justify-items-center">
                  {selectedConsonant.vowels.map((vowel, idx) => {
                    const syllable = `${selectedConsonant.capital}${vowel}`;
                    return (
                      <button
                        key={idx}
                        onClick={() => speakText(syllable)}
                        className="group relative w-24 h-20 bg-white/80 backdrop-blur-sm
                                 border-2 border-white/50 rounded-2xl shadow-md 
                                 transition-all duration-200 transform
                                 hover:bg-green-500 hover:text-white hover:border-orange-400
                                 hover:shadow-xl hover:-translate-y-1 hover:scale-105
                                 active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-300
                                 overflow-hidden"
                      >
                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col items-center justify-center">
                          <span className="text-2xl font-bold transition-colors duration-200">
                            {syllable}
                          </span>
                          <span className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            дарж сонсох
                          </span>
                        </div>

                        {/* Audio icon */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.824L4.7 13.324a1 1 0 00-.577-.18H2a1 1 0 01-1-1V7.856a1 1 0 011-1h2.123a1 1 0 00.577-.18l3.683-3.5a1 1 0 011-.1zM14 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Empty state for consonants */}
            {!selectedConsonant && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-green-400 rounded-full flex items-center justify-center shadow-md">
                  <MoveUp className="h-14 w-10 text-white" />
                </div>
                <p className="text-gray-800 text-lg font-medium bg-white/30 backdrop-blur-sm rounded-lg px-6 py-2 inline-block">
                  Эхлэхийн тулд дээрээс гийгүүлэгч сонгоно уу
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
