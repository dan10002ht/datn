function removeDiacritics(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  export default function convertVietnameseToEnglish(str) {
    const vietnameseChars = 'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĐđ';
    const englishChars = 'AAAAEEEIIOOOOUUYaaaaeeeiioooouuyDd';
  
    return removeDiacritics(
      str
        .split('')
        .map((char) => {
          const index = vietnameseChars.indexOf(char);
          return index !== -1 ? englishChars[index] : char;
        })
        .join(''),
    ).toLowerCase();
  }
  