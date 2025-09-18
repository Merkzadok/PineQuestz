"use client";

import { useEffect, useState } from "react";
import { WordData, shuffleArray } from "../utils/data";
import { DndContext, useDraggable, useDroppable, DragEndEvent } from "@dnd-kit/core";
import Image from "next/image";
import { useTextSpeaker } from "@/provider/TextContext";

interface WordCardProps {
  wordData: WordData;
  onNext: (correct: boolean) => void;
}

type PoolItem = { letter: string; id: string };

const DraggableLetter = ({ id, letter }: PoolItem) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  const style = {
    transform: transform ? `translate3d(${transform.x}px,${transform.y}px,0)` : undefined,
    transition: isDragging ? "none" : "transform 0.3s ease",
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`w-12 h-12 flex items-center justify-center rounded-lg border font-bold text-lg cursor-grab transition ${
        isDragging ? "bg-yellow-300 scale-110 shadow-lg" : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      {letter}
    </div>
  );
};

const DroppableSlot = ({ id, letter, correctLetter }: { id: string; letter: string | null; correctLetter: string }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  let bg = "bg-gray-100 border-gray-300 transition-all duration-300";
  if (letter) bg = letter === correctLetter ? "bg-green-300 border-green-500" : "bg-red-300 border-red-500";
  else if (isOver) bg = "bg-yellow-200 border-yellow-500";

  return (
    <div
      ref={setNodeRef}
      className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 font-bold text-xl ${bg}`}
    >
      {letter}
    </div>
  );
};

export const WordCard: React.FC<WordCardProps> = ({ wordData, onNext }) => {
  const { speakText } = useTextSpeaker();
  const [slots, setSlots] = useState<(string | null)[]>([]);
  const [pool, setPool] = useState<PoolItem[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showPopup, setShowPopup] = useState<string | null>(null);

  const initPool = () => shuffleArray(wordData.letters).map((l, idx) => ({ letter: l, id: `${l}-${idx}-${Date.now()}` }));

  const resetWord = () => {
    setSlots(Array(wordData.word.length).fill(null));
    setPool(initPool());
    setIsCorrect(null);
    setShowPopup(null);
  };

  useEffect(() => {
    resetWord();
  }, [wordData]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over) return;

    const letterId = active.id as string;
    const letter = letterId.split("-")[0];

    if (typeof over.id === "string") {
      if (over.id.startsWith("slot-")) {
        const slotIdx = parseInt(over.id.replace("slot-", ""), 10);
        if (!isNaN(slotIdx)) {
          const newSlots = [...slots];
          if (newSlots[slotIdx]) setPool((prev) => [...prev, { letter: newSlots[slotIdx]!, id: `${newSlots[slotIdx]}-${Date.now()}` }]);
          newSlots[slotIdx] = letter;
          setSlots(newSlots);
          setPool((prev) => prev.filter((p) => p.id !== letterId));
        }
      } else if (over.id === "pool") {
        const newSlots = [...slots];
        let removed = false;
        for (let i = 0; i < newSlots.length; i++) {
          if (newSlots[i] === letter && !removed) {
            newSlots[i] = null;
            removed = true;
          }
        }
        setSlots(newSlots);
        if (!pool.find((p) => p.id === letterId)) setPool((prev) => [...prev, { letter, id: letterId }]);
      }
    }
  };

  const handleCheckOrNext = () => {
    if (isCorrect === null) {
      const correct = slots.join("") === wordData.word;
      setIsCorrect(correct);
      setShowPopup(correct ? `🎉 Зөв байна! ${wordData.word} 🟢` : `😅 Буруу байна`);
      setTimeout(() => setShowPopup(null), 2000);
    } else if (isCorrect) {
      onNext(isCorrect === true);
      resetWord();
    } else {
      resetWord();
    }
  };

  const handleSpeak = () => speakText(wordData.word);

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

    {/* Hover overlay */}
    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity">
      <span onClick={handleSpeak} className="text-white font-bold text-lg">{wordData.word}</span>
    </div>
  </div>
)}


      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-2 mb-6">
          {slots.map((letter, idx) => (
            <DroppableSlot key={idx} id={`slot-${idx}`} letter={letter} correctLetter={wordData.word[idx]} />
          ))}
        </div>

        <div id="pool" className="flex flex-wrap gap-2 mb-6 justify-center">
          {pool.map((item) => (
            <DraggableLetter key={item.id} {...item} />
          ))}
        </div>
      </DndContext>

{/* Single button: Check / Next / Retry */}
<button
  onClick={handleCheckOrNext}
  className={`px-6 py-2 rounded-full shadow-md text-lg font-bold transition transform active:scale-95 ${
    isCorrect === null
      ? "bg-green-500 text-white hover:bg-green-600 cursor-pointer"
      : isCorrect
      ? "bg-yellow-400 text-black hover:bg-yellow-500 cursor-pointer"
      : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
  }`}
>
  {isCorrect === null ? "Шалгах" : isCorrect ? "Дараах" : "Дахин эхлэх"}
</button>

{/* Animated Pop-up */}
{showPopup && (
  <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
    <div
      className={`
        bg-white dark:bg-gray-800 px-6 py-4 rounded-2xl shadow-2xl text-xl font-bold text-center
        transform transition-all duration-500 ease-out
        ${isCorrect ? "bg-green-100 text-green-700 scale-110 -translate-y-4 opacity-100" : "bg-red-100 text-red-700 scale-110 -translate-y-4 opacity-100"}
        animate-fadeInOut
      `}
    >
      {showPopup}
    </div>
  </div>
)}

{/* Tailwind custom animation (add in globals.css or tailwind.config) */}
<style jsx global>{`
  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(-20px) scale(0.95); }
    10% { opacity: 1; transform: translateY(0) scale(1.1); }
    90% { opacity: 1; transform: translateY(0) scale(1.1); }
    100% { opacity: 0; transform: translateY(-20px) scale(0.95); }
  }
  .animate-fadeInOut {
    animation: fadeInOut 2s ease forwards;
  }
`}</style>

    </div>
  );
};
