export interface WordData {
  id: string;
  word: string;
  letters: string[];
  image: string;
  completed?: boolean | false;
  possibleWords : string[];
}

// Shuffle function
export const shuffleArray = <T>(array: T[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

function generateAllWords(letters: string[]): string[] {
  const results: Set<string> = new Set();

  function permute(path: string[], remaining: string[]) {
    if (path.length > 0) {
      results.add(path.join(""));
    }
    for (let i = 0; i < remaining.length; i++) {
      const newPath = [...path, remaining[i]];
      const newRemaining = remaining.filter((_, idx) => idx !== i);
      permute(newPath, newRemaining);
    }
  }

  permute([], letters);

  return Array.from(results);
}


export const words: WordData[] = [
  { id: "1", word: "сүх", letters: ["с", "ү", "х"], image: "/images/axe.avif", possibleWords: generateAllWords(["с", "ү", "х"]) },
  { id: "2", word: "ном", letters: ["н", "о", "м"], image: "/images/book.jpeg", possibleWords: generateAllWords(["н", "о", "м"]) },
  { id: "3", word: "морь", letters: ["м", "о", "р", "ь"], image: "/images/horse.jpg", possibleWords: generateAllWords(["м", "о", "р", "ь"]) },
  { id: "4", word: "сар", letters: ["с", "а", "р"], image: "/images/moon.jpg", possibleWords: generateAllWords(["с", "а", "р"]) },
  { id: "5", word: "шоо", letters: ["ш", "о", "о"], image: "/images/cube.jpeg", possibleWords: generateAllWords(["ш", "о", "о"]) },
  { id: "6", word: "хавар", letters: ["х", "а", "в", "а", "р"], image: "/images/spring.webp", possibleWords: generateAllWords(["х", "а", "в", "а", "р"]) },
  { id: "7", word: "хүүхэд", letters: ["х", "ү", "ү", "х", "э", "д"], image: "/images/child.webp", possibleWords: generateAllWords(["х", "ү", "ү", "х", "э", "д"]) },
  { id: "8", word: "хөлөг", letters: ["х", "ө", "л", "ө", "г"], image: "/images/ship.jpeg", possibleWords: generateAllWords(["х", "ө", "л", "ө", "г"]) },
  { id: "9", word: "үхэр", letters: ["ү", "х", "э", "р"], image: "/images/cow.webp", possibleWords: generateAllWords(["ү", "х", "э", "р"]) },
  { id: "10", word: "цэцэг", letters: ["ц", "э", "ц", "э", "г"], image: "/images/flower.jpg", possibleWords: generateAllWords(["ц", "э", "ц", "э", "г"]) },
  { id: "11", word: "цоож", letters: ["ц", "о", "о", "ж"], image: "/images/lock.png", possibleWords: generateAllWords(["ц", "о", "о", "ж"]) },
  { id: "12", word: "загас", letters: ["з", "а", "г", "а", "с"], image: "/images/fish.png", possibleWords: generateAllWords(["з", "а", "г", "а", "с"]) },
  { id: "13", word: "үзэг", letters: ["ү", "з", "э", "г"], image: "/images/pen.jpg", possibleWords: generateAllWords(["ү", "з", "э", "г"]) },
  { id: "14", word: "зоос", letters: ["з", "о", "о", "с"], image: "/images/coin.jpg", possibleWords: generateAllWords(["з", "о", "о", "с"]) },
  { id: "15", word: "дээл", letters: ["д", "э", "э", "л"], image: "/images/deel.webp", possibleWords: generateAllWords(["д", "э", "э", "л"]) },
  { id: "16", word: "зүү", letters: ["з", "ү", "ү"], image: "/images/needle.png", possibleWords: generateAllWords(["з", "ү", "ү"]) },
  { id: "17", word: "жудо", letters: ["ж", "у", "д", "о"], image: "/images/judo.avif", possibleWords: generateAllWords(["ж", "у", "д", "о"]) },
  { id: "18", word: "төгрөг", letters: ["т", "ө", "г", "р", "ө", "г"], image: "/images/tugrug.png", possibleWords: generateAllWords(["т", "ө", "г", "р", "ө", "г"]) },
];

