// src/app/utils/levels.ts

export interface Level {
  id: number;
  route: string;
  section: string;
  x: number; 
  y: number;
  gameType: 'wordcard' | 'crossword';
  wordsForLevel?: number[]; // ✅ optional
}

// Энэ бол таны RoadMap компонент дотор байсан levels массив юм
export const levels: Level[] = [
  { id: 1, route: "/main/wordcard/0", section: "WordCard", x: 10, y: 85, gameType: 'wordcard' },
    { id: 2, route: "/main/wordcard/1", section: "WordCard", x: 25, y: 75, gameType: 'wordcard' },
    { id: 3, route: "/main/wordcard/2", section: "WordCard", x: 40, y: 85, gameType: 'wordcard' },
    { id: 4, route: "/main/wordcard/3", section: "WordCard", x: 55, y: 75, gameType: 'wordcard' },
    { id: 5, route: "/main/crossword/0", section: "CrossWord", x: 70, y: 85, gameType: 'crossword' },
    { id: 6, route: "/main/wordcard/4", section: "WordCard", x: 85, y: 70, gameType: 'wordcard' },
    { id: 7, route: "/main/wordcard/5", section: "WordCard", x: 70, y: 55, gameType: 'wordcard' },
    { id: 8, route: "/main/wordcard/6", section: "WordCard", x: 55, y: 70, gameType: 'wordcard' },
    { id: 9, route: "/main/wordcard/7", section: "WordCard", x: 40, y: 55, gameType: 'wordcard' },
    { id: 10, route: "/main/crossword/1", section: "CrossWord", x: 25, y: 45, gameType: 'crossword' },
    { id: 11, route: "/main/wordcard/8", section: "WordCard", x: 40, y: 35, gameType: 'wordcard' },
    { id: 12, route: "/main/wordcard/9", section: "WordCard", x: 55, y: 25, gameType: 'wordcard' },
    { id: 13, route: "/main/wordcard/10", section: "WordCard", x: 70, y: 35, gameType: 'wordcard' },
    { id: 14, route: "/main/wordcard/11", section: "WordCard", x: 85, y: 25, gameType: 'wordcard' },
    { id: 15, route: "/main/crossword/2", section: "CrossWord", x: 75, y: 15, gameType: 'crossword' },
    { id: 16, route: "/main/wordcard/12", section: "WordCard", x: 60, y: 5, gameType: 'wordcard' },
    { id: 17, route: "/main/wordcard/13", section: "WordCard", x: 45, y: 15, gameType: 'wordcard' },
    { id: 18, route: "/main/wordcard/14", section: "WordCard", x: 30, y: 5, gameType: 'wordcard' },
    { id: 19, route: "/main/wordcard/15", section: "WordCard", x: 15, y: 15, gameType: 'wordcard' },
    { id: 20, route: "/main/crossword/3", section: "CrossWord", x: 10, y: 30, gameType: 'crossword' }
  ];