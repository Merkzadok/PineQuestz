"use client";

import { useState } from "react";
import { WordData } from "../utils/data";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
} from "@dnd-kit/core";

interface WordCardProps {
  wordData: WordData;
  onNext: (correct: boolean) => void;
}

// Draggable letter
const DraggableLetter = ({ id, letter }: { id: string; letter: string }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`w-12 h-12 flex items-center justify-center rounded-lg border font-bold text-lg cursor-grab transition ${
        isDragging
          ? "bg-yellow-300 scale-110 shadow-lg"
          : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      {letter}
    </div>
  );
};

// Droppable slot
const DroppableSlot = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 font-bold text-xl transition ${
        isOver ? "bg-green-200 border-green-500" : "bg-gray-100 border-gray-300"
      }`}
    >
      {children}
    </div>
  );
};

const WordCard: React.FC<WordCardProps> = ({ wordData, onNext }) => {
  const [slots, setSlots] = useState<(string | null)[]>(
    Array(wordData.word.length).fill(null)
  );
  const [pool, setPool] = useState(wordData.letters);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

const handleDragEnd = (event: DragEndEvent) => {
  const { over, active } = event;
  if (over) {
    const letterId = active.id as string; // жишээ: "A-0"
    const letter = letterId.split("-")[0]; // зөвхөн "A" гэх мэт

    if (typeof over.id === "string" && over.id.startsWith("slot-")) {
      const slotIdx = parseInt(over.id.replace("slot-", ""), 10);

      if (!isNaN(slotIdx)) {
        const newSlots = [...slots];

        // өмнө нь энэ slot-д байсан үсгийг pool руу буцаана
        if (newSlots[slotIdx]) {
          setPool((prev) => [...prev, newSlots[slotIdx]!]);
        }

        // slot-д шинэ үсэг байрлуулна
        newSlots[slotIdx] = letter;
        setSlots(newSlots);

        // pool-с тухайн unique ID-г арилгана
        setPool((prev) => prev.filter((l, idx) => `${l}-${idx}` !== letterId));
      }
    }
  }
};

  const checkAnswer = () => {
    const answer = slots.join("");
    setIsCorrect(answer === wordData.word);
  };

  const handleNext = () => {
    onNext(isCorrect === true);
    setSlots(Array(wordData.word.length).fill(null));
    setPool(wordData.letters);
    setIsCorrect(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center">
      {/* Image */}
      {wordData.image && (
        <img
          src={wordData.image}
          alt={wordData.word}
          className="w-64 h-64 object-contain rounded-lg mb-6 shadow"
        />
      )}

      <DndContext onDragEnd={handleDragEnd}>
        {/* Slots */}
        <div className="flex gap-2 mb-6">
          {slots.map((letter, idx) => (
            <DroppableSlot key={idx} id={`slot-${idx}`}>
              {letter}
            </DroppableSlot>
          ))}
        </div>

        {/* Pool Letters */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {pool.map((letter, idx) => (
            <DraggableLetter
              key={`${letter}-${idx}`}
              id={letter + "-" + idx}
              letter={letter}
            />
          ))}
        </div>
      </DndContext>

      {/* Buttons */}
      <div className="flex gap-4">
        {isCorrect === null && (
          <button
            onClick={checkAnswer}
            className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition shadow-md text-lg"
          >
            Шалгах
          </button>
        )}
        {isCorrect !== null && (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition shadow-lg text-xl font-bold"
          >
            Дараах
          </button>
        )}
      </div>

      {/* Result */}
      {isCorrect !== null && (
        <p
          className={`mt-4 text-xl font-bold ${
            isCorrect ? "text-green-600" : "text-red-600"
          }`}
        >
          {isCorrect ? "Зөв байна! 🎉" : "Буруу байна 😅"}
        </p>
      )}
    </div>
  );
};

export default WordCard;
