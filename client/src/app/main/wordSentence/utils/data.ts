export interface WordData {
  id: string;
  word: string;
  letters: string[];
  image: string;
  completed?: boolean | false;
  possibleWords : string[];
}

//* Shuffle function
export const shuffleArray = <T>(array: T[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

//* Generate all possible words from letters 
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


// export const words: WordData[] = [
//   { id: "1", word: "сүх", letters: shuffleArray(["с", "ү", "х"]), image: "/images/axe.avif", possibleWords: generateAllWords(["с", "ү", "х"]) },
//   { id: "2", word: "ном", letters: shuffleArray(["н", "о", "м"]), image: "/images/book.jpeg", possibleWords: generateAllWords(["н", "о", "м"]) },
//   { id: "3", word: "сар", letters: shuffleArray(["с", "а", "р"]), image: "/images/moon.jpg", possibleWords: generateAllWords(["с", "а", "р"]) },
//   { id: "4", word: "шоо", letters: shuffleArray(["ш", "о", "о"]), image: "/images/cube.jpeg", possibleWords: generateAllWords(["ш", "о", "о"]) },
//   { id: "5", word: "хавар", letters: shuffleArray(["х", "а", "в", "а", "р"]), image: "/images/spring.webp", possibleWords: generateAllWords(["х", "а", "в", "а", "р"]) },
//   { id: "6", word: "хүүхэд", letters: shuffleArray(["х", "ү", "ү", "х", "э", "д"]), image: "/images/child.webp", possibleWords: generateAllWords(["х", "ү", "ү", "х", "э", "д"]) },
//   { id: "7", word: "хөлөг", letters: shuffleArray(["х", "ө", "л", "ө", "г"]), image: "/images/ship.jpeg", possibleWords: generateAllWords(["х", "ө", "л", "ө", "г"]) },
//   { id: "8", word: "цэцэг", letters: shuffleArray(["ц", "э", "ц", "э", "г"]), image: "/images/flower.jpg", possibleWords: generateAllWords(["ц", "э", "ц", "э", "г"]) },
//   { id: "9", word: "цоож", letters: shuffleArray(["ц", "о", "о", "ж"]), image: "/images/lock.png", possibleWords: generateAllWords(["ц", "о", "о", "ж"]) },
//   { id: "10", word: "үзэг", letters: shuffleArray(["ү", "з", "э", "г"]), image: "/images/pen.jpg", possibleWords: generateAllWords(["ү", "з", "э", "г"]) },
//   { id: "11", word: "зоос", letters: shuffleArray(["з", "о", "о", "с"]), image: "/images/coin.jpg", possibleWords: generateAllWords(["з", "о", "о", "с"]) },
//   { id: "12", word: "дээл", letters: shuffleArray(["д", "э", "э", "л"]), image: "/images/deel.webp", possibleWords: generateAllWords(["д", "э", "э", "л"]) },
//   { id: "13", word: "зүү", letters: shuffleArray(["з", "ү", "ү"]), image: "/images/needle.png", possibleWords: generateAllWords(["з", "ү", "ү"]) },
//   { id: "14", word: "жудо", letters: shuffleArray(["ж", "у", "д", "о"]), image: "/images/judo.avif", possibleWords: generateAllWords(["ж", "у", "д", "о"]) },
//   { id: "15", word: "төгрөг", letters: shuffleArray(["т", "ө", "г", "р", "ө", "г"]), image: "/images/tugrug.png", possibleWords: generateAllWords(["т", "ө", "г", "р", "ө", "г"]) },
// ];

// export const wordsColor:WordData[] = [
//   {id: "1", word: 'хөх', letters: shuffleArray(['х', 'ө', 'х']), image: '/images/blue.png', possibleWords: generateAllWords(['х', 'ө', 'х'])},
//   {id: "2", word: 'улаан', letters: shuffleArray(['у', 'л', 'а', 'а', 'н']), image: '/images/red.png', possibleWords: generateAllWords(['у', 'л', 'а', 'а', 'н'])},
//   {id: "3", word: 'ногоон', letters: shuffleArray(['н', 'о', 'г', 'о', 'о', 'н']), image: '/images/green.png', possibleWords: generateAllWords(['н', 'о', 'г', 'о', 'о', 'н'])},
//   {id: "4", word: 'шар', letters: shuffleArray(['ш', 'а', 'р']), image: '/images/yellow.png', possibleWords: generateAllWords(['ш', 'а', 'р'])},
//   {id: "5", word: 'хар', letters: shuffleArray(['х', 'а', 'р']), image: '/images/black.png', possibleWords: generateAllWords(['х', 'а', 'р'])},
//   {id: "6", word: 'цагаан', letters: shuffleArray(['ц', 'а', 'г', 'а', 'а', 'н']), image: '/images/white.png', possibleWords: generateAllWords(['ц', 'а', 'а', 'г', 'а', 'н'])},
//   {id: "7", word: 'ягаан', letters: shuffleArray(['я', 'г', 'а', 'а', 'н']), image: '/images/pink.png', possibleWords: generateAllWords(['я', 'г', 'а', 'а', 'н'])},
//   {id: "8", word: 'бор', letters: shuffleArray(['б', 'о', 'р']), image: '/images/brown.png', possibleWords: generateAllWords(['б', 'о', 'р'])},
//   {id: "9", word: 'улбар шар', letters: shuffleArray(['у', 'л', 'б', 'а', 'р', ' ', 'ш', 'а', 'р']), image: '/images/orange.png', possibleWords: generateAllWords(['у', 'л', 'б', 'а', 'р', ' ', 'ш', 'а', 'р'])},
//   {id: "10", word: 'цэнхэр', letters: shuffleArray(['ц', 'э', 'н', 'х', 'э', 'р']), image: '/images/cyan.png', possibleWords: generateAllWords(['ц', 'э', 'н', 'х', 'э', 'р'])}
// ]


export const words:WordData[] = [
  { id: "1", word: 'нохой', letters: shuffleArray(['н', 'о', 'х', 'о', 'й']), image: '/images/dog.png', possibleWords: generateAllWords(['н', 'о', 'х', 'о', 'й'])},
  { id: "2", word: 'муур', letters: shuffleArray(['м', 'у', 'у', 'р']), image: '/images/cat.png', possibleWords: generateAllWords(['м', 'у', 'у', 'р'])},
  { id: "3", word: 'тахиа', letters: shuffleArray(['т', 'а', 'х', 'и', 'а']), image: '/images/chicken.png', possibleWords: generateAllWords(['т', 'а', 'х', 'и', 'а'])},
  { id: "4", word: "морь", letters: shuffleArray(["м", "о", "р", "ь"]), image: "/images/horse.png", possibleWords: generateAllWords(["м", "о", "р", "ь"]) },
  { id: "5", word: "үхэр", letters: shuffleArray(["ү", "х", "э", "р"]), image: "/images/cow.png", possibleWords: generateAllWords(["ү", "х", "э", "р"]) },
  { id: "6", word: "загас", letters: shuffleArray(["з", "а", "г", "а", "с"]), image: "/images/fish.png", possibleWords: generateAllWords(["з", "а", "г", "а", "с"]) },
  { id: "7", word: 'хонь', letters: shuffleArray(['х', 'о', 'н', 'ь']), image: '/images/sheep.png', possibleWords: generateAllWords(['х', 'о', 'н', 'ь'])},
  { id: "8", word: 'тэмээ', letters: shuffleArray(['т', 'э', 'м', 'э', 'э']), image: '/images/camel.png', possibleWords: generateAllWords(['т', 'э', 'м', 'э', 'э'])},
  { id: "9", word: 'баавгай', letters: shuffleArray(['б', 'а', 'а', 'в', 'г', 'а', 'й']), image: '/images/bear.png', possibleWords: generateAllWords(['б', 'а', 'а', 'в', 'г', 'а', 'й'])},
  { id: "10", word: 'чоно', letters: shuffleArray(['ч', 'о', 'н', 'о']), image: '/images/wolf.png', possibleWords: generateAllWords(['ч', 'о', 'н', 'о'])}
]

// export const wordsFruits:WordData[] = [
//   { id: "1", word: 'алим', letters: shuffleArray(['а', 'л', 'и', 'м']), image: '/images/apple.png', possibleWords: generateAllWords(['а', 'л', 'и', 'м'])},
//   { id: "2", word: 'банана', letters: shuffleArray(['б', 'а', 'н', 'а', 'а','н']), image: '/images/banana.png', possibleWords: generateAllWords(['б', 'а', 'н', 'а','а', 'н'])},
//   { id: "3", word: 'гүзээлзгэнэ', letters: shuffleArray(['г', 'ү', 'з', 'э', 'э', 'л', 'з', 'г', 'э', 'н', 'э']), image: '/images/strawberry.png', possibleWords: generateAllWords(['г', 'ү', 'з', 'э', 'э', 'л', 'з', 'г', 'э', 'н', 'э'])},
//   { id: "4", word: 'лимон', letters: shuffleArray(['л', 'и', 'м', 'о', 'н']), image: '/images/lemon.png', possibleWords: generateAllWords(['л', 'и', 'м', 'о', 'н'])},
//   { id: "5", word: 'тарвас', letters: shuffleArray(['т', 'а', 'р', 'в', 'а', 'с']), image: '/images/watermelon.png', possibleWords: generateAllWords(['т', 'а', 'р', 'в', 'а', 'с'])},
//   { id: "6", word: 'лууван', letters: shuffleArray(['л', 'у', 'у', 'в', 'а', 'н']), image: '/images/carrot.png', possibleWords: generateAllWords(['л', 'у', 'у', 'в', 'а', 'н'])},
//   { id: "7", word: 'сармис', letters: shuffleArray(['с', 'а', 'р', 'м', 'и', 'с']), image: '/images/garlic.png', possibleWords: generateAllWords(['с', 'а', 'р', 'м', 'и', 'с'])},
//   { id: "8", word: 'төмс', letters: shuffleArray(['т', 'ө', 'м', 'с']), image: '/images/potato.png', possibleWords: generateAllWords(['т', 'ө', 'м', 'с'])},
//   { id: "9", word: 'байцаа', letters: shuffleArray(['б', 'а', 'й', 'ц', 'а', 'а']), image: '/images/cabbage.png', possibleWords: generateAllWords(['б', 'а', 'й', 'ц', 'а', 'а'])},
//   { id: "10", word: 'сонгино', letters: shuffleArray(['с', 'о', 'н', 'г', 'и', 'н', 'о']), image: '/images/onion.png', possibleWords: generateAllWords(['с', 'о', 'н', 'г', 'и', 'н', 'о'])}
// ]