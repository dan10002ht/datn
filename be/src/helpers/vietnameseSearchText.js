function getUnicode() {
  const unicode = [
    'aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬ',
    'bB',
    'cC',
    'dDđĐ',
    'eEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆ',
    'fF',
    'gG',
    'hH',
    'iIìÌỉỈĩĨíÍịỊ',
    'jJ',
    'kK',
    'lL',
    'mM',
    'nN',
    'oOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢ',
    'pP',
    'qQ',
    'rR',
    'sS',
    'tT',
    'uUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰ',
    'vV',
    'wW',
    'xX',
    'yYỳỲỷỶỹỸýÝỵỴ',
    'zZ',
  ];
  const unicodeArray = [];
  for (let i = 0; i < unicode.length; i++) {
    const temp = [];
    // Get characters same same(Remove characters is upper case)
    unicode[i].split('').map((item) => {
      if (temp.indexOf(item.toLowerCase()) == -1) {
        temp.push(item.toLowerCase());
        return item.toLowerCase();
      }
      return null;
    });
    unicodeArray.push(temp);
  }
  return unicodeArray;
}

function detectString(str) {
  const unicodeArray = getUnicode();
  const strArray = [];
  let strOrigin = str.split('');
  str = strOrigin.slice();
  // Get matrix characters
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    for (let y = 0; y < unicodeArray.length; y++) {
      let unicode = unicodeArray[y];
      if (unicode.length == 1) continue;
      if (unicode.indexOf(char) >= 0) {
        strArray.push({index: i, unicode: unicode});
        break;
      }
    }
  }

  let strReturn = [];
  let strLength = strArray.length;

  // Add entity
  function addRegularExpression(str) {
    // Special characters meaning in regular expressions
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
    str = str.replace(/\\/g, '\\\\');
    str = str.replace(/\|/g, '\\|');
    str = str.replace(/\(/g, '\\(');
    str = str.replace(/\)/g, '\\)');
    str = str.replace(/\[/g, '\\[');
    str = str.replace(/\+/g, '\\+');
    str = str.replace(/\./g, '\\.');
    str = str.replace(/\*/g, '\\*');
    str = str.replace(/\?/g, '\\?');

    if (strReturn.indexOf(str) === -1) {
      strReturn.push(str);
    }
  }

  // Set item origin(Of course)
  addRegularExpression(strOrigin.join(''));

  if (strLength == 3) {
    // Setup Matrix AxBxC
    for (let indexRowOne = 0; indexRowOne < strLength; indexRowOne++) {
      let rowOne = strArray[indexRowOne];
      for (let indexRowTwo = 0; indexRowTwo < strLength; indexRowTwo++) {
        let rowTwo = strArray[indexRowTwo];
        for (let indexRowThree = 0; indexRowThree < strLength; indexRowThree++) {
          let rowThree = strArray[indexRowThree];
          // Go to all items
          for (let a = 0; a < rowOne.unicode.length; a++) {
            for (let b = 0; b < rowTwo.unicode.length; b++) {
              for (let c = 0; c < rowThree.unicode.length; c++) {
                str = strOrigin.slice();
                // Thinking
                str[rowOne.index] = rowOne.unicode[a];
                str[rowTwo.index] = rowTwo.unicode[b];
                str[rowThree.index] = rowThree.unicode[c];
                addRegularExpression(str.join(''));
              }
            }
          }
        }
      }
    }
  } else if (strLength == 2) {
    // Setup Matrix AxB
    for (let indexRowOne = 0; indexRowOne < strLength; indexRowOne++) {
      let rowOne = strArray[indexRowOne];
      for (let indexRowTwo = 0; indexRowTwo < strLength; indexRowTwo++) {
        let rowTwo = strArray[indexRowTwo];
        // Go to all items
        for (let a = 0; a < rowOne.unicode.length; a++) {
          for (let b = 0; b < rowTwo.unicode.length; b++) {
            str = strOrigin.slice();
            // Thinking
            str[rowOne.index] = rowOne.unicode[a];
            str[rowTwo.index] = rowTwo.unicode[b];
            addRegularExpression(str.join(''));
          }
        }
      }
    }
  } else if (strLength == 1) {
    // Loop
    for (let indexRowOne = 0; indexRowOne < strLength; indexRowOne++) {
      let rowOne = strArray[indexRowOne];
      // Go to all items
      for (let a = 0; a < rowOne.unicode.length; a++) {
        str = strOrigin.slice();
        // Thinking
        str[rowOne.index] = rowOne.unicode[a];
        addRegularExpression(str.join(''));
      }
    }
  }

  return strReturn.join('|');
}

const fullTextSearchVi = (searchText) => {
  let queries = [];
  if (searchText !== undefined && searchText !== null && searchText !== '') {
    // Get words by string
    let str = searchText.trim().split(' ');
    for (let i = 0; i < str.length; i++) {
      let temp = str[i];
      // Render word by characters same same
      queries.push(detectString(temp));
    }
  }

  return queries.join('|');
};

export default fullTextSearchVi;
