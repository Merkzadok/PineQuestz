"use client";
import { useParams } from "next/navigation";
import CrossWordLevel1 from "../components/CrossWordLevel1";
import CrossWordLevel2 from "../components/CrossWordLevel2";
import { JSX } from "react";
import CrossWordLevelA from "../components/CrossWordLevelA";

const CrossWordPage = () => {
  const params = useParams();
  const lessonId = Number(params.id);

  const lessonMap: Record<number, JSX.Element> = {
    1: <CrossWordLevel1 />,
    2: <CrossWordLevel2 />,
    3: <CrossWordLevelA />,

    // add more lessons here
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
        {lessonMap[lessonId] || <p>Lesson not found</p>}
      </div>
    </div>
  );
};

export default CrossWordPage;
