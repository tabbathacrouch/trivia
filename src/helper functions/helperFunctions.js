export const cleanString = (string) => {
  return (
    string
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&rsquo;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&pi;/g, "π ")
      .replace(/&ldquo;/g, `"`)
      .replace(/&rdquo;/g, `"`)
      .replace(/&Eacute;/g, "É")
      .replace(/&ouml;/g, "ö")
      // not working in geography category *****fix*****
      .replace(/&amp;Nu;/g, "Ν")
      .replace(/&amp;uuml;/g, "ü")
  );
};

export const shuffleArray = (array) => {
  let currentIndex = array.length;
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

export const calculateScore = (score) => {
  return Math.round((score / 30) * 100);
};
