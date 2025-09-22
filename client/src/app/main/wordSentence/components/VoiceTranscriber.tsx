"use client";

import React, { useState, useEffect, useRef } from "react";

type Props = {
  targetWord: string;        
  onCorrect?: () => void;    
};

const VoiceTranscriber: React.FC<Props> = ({ targetWord, onCorrect }) => {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition ||
        (window as any).SpeechRecognition;

      const recognition = new SpeechRecognition();
      recognition.lang = "mn-MN"; 
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          finalTranscript += event.results[i][0].transcript;
        }
        const spoken = finalTranscript.trim();
        setTranscript(spoken);

        if (spoken.toLowerCase() === targetWord.toLowerCase()) {
          stopListening();
          onCorrect?.();
        }
      };

      recognition.onerror = (event: any) => {
        console.error("🎙️ Speech recognition error:", event.error);
      };

      recognition.onend = () => setListening(false);

      recognitionRef.current = recognition;
    }
  }, [targetWord]);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setTranscript("");
      setListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
    
      <div className="p-3 w-64 rounded-lg bg-gray-100 text-center">
        {transcript ? (
          <span className="font-medium text-lg">{transcript}</span>
        ) : (
          <span className="text-gray-400 text-sm"> Доор ярих дарж яриарай</span>
        )}
      </div> 

        <button
        onClick={listening ? stopListening : startListening}
        className={`px-5 py-2 rounded-full text-white font-semibold ${
          listening ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {listening ? "⏹ Зогсоох" : "🎤 Ярих"}
      </button>

    </div>
  );
};

export default VoiceTranscriber;
