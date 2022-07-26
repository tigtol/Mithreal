import marked from 'marked'

var markdown =`
::: admonition
blabla
ablabla
- dskfljh
- dhkljh
- kjhdskjh
:::
`
const lexer = new marked.Lexer();
const tokens = lexer.lex(markdown);
console.log(tokens);
//console.log(lexer.tokenizer.rules.block); // block level rules used
//console.log(lexer.tokenizer.rules.inline); // inline level rules used
//console.log(marked.Lexer.rules.block); // all block level rules
//console.log(marked.Lexer.rules.inline); // all inline level rules
//import marked from 'marked'
//var md =`
//::: admonition
//blabla
//ablabla
//- dskfljh
//- dhkljh
//- kjhdskjh
//:::
//`
//
//// Override function
//const tokenizer = {
//    fences(src) {
//        const rule = RegExp('^:::+ (.+)\\n((.+\\n)+):::+')    // Regex for the complete token
//        const match = rule.exec(src);
//        if (match) {
//            const token = {                                 // Token to generate
//                type: 'fences',                      // Should match "name" above
//                raw: match[0],                                // Text to consume from the source
//                text: match[2].trim(),                                // Text to consume from the source
//                class: match[1].trim(),                        // Additional custom properties
//                tokens: []                                    // Array where child inline tokens will be generated
//            };
//            this.lexer.blockTokens(token.text, token.tokens);    // Queue this data to be processed for inline tokens
//            return token;
//        }else {
//
//            // return false to use original codespan tokenizer
//            return false;
//        }
//    },
//};
//
//marked.use({ tokenizer });
//
//// Run marked
//console.log(marked.lexer(md));
