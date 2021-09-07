export const removeDiacritics = (str: string): string => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const capitalize = (str: string): string => {
  const [firstLetter, ...restLetters] = str.split("");
  return `${firstLetter.toUpperCase()}${restLetters.join("")}`;
};
