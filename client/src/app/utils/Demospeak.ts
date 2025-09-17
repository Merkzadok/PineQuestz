const audioMap: Record<string, string> = {
  морь: "/audio/mori.mp3",
  ном: "/audio/nom.mp3",
  сүx: "/audio/axe.mp3",
  // add the rest
};

export const playAudioDemo = (word: string) => {
  const path = audioMap[word];
  if (!path) {
    console.warn(`No audio found for "${word}"`);
    return;
  }
  const audio = new Audio(path);
  audio.play();
};
