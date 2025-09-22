"use client";

import { useTextSpeaker } from "@/provider/TextContext";

type Letter = {
  word: string;
};

const words: Letter[] = [
  { word: "А а" },
  { word: "Б б" },
  { word: "В в" },
  { word: "Г г" },
  { word: "Д д" },
  { word: "Е е" },
  { word: "Ё ё" },
  { word: "Ж ж" },
  { word: "З з" },
  { word: "И и" },
  { word: "Й й" },
  { word: "К к" },
  { word: "Л л" },
  { word: "М м" },
  { word: "Н н" },
  { word: "О о" },
  { word: "Ө ө" },
  { word: "П п" },
  { word: "Р р" },
  { word: "С с" },
  { word: "Т т" },
  { word: "У у" },
  { word: "Ү ү" },
  { word: "Ф ф" },
  { word: "Х х" },
  { word: "Ц ц" },
  { word: "Ч ч" },
  { word: "Ш ш" },
  { word: "Щ щ" },
  { word: "Ъ ъ" },
  { word: "Ы ы" },
  { word: "Ь ь" },
  { word: "Э э" },
  { word: "Ю ю" },
  { word: "Я я" },
];
// const capital: Letter[] = [
//   { word: "А" },
//   { word: "Б" },
//   { word: "В" },
//   { word: "Г" },
//   { word: "Д" },
//   { word: "Е" },
//   { word: "Ё" },
//   { word: "Ж" },
//   { word: "З" },
//   { word: "И" },
//   { word: "Й" },
//   { word: "К" },
//   { word: "Л" },
//   { word: "М" },
//   { word: "Н" },
//   { word: "О" },
//   { word: "Ө" },
//   { word: "П" },
//   { word: "Р" },
//   { word: "С" },
//   { word: "Т" },
//   { word: "У" },
//   { word: "Ү" },
//   { word: "Ф" },
//   { word: "Х" },
//   { word: "Ц" },
//   { word: "Ч" },
//   { word: "Ш" },
//   { word: "Щ" },
//   { word: "Ъ" },
//   { word: "Ы" },
//   { word: "Ь" },
//   { word: "Э" },
//   { word: "Ю" },
//   { word: "Я" },
// ];
// const small: Letter[] = [
//   { word: "" },
//   { word: "б" },
//   { word: "в" },
//   { word: "г" },
//   { word: "д" },
//   { word: "е" },
//   { word: "ё" },
//   { word: "ж" },
//   { word: "з" },
//   { word: "и" },
//   { word: "й" },
//   { word: "к" },
//   { word: "л" },
//   { word: "м" },
//   { word: "н" },
//   { word: "о" },
//   { word: "ө" },
//   { word: "п" },
//   { word: "р" },
//   { word: "с" },
//   { word: "т" },
//   { word: "у" },
//   { word: "ү" },
//   { word: "ф" },
//   { word: "х" },
//   { word: "ц" },
//   { word: "ч" },
//   { word: "ш" },
//   { word: "щ" },
//   { word: "ъ" },
//   { word: "ы" },
//   { word: "ь" },
//   { word: "э" },
//   { word: "ю" },
//   { word: "я" },
// ];

export default function Alphabets() {
  const { speakText } = useTextSpeaker();

  return (
    <div className="p-6 max-w-[900px] mx-auto">
      <h1 className="text-2xl font-bold text-center mb-10">
        Монгол цагаан толгой
      </h1>

      <div className="grid grid-cols-4 gap-2">
        {words.map((letter, index) => (
          <button
            key={index}
            onClick={() => speakText(letter.word)}
            className="
              flex items-center justify-center mb-4
              w-[90px] h-[60px] 
              bg-white 
              border-2
              border-gray-300
              rounded-2xl 
              shadow-md
              text-lg font-semibold
              transition-transform duration-200
              hover:-translate-y-1 hover:shadow-xl
              active:scale-95
            "
          >
            <p className="border-b-6 rounded border-gray-200 text-gray-600 text-[20px]">
              {letter.word}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
