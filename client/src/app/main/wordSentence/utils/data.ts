export interface WordData {
  id: string;
  word: string;      // Монгол үг
  image: string;     // Cloudinary Image URL
  audio: string;     // Audio URL (local)
  letters: string[];
  completed?: boolean ;
}

// shuffle туслах функц
function shuffleArray(arr: string[]): string[] {
  return arr
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export const words: WordData[] = [
  {
    id: "1",
    word: "алим",
    image: "https://res.cloudinary.com/demo/image/upload/v1694921234/alim.jpg",
    audio: "/audio/alim.mp3",
    letters: shuffleArray(["а","л","и","м"])
  },
  {
    id: "2",
    word: "банана",
    image: "https://res.cloudinary.com/demo/image/upload/v1694921234/banana.jpg",
    audio: "/audio/banan.mp3",
    letters: shuffleArray(["б","а","н","а","н"])
  },
  {
    id: "3",
    word: "нохой",
    image: "https://res.cloudinary.com/demo/image/upload/v1694921234/nohoi.jpg",
    audio: "/audio/nohoi.mp3",
    letters: shuffleArray(["н","о","х","о","й"])
  },
  {
    id: "4",
    word: "муур",
    image: "https://res.cloudinary.com/demo/image/upload/v1694921234/muur.jpg",
    audio: "/audio/muur.mp3",
    letters: shuffleArray(["м","у","у","р"])
  },
  {
    id: "5",
    word: "сүү",
    image: "https://res.cloudinary.com/demo/image/upload/v1694921234/suu.jpg",
    audio: "/audio/suu.mp3",
    letters: shuffleArray(["с","ү","ү"])
  },
  {
    id: "6",
    word: "талх",
    image: "https://res.cloudinary.com/demo/image/upload/v1694921234/talh.jpg",
    audio: "/audio/talh.mp3",
    letters: shuffleArray(["т","а","л","х"])
  },
  {
    id: "7",
    word: "цэцэг",
    image: "https://res.cloudinary.com/demo/image/upload/v1694921234/tsetseg.jpg",
    audio: "/audio/tsetseg.mp3",
    letters: shuffleArray(["ц","э","ц","э","г"])
  },
  {
    id: "8",
    word: "нар",
    image: "https://res.cloudinary.com/demo/image/upload/v1694921234/nar.jpg",
    audio: "/audio/nar.mp3",
    letters: shuffleArray(["н","а","р"])
  },
  {
    id: "9",
    word: "сав",
    image: "https://res.cloudinary.com/demo/image/upload/v1694921234/sav.jpg",
    audio: "/audio/sav.mp3",
    letters: shuffleArray(["с","а","в"])
  },
  {
    id: "10",
    word: "ус",
    image: "https://res.cloudinary.com/demo/image/upload/v1694921234/us.jpg",
    audio: "/audio/us.mp3",
    letters: shuffleArray(["у","с"])
  },
  {
    id: "11",
    word: "автобус",
    image: "https://res.cloudinary.com/demo/image/upload/v1694921234/avtobus.jpg",
    audio: "/audio/avtobus.mp3",
    letters: shuffleArray(["а","в","т","о","б","у","с"])
  },
  {
    id: "12",
    word: "машин",
    image: "https://res.cloudinary.com/demo/image/upload/v1694921234/mashin.jpg",
    audio: "/audio/mashin.mp3",
    letters: shuffleArray(["м","а","ш","и","н"])
  },
  {
    id: "13",
    word: "тэмээ",
    image: "https://res.cloudinary.com/demo/image/upload/v1694921234/temee.jpg",
    audio: "/audio/temee.mp3",
    letters: shuffleArray(["т","э","м","э","э"])
  },
  {
    id: "14",
    word: "үхэр",
    image: "https://res.cloudinary.com/demo/image/upload/v1694921234/ukher.jpg",
    audio: "/audio/ukher.mp3",
    letters: shuffleArray(["ү","х","э","р"])
  },
  {
    id: "15",
    word: "морь",
    image: "https://res.cloudinary.com/demo/image/upload/v1694921234/mori.jpg",
    audio: "/audio/mori.mp3",
    letters: shuffleArray(["м","о","р","ь"])
  },
  {
    id: "16",
    word: "талбай",
    image: "https://res.cloudinary.com/demo/image/upload/v1694921234/talbai.jpg",
    audio: "/audio/talbai.mp3",
    letters: shuffleArray(["т","а","л","б","а","й"])
  },
  {
    id: "17",
    word: "ном",
    image: "https://res.cloudinary.com/demo/image/upload/v1694921234/nom.jpg",
    audio: "/audio/nom.mp3",
    letters: shuffleArray(["н","о","м"])
  },
  {
    id: "18",
    word: "цонх",
    image: "https://res.cloudinary.com/demo/image/upload/v1694921234/tsongkh.jpg",
    audio: "/audio/tsongkh.mp3",
    letters: shuffleArray(["ц","о","н","х"])
  },
  {
    id: "19",
    word: "гэр",
    image: "https://res.cloudinary.com/demo/image/upload/v1694921234/ger.jpg",
    audio: "/audio/ger.mp3",
    letters: shuffleArray(["г","э","р"])
  },
  {
    id: "20",
    word: "ширээ",
    image: "https://res.cloudinary.com/demo/image/upload/v1694921234/shiree.jpg",
    audio: "/audio/shiree.mp3",
    letters: shuffleArray(["ш","и","р","э","э"])
  }
];

