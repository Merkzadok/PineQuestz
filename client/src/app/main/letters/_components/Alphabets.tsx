"use client";

import { useTextSpeaker } from "@/provider/TextContext";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Монгол цагаан толгой
          </h1>
          <p className="text-gray-600 text-xl">
            Эгшиг болон гийгүүлэгч сурах хэрэгсэл
          </p>
        </div>

        {/* Vowels Section */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Эгшиг 13</h2>
            <p className="text-gray-600">Монгол хэлний эгшиг үсгүүд</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
            {vowels.map((letter, index) => (
              <button
                key={index}
                onClick={() => speakText(letter.word)}
                className="group relative w-28 h-24 bg-gradient-to-br from-white to-gray-50 
                         border-2 border-gray-200 rounded-3xl shadow-lg 
                         transition-all duration-300 transform
                         hover:shadow-2xl hover:-translate-y-2 hover:border-blue-300
                         active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-200
                         overflow-hidden"
              >
                {/* Background gradient effect */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 
                              opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center">
                  <span
                    className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 
                                 transition-colors duration-200"
                  >
                    {letter.word}
                  </span>
                  <span
                    className="text-xs text-gray-500 mt-2 opacity-0 group-hover:opacity-100 
                                 transition-opacity duration-200"
                  >
                    дарж сонсох
                  </span>
                </div>

                {/* Audio icon */}
                <div
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-60 
                              transition-opacity duration-200"
                >
                  <svg
                    className="w-4 h-4 text-blue-600"
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

                {/* Ripple effect on click */}
                <div
                  className="absolute inset-0 rounded-3xl bg-blue-400 opacity-0 
                              group-active:opacity-20 group-active:animate-ping"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Special Letters Section */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Тэмдэг Үсэг 2
            </h2>
            <p className="text-gray-600">Монгол хэлний тэмдэг үсгүүд</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center max-w-md mx-auto">
            {specialLetters.map((letter, index) => (
              <button
                key={index}
                onClick={() => speakText(letter.word)}
                className="group relative w-28 h-24 bg-gradient-to-br from-white to-gray-50 
                         border-2 border-gray-200 rounded-3xl shadow-lg 
                         transition-all duration-300 transform
                         hover:shadow-2xl hover:-translate-y-2 hover:border-purple-300
                         active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-200
                         overflow-hidden"
              >
                {/* Background gradient effect */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 
                              opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center">
                  <span
                    className="text-2xl font-bold text-gray-800 group-hover:text-purple-700 
                                 transition-colors duration-200"
                  >
                    {letter.word}
                  </span>
                  <span
                    className="text-xs text-gray-500 mt-2 opacity-0 group-hover:opacity-100 
                                 transition-opacity duration-200"
                  >
                    дарж сонсох
                  </span>
                </div>

                {/* Audio icon */}
                <div
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-60 
                              transition-opacity duration-200"
                >
                  <svg
                    className="w-4 h-4 text-purple-600"
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

                {/* Ripple effect on click */}
                <div
                  className="absolute inset-0 rounded-3xl bg-purple-400 opacity-0 
                              group-active:opacity-20 group-active:animate-ping"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Consonants Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Гийгүүлэгч 20
            </h2>
            <p className="text-gray-600">
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
                    w-16 h-16 rounded-2xl font-bold text-xl
                    transition-all duration-200 transform
                    ${
                      selectedConsonant?.capital === c.capital
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105"
                        : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300 hover:shadow-md hover:scale-105"
                    }
                    active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-200
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
              <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">
                {selectedConsonant.capital} + эгшиг
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 justify-items-center">
                {selectedConsonant.vowels.map((vowel, idx) => {
                  const syllable = `${selectedConsonant.capital}${vowel}`;
                  return (
                    <button
                      key={idx}
                      onClick={() => speakText(syllable)}
                      className="group relative w-24 h-20 bg-gradient-to-br from-white to-gray-50 
                               border-2 border-gray-200 rounded-2xl shadow-md 
                               transition-all duration-200 transform
                               hover:shadow-xl hover:-translate-y-1 hover:border-blue-300
                               active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-200
                               overflow-hidden"
                    >
                      {/* Background effect */}
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 
                                    opacity-0 group-hover:opacity-10 transition-opacity duration-200"
                      />

                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700">
                          {syllable}
                        </span>
                        <span className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          дарж сонсох
                        </span>
                      </div>

                      {/* Audio icon */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-60 transition-opacity">
                        <svg
                          className="w-4 h-4 text-blue-600"
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
              <div
                className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 
                            rounded-full flex items-center justify-center"
              >
                <svg
                  className="w-12 h-12 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h4a1 1 0 011 1v2a1 1 0 01-1 1h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8H3a1 1 0 01-1-1V5a1 1 0 011-1h4z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">
                Эхлэхийн тулд дээрээс гийгүүлэгч сонгоно уу
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="text-center mt-16">
          <div
            className="inline-flex items-center px-6 py-3 bg-white/50 backdrop-blur-sm 
                        border border-gray-200 rounded-full shadow-sm"
          >
            <svg
              className="w-5 h-5 text-blue-600 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-gray-600">
              Товч дээр дарж үсэг болон үгийн дуудлагыг сонсоно уу
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
