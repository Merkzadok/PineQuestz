import { useState } from "react";
import { WordData } from "../utils/data";
import { DragDropWord } from "./DragDropWord";
import { AudioRecorder } from "./AudioRecorder";
import Image from "next/image";
import { useTextSpeaker } from "@/provider/TextContext";
import { Mic, Mic2, Volume2 } from "lucide-react";

interface Props {
  wordData: WordData;
  onNext: (correct: boolean) => void;
}

export const WordCard: React.FC<Props> = ({ wordData, onNext }) => {
  const { speakText } = useTextSpeaker();
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [slots, setSlots] = useState<(string | null)[]>([]);
  const [showPopup, setShowPopup] = useState<string | null>(null);

  const handleCheckOrNext = () => {
    if (isCorrect === null) {
      const correct = slots.join("") === wordData.word;
      setIsCorrect(correct);
      setShowPopup(correct ? `🎉 Зөв байна! ${wordData.word} 🟢` : `😅 Буруу байна`);
      setTimeout(() => setShowPopup(null), 2000);
    } else if (isCorrect) {
      onNext(true);
      setIsCorrect(null);
    } else {
      setIsCorrect(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center w-full max-w-lg mx-auto">
      {wordData.image && (
        <div className="relative mb-4 group">
          <Image
            src={wordData.image}
            alt={wordData.word}
            width={200}
            height={200}
            className="object-contain rounded-lg shadow-md cursor-pointer"
    
          />
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity">
            <Volume2 onClick={() => speakText(wordData.word)} className="text-white" />
          </div>
        </div>
      )}

      <DragDropWord word={wordData.word} letters={wordData.letters} onSlotsChange={setSlots} />

<div className="flex item-center justify-center gap-4 mt-4">
  <button
        onClick={handleCheckOrNext}
        className={`mt-4 px-6 py-2 rounded-full shadow-md text-lg font-bold transition ${
          isCorrect === null
            ? "bg-green-500 text-white hover:bg-green-600"
            : isCorrect
            ? "bg-yellow-400 text-black hover:bg-yellow-500"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {isCorrect === null ? "Шалгах" : isCorrect ? "Дараах" : "Дахин эхлэх"}
      </button>
</div>
    
   
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white px-6 py-4 rounded-2xl shadow-2xl text-xl font-bold text-center transform transition-all duration-500 ease-out scale-110 -translate-y-4 opacity-100">
            {showPopup}
          </div>
        </div>
      )}


    </div>
  );
};
