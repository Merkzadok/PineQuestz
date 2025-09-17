export interface WordData {
  id: string;
  word: string; // Монгол үг
  image: string; // Cloudinary Image URL
  audio: string; // Audio URL (local)
  letters: string[];
  completed?: boolean;
}

// shuffle туслах функц
function shuffleArray(arr: string[]): string[] {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export const words: WordData[] = [
  {
    id: "1",
    word: "алим",
    image:
      "https://res.cloudinary.com/dpdzneqo6/image/upload/v1758032829/apple_jvmcfq.jpg",
    audio: "/audio/alim.mp3",
    letters: shuffleArray(["а", "л", "и", "м"]),
  },
  {
    id: "2",
    word: "банана",
    image:
      "https://res.cloudinary.com/dpdzneqo6/image/upload/v1758032832/fun-banana-cartoon-mascot-character-design-vector-illustration-drawing-374266612_u4omeb.webp",
    audio: "/audio/banana.mp3",
    letters: shuffleArray(["б", "а", "н", "а", "н", "а"]),
  },
  {
    id: "3",
    word: "муур",
    image:
      "https://res.cloudinary.com/dpdzneqo6/image/upload/v1758032827/istockphoto-1097490360-612x612_wg1a2d.jpg",
    audio: "/audio/muur.mp3",
    letters: shuffleArray(["м", "у", "у", "р"]),
  },
  {
    id: "4",
    word: "нохой",
    image:
      "https://res.cloudinary.com/dpdzneqo6/image/upload/v1758032828/download_wame7g.jpg",
    audio: "/audio/nohoi.mp3",
    letters: shuffleArray(["н", "о", "х", "о", "й"]),
  },
  {
    id: "5",
    word: "нар",
    image:
      "https://res.cloudinary.com/dpdzneqo6/image/upload/v1758032824/funny-sun-icon-in-flat-style-isolated-on-white-background-smiling-cartoon-sun-illustration-vector_tlpubk.jpg",
    audio: "/audio/nar.mp3",
    letters: shuffleArray(["н", "а", "р"]),
  },
  {
    id: "6",
    word: "сүү",
    image:
      "https://res.cloudinary.com/dpdzneqo6/image/upload/v1758032825/d28af8154fa92e4972c428cf5dea0816_q3u6hu.jpg",
    audio: "/audio/suu.mp3",
    letters: shuffleArray(["с", "ү", "ү"]),
  },
  {
    id: "7",
    word: "гэр",
    image:
      "https://res.cloudinary.com/dpdzneqo6/image/upload/v1758032826/depositphotos_62527353-stock-illustration-yurt_lzaltt.webp",
    audio: "/audio/ger.mp3",
    letters: shuffleArray(["г", "э", "р"]),
  },
  {
    id: "8",
    word: "бөмбөг",
    image:
      "https://res.cloudinary.com/dpdzneqo6/image/upload/v1758032826/ball-vector-ball-kids-vector_520417-380_cdv0to.avif",
    audio: "/audio/bumbug.mp3",
    letters: shuffleArray(["б", "ө", "м", "б", "ө", "г"]),
  },
  {
    id: "9",
    word: "морь",
    image:
      "https://res.cloudinary.com/dpdzneqo6/image/upload/v1758032827/how-to-draw-a-cartoon-horse-featured-image-1200_pzxaab.webp",
    audio: "/audio/mori.mp3",
    letters: shuffleArray(["м", "о", "р", "ь"]),
  },
  {
    id: "10",
    word: "мод",
    image:
      "https://res.cloudinary.com/dpdzneqo6/image/upload/v1758032817/cartoon-tree-green-leaves-on-600nw-2486657659_txbxqa.webp",
    audio: "/audio/mod.mp3",
    letters: shuffleArray(["м", "о", "д"]),
  },
  {
    id: "11",
    word: "сандал",
    image:
      "https://res.cloudinary.com/dpdzneqo6/image/upload/v1758032823/people-kid-chair-cartoon-happy-600nw-2342063025_z8alpm.webp",
    audio: "/audio/sandal.mp3",
    letters: shuffleArray(["с", "а", "н", "д", "а", "л"]),
  },
  {
    id: "12",
    word: "ширээ",
    image:
      "https://res.cloudinary.com/dpdzneqo6/image/upload/v1758032823/people-kid-chair-cartoon-happy-600nw-2342063025_z8alpm.webp",
    audio: "/audio/shiree.mp3",
    letters: shuffleArray(["ш", "и", "р", "э", "э"]),
  },
  {
    id: "13",
    word: "халбага",
    image:
      "https://res.cloudinary.com/dpdzneqo6/image/upload/v1758032823/people-kid-chair-cartoon-happy-600nw-2342063025_z8alpm.webp",
    audio: "/audio/halbaga.mp3",
    letters: shuffleArray(["х", "а", "л", "б", "а", "г", "а"]),
  },
  {
    id: "14",
    word: "түлхүүр",
    image:
      "https://res.cloudinary.com/dpdzneqo6/image/upload/v1758032804/istockphoto-936175582-612x612_egecnf.jpg",
    audio: "/audio/tulhuur.mp3",
    letters: shuffleArray(["т", "ү", "л", "х", "ү", "ү", "р"]),
  },
  {
    id: "15",
    word: "загас",
    image:
      "https://res.cloudinary.com/dpdzneqo6/image/upload/v1758032809/360_F_100245666_Seo23s3Fnw6XihC1fkW8PxF7SKfQRsaj_kuninz.jpg",
    audio: "/audio/zagas.mp3",
    letters: shuffleArray(["з", "а", "г", "а", "с"]),
  },
  {
    id: "16",
    word: "машин",
    image:
      "https://res.cloudinary.com/dpdzneqo6/image/upload/v1758032805/images_i2mggb.jpg",
    audio: "/audio/mashin.mp3",
    letters: shuffleArray(["м", "а", "ш", "и", "н"]),
  },
  {
    id: "17",
    word: "заан",
    image: "",
    audio: "/audio/zaan.mp3",
    letters: shuffleArray(["з", "а", "а", "н"]),
  },
  {
    id: "18",
    word: "тэмээ",
    image:
      "https://res.cloudinary.com/dpdzneqo6/image/upload/v1758032826/download_1_qricw4.jpg",
    audio: "/audio/temee.mp3",
    letters: shuffleArray(["т", "э", "м", "э", "э"]),
  },
  {
    id: "19",
    word: "харандаа",
    image:
      "https://res.cloudinary.com/dpdzneqo6/image/upload/v1758033333/images_1_pzemdj.jpg",
    audio: "/audio/kharandaa.mp3",
    letters: shuffleArray(["х", "а", "р", "а", "н", "д", "а", "а"]),
  },
  {
    id: "20",
    word: "цэцэг",
    image:
      "https://res.cloudinary.com/dpdzneqo6/image/upload/v1758033864/neip_rtd1_130301_nmyaui.jpg",
    audio: "/audio/tsetseg.mp3",
    letters: shuffleArray(["ц", "э", "ц", "э", "г"]),
  },
];
