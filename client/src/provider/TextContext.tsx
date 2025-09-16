"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
type TextSpeakerContextType = {
  speakText: (text: string) => void;
};

const TextSpeakerContext = createContext<TextSpeakerContextType | undefined>(
  undefined
);

export const TextSpeakerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const speakText = async (text: string) => {
    try {
      const res = await fetch("http://localhost:4001/audio/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const audio = new Audio(url);
      audio.play();
    } catch (err) {
      console.error("Audio play failed:", err);
    }
  };

  return (
    <TextSpeakerContext.Provider value={{ speakText }}>
      {children}
    </TextSpeakerContext.Provider>
  );
};

export const useTextSpeaker = () => useContext(TextSpeakerContext);
