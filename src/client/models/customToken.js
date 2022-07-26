function processAttr(token){
    function braceParser(content){
        const braceContent = content.split(/ +/).map(x => x.replace(/^-$/, '.unnumbered'))
        const classList = braceContent.filter(x => x.charAt(0) == '.').map(x => x.slice(1))
        const id = braceContent.filter(x => x.charAt(0) == '#').map(x => x.slice(1))
        const attributeList = braceContent.filter(x => (x.charAt(0) != '#') & (x.charAt(0) != '.')).map(x => x.replace(/'/g, '"'))
        const styleList = attributeList.map(x => x.replace('data-', '').replace('=', ':').replace(/:(.*\.jpg|jpeg|png|gif|svg|tiff])/, ':url("$1")')).join(';')
        return {
            classList: classList,
            id : id,
            attributeList : attributeList,
            styleList : styleList
        }
    }

    let content = token.text
    const rule = RegExp('^([^#{}\n]+)[ #]*(?:{(.+)}) *')    // Regex for the complete token
    const match = rule.exec(content);
    if (match){
        token.text = match[1]
        token.type == "heading" ? token.attr = braceParser(match[2]) : null
    }
    return token
}

function addParentPre(token){
    if (token.type == 'code'){
    let tokenCopy = Object.assign({}, token);
        token.type = 'pre'
        token.children = [tokenCopy]
    }
    return token
}

export default [processAttr, addParentPre]
