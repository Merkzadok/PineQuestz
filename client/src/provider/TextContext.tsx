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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/audio/tts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const audio = new Audio(url);
      audio.playbackRate = 0.7;
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

export const useTextSpeaker = () => {
  const context = useContext(TextSpeakerContext);
  if (!context) {
    throw new Error("useTextSpeaker must be used within a TextSpeakerProvider");
  }
  return context;
};
