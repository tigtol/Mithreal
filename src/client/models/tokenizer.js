// Override function
const tokenizer = {
  fences(src) {
      const match = src.match(/^:{3,}(.+)\n+[^:{3,}]*(?::{3,}.+\n+[^:{3,}]*)*(:{3,}\s+[^:{3,}]*)*:{3,} *\n+/) // ^:{3,}(.*)\n([^:]*)(:{3,}(.*)\n(.*)?:{3,})[^:]*:::  regex à retester
    if (match) {
        //console.log(match[0])
      return {
        type: 'div',
        raw: match[0],
        text: match[1].trim()
      };
    }else{

    // return false to use original codespan tokenizer
    return false;
    }
  },
    paragraph(src) {
        const match = src.match(/(([^{\n]+){(.+)})/)
    if (match) {
        console.log(match[0])
    }
        return false
    }
};

export default tokenizer
