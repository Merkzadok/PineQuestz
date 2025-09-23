"use client";

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { DndContext, useDraggable, useDroppable, DragEndEvent } from "@dnd-kit/core";
import { WordData } from "../../../utils/data";

interface Props {
  wordData: WordData;
  onNext: (correct: boolean) => void;
}

type PoolItem = { letter: string; id: string };

interface DragDropWordProps {
  word: string;
  letters: string[];
  onSlotsChange?: (slots: (string | null)[]) => void;
}

export const DraggableLetter: React.FC<PoolItem> = ({ id, letter }) => {
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
DraggableLetter.displayName = "DraggableLetter";

interface DroppableSlotProps {
  id: string;
  letter: string | null;
  onRemoveLetter: () => void;
}
export const DroppableSlot: React.FC<DroppableSlotProps> = ({ id, letter, onRemoveLetter }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  const bg = letter ? "bg-gray-200" : isOver ? "bg-yellow-200 border-yellow-500" : "bg-gray-100 border-gray-300";
  return (
    <div
      ref={setNodeRef}
      onClick={letter ? onRemoveLetter : undefined}
      className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 font-bold text-xl cursor-pointer ${bg}`}
    >
      {letter}
    </div>
  );
};
DroppableSlot.displayName = "DroppableSlot";

export const DragDropWord = forwardRef<{
  resetSlots: () => void;
}, DragDropWordProps>(({ word, letters, onSlotsChange }, ref) => {
  const [slots, setSlots] = useState<(string | null)[]>([]);
  const [pool, setPool] = useState<PoolItem[]>([]);

  const initPool = () => letters.map((l, idx) => ({ letter: l, id: `${l}-${idx}-${Date.now()}` }));

  const resetSlots = () => {
    setSlots(Array(word.length).fill(null));
    setPool(initPool());
  };

  useImperativeHandle(ref, () => ({
    resetSlots,
  }));

  useEffect(() => resetSlots(), [word, letters]);
  useEffect(() => onSlotsChange?.(slots), [slots]);

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
          if (newSlots[slotIdx]) {
            setPool((prev) => [...prev, { letter: newSlots[slotIdx]!, id: `${newSlots[slotIdx]}-${Date.now()}` }]);
          }
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

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* Slots */}
      <div className="flex gap-2 mb-6">
        {slots.map((letter, idx) => (
          <DroppableSlot
            key={idx}
            id={`slot-${idx}`}
            letter={letter}
            onRemoveLetter={() => {
              if (!letter) return;
              const newSlots = [...slots];
              newSlots[idx] = null;
              setSlots(newSlots);
              setPool((prev) => [...prev, { letter, id: `${letter}-${Date.now()}` }]);
            }}
          />
        ))}
      </div>
      {/* Pool */}
      <div id="pool" className="flex flex-wrap gap-2 mb-6 justify-center">
        {pool.map((item) => (
          <DraggableLetter key={item.id} {...item} />
        ))}
      </div>
    </DndContext>
  );
});
DragDropWord.displayName = "DragDropWord";