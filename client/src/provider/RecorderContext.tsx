"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
type RecorderContextType = {
  audioUrls: string[];
  addAudio: (url: string) => void;
};
const RecorderContext = createContext<RecorderContextType | undefined>(
  undefined
);

export default function RecorderProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [audioUrls, setAudioUrls] = useState<string[]>([]);

  const addAudio = (url: string) => {
    setAudioUrls((prev) => [...prev, url]);
  };
  return (
    <RecorderContext.Provider value={{ audioUrls, addAudio }}>
      {children}
    </RecorderContext.Provider>
  );
}

export const useRecorder = () => useContext(RecorderContext);
