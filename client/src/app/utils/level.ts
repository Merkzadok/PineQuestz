// src/app/utils/levels.ts

export interface Level {
  id: number;
  route: string;
  section: string;
  x: number; 
  y: number;
  gameType: 'wordcard' | 'crossword';
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
    // ... бусад үеүүд ...
];