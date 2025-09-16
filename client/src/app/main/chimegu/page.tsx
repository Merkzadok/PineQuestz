"use client";
import React from "react";

export default function TextSpeaker() {
  const handleSpeak = async (text: string) => {
    try {
      const res = await fetch("http://localhost:4001/audio/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const audio = new Audio(url); // <audio> tag-ыг DOM-д нэмэхгүйгээр
      audio.play(); // шууд тоглуулах
    } catch (err) {
      console.error("Audio play failed:", err);
    }
  };

  return (
    <div>
      <button onClick={() => handleSpeak("Сайн байна уу?")}>🗣 Уншуулах</button>
    </div>
  );
}
