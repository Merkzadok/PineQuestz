import { useRef, useState } from "react";
import { WordData } from "../utils/data";
import { DragDropWord } from "./DragDropWord";
import Image from "next/image";
import { useTextSpeaker } from "@/provider/TextContext";
import { Volume2 } from "lucide-react";
import VoiceTranscriber from "./VoiceTranscriber";

interface Props {
  wordData: WordData;
  onNext: (correct: boolean) => void;
}

export const WordCard: React.FC<Props> = ({ wordData, onNext }) => {
  const dragDropRef = useRef<{ resetSlots: () => void }>(null);
  const { speakText } = useTextSpeaker();
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [slots, setSlots] = useState<(string | null)[]>([]);
  const [showPopup, setShowPopup] = useState<string | null>(null);

    const handleCorrectSpeech = () => {
    alert("🎉 Баяр хүргэе! Чи зөв хэллээ.");
    onNext(false); 
  };

  const handleCheckOrNext = () => {
    if (isCorrect === null) {
      const correct = slots.join("") === wordData.word;
      setIsCorrect(correct);
      setShowPopup(correct ? `🎉 Зөв байна! ${wordData.word} 🟢` : `😅 Буруу байна`);
      setTimeout(() => setShowPopup(null), 2000);
    } else if (isCorrect) {
      onNext(true);
      setIsCorrect(null);
      dragDropRef.current?.resetSlots();
    } else {
      setIsCorrect(null);
      dragDropRef.current?.resetSlots();
    }
  };

  const handleSpeakSlots = () => {
    const currentWord = slots.filter(Boolean).join("");
    if (currentWord) speakText(currentWord);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center w-full max-w-lg mx-auto">
      {/* Image and text to speech */}
      {wordData.image && (
        <div className="relative mb-4 group">
          <Image
            src={wordData.image}
            alt={wordData.word}
            width={300}
            height={300}
            className="object-contain rounded-lg shadow-md cursor-pointer"
          />
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity">
            <Volume2 onClick={() => speakText(wordData.word)} className="text-white cursor-pointer" />
          </div>
        </div>
      )}
    {/* Display letters drag and drop */}
      <DragDropWord
        ref={dragDropRef}
        word={wordData.word}
        letters={wordData.letters}
        onSlotsChange={setSlots}
      />

     {/* Pool text to speech */}
      <Volume2
        onClick={handleSpeakSlots}
        className="w-10 h-10 text-green-600 cursor-pointer hover:text-green-800 transition"
      />

   <div className="w-full flex flex-col item-center">
       {/* 🎤 Speech-to-Text */}
        <div className="flex flex-col items-center mt-4">   
          <VoiceTranscriber
        targetWord={wordData.word}
        onCorrect={handleCorrectSpeech}
      />
        </div>

        {/* Check/Next button */}  
    <div className="flex flex-col items-center mt-4 ">
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

      {/* Pop up message */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-white px-6 py-4 rounded-2xl shadow-2xl text-xl font-bold text-center transform transition-all duration-500 ease-out scale-110 -translate-y-4 opacity-100">
              {showPopup}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
WordCard.displayName = "WordCard";