"use client";

import React, { useEffect, useState } from "react";
import { Users, ArrowRight } from "lucide-react";
import Link from "next/link";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div
        className={`max-w-3xl w-full text-center transition-all duration-1200 ease-out ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Logo */}
        <div
          className={`mb-12 transition-all duration-800 delay-300 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 hover:shadow-lg transition-shadow duration-300">
            <Users className="w-8 h-8 text-gray-700" />
          </div>
        </div>

        {/* Title */}
        <div
          className={`mb-8 transition-all duration-1000 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">
            LittleReaders
          </h1>
          <div className="w-12 h-0.5 bg-gray-300 mx-auto"></div>
        </div>

        {/* Subtitle */}
        <p
          className={`text-lg md:text-xl text-gray-600 mb-16 max-w-2xl mx-auto font-light leading-relaxed transition-all duration-1000 delay-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {"Where learning to read becomes the best part of your child's day."}
        </p>

        {/* Action Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Kids Button */}
          <Link href="/kid">
            <button className="group relative px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 min-w-[160px] overflow-hidden">
              <div className="flex items-center justify-center gap-2 relative z-10">
                <span>For Kids</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
            </button>
          </Link>
          <Link href="/parent">
            {/* Parents Button */}
            <button className="group relative px-8 py-4 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 min-w-[160px] bg-white hover:bg-gray-50">
              <div className="flex items-center justify-center gap-2">
                <span>For Parents</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </button>
          </Link>
        </div>

        {/* Minimal decorative elements */}
        <div className="absolute top-1/4 left-8 w-1 h-16 bg-gradient-to-b from-transparent via-gray-200 to-transparent opacity-40"></div>
        <div className="absolute bottom-1/4 right-8 w-1 h-12 bg-gradient-to-b from-gray-200 via-transparent to-gray-200 opacity-30"></div>

        {/* Floating accent */}
        <div
          className={`absolute top-16 right-1/4 w-2 h-2 bg-gray-300 rounded-full transition-all duration-2000 ${
            isLoaded ? "opacity-60 animate-pulse" : "opacity-0"
          }`}
          style={{ animationDuration: "4s" }}
        ></div>
      </div>
    </div>
  );
}

export default App;
