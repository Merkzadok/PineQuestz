export interface WordData {
  id: string;
  word: string;
  letters: string[];
  image: string;
  completed?: boolean | false;
  possibleWords : string[];
}

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


export const wordsThings: WordData[] = [
  { id: "1", word: "ном", letters: shuffleArray(["н", "о", "м"]), image: "/images/book.jpeg", possibleWords: generateAllWords(["н", "о", "м"]) },
//   { id: "2", word: "сар", letters: shuffleArray(["с", "а", "р"]), image: "/images/moon.jpg", possibleWords: generateAllWords(["с", "а", "р"]) },
//   { id: "3", word: "шоо", letters: shuffleArray(["ш", "о", "о"]), image: "/images/cube.jpeg", possibleWords: generateAllWords(["ш", "о", "о"]) },
//   { id: "4", word: "цэцэг", letters: shuffleArray(["ц", "э", "ц", "э", "г"]), image: "/images/flower.jpg", possibleWords: generateAllWords(["ц", "э", "ц", "э", "г"]) },
//   { id: "5", word: "цоож", letters: shuffleArray(["ц", "о", "о", "ж"]), image: "/images/lock.png", possibleWords: generateAllWords(["ц", "о", "о", "ж"]) },
];

export const wordsColors:WordData[] = [
  {id: "11", word: 'бор', letters: shuffleArray(['б', 'о', 'р']), image: '/images/brown.png', possibleWords: generateAllWords(['б', 'о', 'р'])},
//   {id: "12", word: 'улаан', letters: shuffleArray(['у', 'л', 'а', 'а', 'н']), image: '/images/red.png', possibleWords: generateAllWords(['у', 'л', 'а', 'а', 'н'])},
//   {id: "13", word: 'шар', letters: shuffleArray(['ш', 'а', 'р']), image: '/images/yellow.png', possibleWords: generateAllWords(['ш', 'а', 'р'])},
//   {id: "14", word: 'цэнхэр', letters: shuffleArray(['ц', 'э', 'н', 'х', 'э', 'р']), image: '/images/cyan.png', possibleWords: generateAllWords(['ц', 'э', 'н', 'х', 'э', 'р'])},
//   {id: "15", word: 'ногоон', letters: shuffleArray(['н', 'о', 'г', 'о', 'о', 'н']), image: '/images/green.png', possibleWords: generateAllWords(['н', 'о', 'г', 'о', 'о', 'н'])},
]

export const wordsAnimal:WordData[] = [
  { id: "21", word: 'хонь', letters: shuffleArray(['х', 'о', 'н', 'ь']), image: '/images/sheep.png', possibleWords: generateAllWords(['х', 'о', 'н', 'ь'])},
//   { id: "22", word: "үхэр", letters: shuffleArray(["ү", "х", "э", "р"]), image: "/images/cow.webp", possibleWords: generateAllWords(["ү", "х", "э", "р"]) },
//   { id: "23", word: 'нохой', letters: shuffleArray(['н', 'о', 'х', 'о', 'й']), image: '/images/dog.png', possibleWords: generateAllWords(['н', 'о', 'х', 'о', 'й'])},
//   { id: "24", word: 'муур', letters: shuffleArray(['м', 'у', 'у', 'р']), image: '/images/cat.png', possibleWords: generateAllWords(['м', 'у', 'у', 'р'])},
//   { id: "25", word: 'тахиа', letters: shuffleArray(['т', 'а', 'х', 'и', 'а']), image: '/images/chicken.png', possibleWords: generateAllWords(['т', 'а', 'х', 'и', 'а'])},
]

export const wordsFruits:WordData[] = [
  { id: "31", word: 'алим', letters: shuffleArray(['а', 'л', 'и', 'м']), image: '/images/apple.png', possibleWords: generateAllWords(['а', 'л', 'и', 'м'])},
//   { id: "32", word: 'тарвас', letters: shuffleArray(['т', 'а', 'р', 'в', 'а', 'с']), image: '/images/watermelon.png', possibleWords: generateAllWords(['т', 'а', 'р', 'в', 'а', 'с'])},
//   { id: "33", word: 'банана', letters: shuffleArray(['б', 'а', 'н', 'а', 'а','н']), image: '/images/banana.png', possibleWords: generateAllWords(['б', 'а', 'н', 'а','а', 'н'])},
//   { id: "34", word: 'лимон', letters: shuffleArray(['л', 'и', 'м', 'о', 'н']), image: '/images/lemon.png', possibleWords: generateAllWords(['л', 'и', 'м', 'о', 'н'])},
//   { id: "35", word: 'гүзээлзгэнэ', letters: shuffleArray(['г', 'ү', 'з', 'э', 'э', 'л', 'з', 'г', 'э', 'н', 'э']), image: '/images/strawberry.png', possibleWords: generateAllWords(['г', 'ү', 'з', 'э', 'э', 'л', 'з', 'г', 'э', 'н', 'э'])},
]

// WordCard level-д z word array
export const words: WordData[] = [];
for (let i = 0; i < 10; i++) { 
  if(wordsColors[i]) words.push(wordsColors[i]);
  if(wordsAnimal[i]) words.push(wordsAnimal[i]);
  if(wordsFruits[i]) words.push(wordsFruits[i]);
  if(wordsThings[i]) words.push(wordsThings[i]);
}

// Crossword level-д зориулсан word array
export const levels: WordData[][] = [
  [wordsThings[0], wordsColors[0], wordsAnimal[0], wordsFruits[0]], // Level 1
  [wordsThings[1], wordsColors[1], wordsAnimal[1], wordsFruits[1]], // Level 2
  [wordsThings[2], wordsColors[2], wordsAnimal[2], wordsFruits[2]], // Level 3
  [wordsThings[3], wordsColors[3], wordsAnimal[3], wordsFruits[3]], // Level 4
  [wordsThings[4], wordsColors[4], wordsAnimal[4], wordsFruits[4]], // Level 5
  [wordsThings[5], wordsColors[5], wordsAnimal[5], wordsFruits[5]], // Level 6
  [wordsThings[6], wordsColors[6], wordsAnimal[6], wordsFruits[6]], // Level 7
  [wordsThings[7], wordsColors[7], wordsAnimal[7], wordsFruits[7]], // Level 8
];
