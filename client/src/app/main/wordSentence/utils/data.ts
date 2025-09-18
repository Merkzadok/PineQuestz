export interface WordData {
  id: string;
  word: string; // Монгол үг
  image: string; // Cloudinary Image URL
  letters: string[];
  completed?: boolean;
}
// туслах function
const shuffleArray = (array: string[]) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export const words: {
  id: string;
  word: string;
  letters: string[];
  image: string;
}[] = [
  { id: "1", word: "сүх", letters: shuffleArray(["с", "ү", "х"]), image: "/images/axe.avif" },
  { id: "2", word: "ном", letters: shuffleArray(["н", "о", "м"]), image: "/images/book.jpeg" },
  { id: "3", word: "морь", letters: shuffleArray(["м", "о", "р", "ь"]), image: "/images/horse.jpg" },
  { id: "4", word: "сар", letters: shuffleArray(["с", "а", "р"]), image: "/images/moon.jpg" },
  { id: "5", word: "шоо", letters: shuffleArray(["ш", "о", "о"]), image: "/images/cube.jpeg" },
  { id: "6", word: "хавар", letters: shuffleArray(["х", "а", "в", "а", "р"]), image: "/images/spring.webp" },
  { id: "7", word: "хүүхэд", letters: shuffleArray(["х", "ү", "ү", "х", "э", "д"]), image: "/images/child.webp" },
  { id: "8", word: "хөлөг", letters: shuffleArray(["х", "ө", "л", "ө", "г"]), image: "/images/ship.jpeg" },
  { id: "9", word: "үхэр", letters: shuffleArray(["ү", "х", "э", "р"]), image: "/images/cow.webp" },
  { id: "10", word: "цэцэг", letters: shuffleArray(["ц", "э", "ц", "э", "г"]), image: "/images/flower.jpg" },
  { id: "11", word: "цоож", letters: shuffleArray(["ц", "о", "о", "ж"]), image: "/images/lock.png" },
  { id: "12", word: "загас", letters: shuffleArray(["з", "а", "г", "а", "с"]), image: "/images/fish.png" },
  { id: "13", word: "үзэг", letters: shuffleArray(["ү", "з", "э", "г"]), image: "/images/pen.jpg" },
  { id: "14", word: "зоос", letters: shuffleArray(["з", "о", "о", "с"]), image: "/images/coin.jpg" },
  { id: "15", word: "дээл", letters: shuffleArray(["д", "э", "э", "л"]), image: "/images/deel.webp" },
  { id: "16", word: "зүү", letters: shuffleArray(["з", "ү", "ү"]), image: "/images/needle.png" },
  { id: "17", word: "жудо", letters: shuffleArray(["ж", "у", "д", "о"]), image: "/images/judo.avif" },
  { id: "18", word: "төгрөг", letters: shuffleArray(["т", "ө", "г", "р", "ө", "г"]), image: "/images/tugrug.png" },
];
