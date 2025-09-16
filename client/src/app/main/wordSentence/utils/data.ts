export interface WordData {
  id: string;
  word: string;      // Монгол үг
  image: string;     // Image URL
  audio: string;     // Audio URL
  letters: string[];
  completed?: boolean ;
}

export const words: WordData[] = [
  {
    id: "1",
    word: "алим",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg",
    audio: "/audio/alim.mp3",
    letters: shuffleArray(["а","л","и","м"])
  },
  {
    id: "2",
    word: "банана",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg",
    audio: "/audio/banan.mp3",
    letters: shuffleArray(["б","а","н","а","н"])
  },
  {
    id: "3",
    word: "нохой",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/55/Golden_Retriever_Carlos_(10581910556).jpg",
    audio: "/audio/nohoi.mp3",
    letters: shuffleArray(["н","о","х","о","й"])
  },
  {
    id: "4",
    word: "муур",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg",
    audio: "/audio/muur.mp3",
    letters: shuffleArray(["м","у","у","р"])
  },
  {
    id: "5",
    word: "сүү",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Glass_of_milk.jpg",
    audio: "/audio/suu.mp3",
    letters: shuffleArray(["с","ү","ү"])
  },
  {
    id: "6",
    word: "талх",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a3/White_bread.jpg",
    audio: "/audio/talh.mp3",
    letters: shuffleArray(["т","а","л","х"])
  },
  {
    id: "7",
    word: "цэцэг",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Rose_flower.JPG",
    audio: "/audio/tsetseg.mp3",
    letters: shuffleArray(["ц","э","ц","э","г"])
  },
  {
    id: "8",
    word: "нар",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/43/Sunflower_sky_backdrop.jpg",
    audio: "/audio/nar.mp3",
    letters: shuffleArray(["н","а","р"])
  },
  {
    id: "9",
    word: "сав",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Clay_pot.jpg",
    audio: "/audio/sav.mp3",
    letters: shuffleArray(["с","а","в"])
  },
  {
    id: "10",
    word: "ус",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Glass_of_water.jpg",
    audio: "/audio/us.mp3",
    letters: shuffleArray(["у","с"])
  },
  {
    id: "11",
    word: "автобус",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/01/Bus_NYC.jpg",
    audio: "/audio/avtobus.mp3",
    letters: shuffleArray(["а","в","т","о","б","у","с"])
  },
  {
    id: "12",
    word: "машин",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Tesla_Model_3_parked.jpg",
    audio: "/audio/mashin.mp3",
    letters: shuffleArray(["м","а","ш","и","н"])
  },
  {
    id: "13",
    word: "тэмээ",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Camel_in_Gobi_Desert.jpg",
    audio: "/audio/temee.mp3",
    letters: shuffleArray(["т","э","м","э","э"])
  },
  {
    id: "14",
    word: "үхэр",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/19/Holstein_Friesian_cow.jpg",
    audio: "/audio/ukher.mp3",
    letters: shuffleArray(["ү","х","э","р"])
  },
  {
    id: "15",
    word: "морь",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Horse_in_field.jpg",
    audio: "/audio/mori.mp3",
    letters: shuffleArray(["м","о","р","ь"])
  },
  {
    id: "16",
    word: "талбай",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/79/Public_square.jpg",
    audio: "/audio/talbai.mp3",
    letters: shuffleArray(["т","а","л","б","а","й"])
  },
  {
    id: "17",
    word: "ном",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Bookshelf.jpg",
    audio: "/audio/nom.mp3",
    letters: shuffleArray(["н","о","м"])
  },
  {
    id: "18",
    word: "цонх",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Window_opened.jpg",
    audio: "/audio/tsongkh.mp3",
    letters: shuffleArray(["ц","о","н","х"])
  },
  {
    id: "19",
    word: "гэр",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/House_in_Mongolia.jpg",
    audio: "/audio/ger.mp3",
    letters: shuffleArray(["г","э","р"])
  },
  {
    id: "20",
    word: "ширээ",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/12/Table.jpg",
    audio: "/audio/shiree.mp3",
    letters: shuffleArray(["ш","и","р","э","э"])
  }
];

// shuffle туслах функц
function shuffleArray(arr: string[]): string[] {
  return arr
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
