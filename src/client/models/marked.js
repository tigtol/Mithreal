import m from 'mithril'
import configOptions from './initialize.js'
import json from '../../../json/slides.json'
import marked from 'marked'
import slugify from 'slugify'
import hljs from 'highlight.js'
import {walkTokens} from './walkTokens.js'
import customToken from './customToken.js'
import tokenizer from './tokenizer.js'

marked.use({tokenizer})
var ast = marked.lexer(json.content)

ast = slidifyAst(walkTokens(ast, customToken))
console.log(ast)

var mithrealContainer = document.querySelector('#mithreal_container')
mithrealContainer.style.setProperty("--slide-height", configOptions.height);
mithrealContainer.style.setProperty("--slide-width", configOptions.width);

var vIndexMax = []

var slides = {
    idCounter: new Object(),
    h1Counter: 0,
    h2Counter: 0,
    onbeforeupdate: function() {this.idCounter = new Object(), this.h1Counter = 0, this.h2Counter = 0, vIndexMax = []},
    view: (vnode) => m('div', ast.map((x, idx) => mithrifyToken(x, vnode)).filter(x => x))
}



function mithrifyToken(token, vnode) {
    var tokenData = {
        type : token.type,
        id : null,
        href : null,
        hIndex : null,
        vIndex : null,
        h1Counter : null,
        h2Counter : null,
        idCounter : vnode.state.idCounter,
        src : null,
        alt : null,
        text : null,
        attr: {
            id: null,
            classList: [],
            attributeList: [],
            styleList: []
        },
        style: null
    }

    for (const prop in tokenData){
        tokenData[prop] = typeof(token[prop]) === 'undefined' ? tokenData[prop] : token[prop]
    }

    let isHidden = tokenData.attr.attributeList.length != 0 ? tokenData.attr.attributeList.map(x => x == 'data-visibility=hidden').reduce((x, y) => x+y) : false
    if (isHidden) {
        return null
    }
    else {

        switch (tokenData.type) {
            case 'strong':
                break
            case 'space':
                tokenData.type = 'br'
                break
            case 'paragraph':
                tokenData.type = 'p'
                break
            case 'heading':
                let slugifiedId = slugify(token.text)
                tokenData.type = token.depth <= 2 ? 'section' : 'h'+token.depth
                typeof(tokenData.idCounter[slugifiedId]) === 'undefined' ? tokenData.idCounter[slugifiedId] = 0 : tokenData.idCounter[slugifiedId] += 1
                tokenData.id = tokenData.idCounter[slugifiedId] == 0 ? slugifiedId : slugifiedId + '-' + tokenData.idCounter[slugifiedId]
                token.depth == 1 ? (vnode.state.h1Counter+=1, vnode.state.h2Counter = 1, vIndexMax.push(1)) : null
                token.depth == 2 ? (vnode.state.h2Counter+=1, vIndexMax[vIndexMax.length - 1]+=1) : null
                tokenData.hIndex = vnode.attrs.hIndex
                tokenData.vIndex = vnode.attrs.vIndex
                tokenData.h1Counter = vnode.state.h1Counter
                tokenData.h2Counter = vnode.state.h2Counter

                token.tokens[0].type = 'h1'

                var isPresent = tokenData.h1Counter == tokenData.hIndex & tokenData.h2Counter == tokenData.vIndex ? 'present' : ''
                break
            case 'list':
                tokenData.type = token.ordered ? 'ol' : 'ul'
                break
            case 'link':
                tokenData.type = 'a'
                tokenData.href = token.href
                break
            case 'list_item':
                tokenData.type = 'li'
                break
            case 'fences':
                tokenData.type = 'div'
                tokenClass = token.class
                break
            case 'image':
                tokenData.type = 'img'
                tokenData.src = token.href
                tokenData.alt = token.text
                tokenData.id = token.text
                break
            case 'code':
                const language = hljs.getLanguage(token.lang) ? token.lang : 'plaintext';
                tokenData.text = hljs.highlight(token.text, {language: language}).value
                tokenData.attr.classList.push('hljs language-'+language)
                break
            default:
                tokenData.text = token.text
        }
        let tag = tokenData.attr.attributeList.length ? tokenData.type + '[' + tokenData.attr.attributeList.join('][')+']': tokenData.type

        // Handle background

        var childrenToken = typeof(token.tokens) !== 'undefined' ? token.tokens.map(x => mithrifyToken(x, vnode)) : []
        var childrenItems = typeof(token.items) !== 'undefined' ? token.items.map(x => mithrifyToken(x, vnode)) : []
        var childrenChildren = typeof(token.children) !== 'undefined' ? token.children.map(x => mithrifyToken(x, vnode)) : []
        var allChildren = childrenToken.concat(childrenItems).concat(childrenChildren)
        return allChildren.length == 0 ? m(tag, {src: tokenData.src, alt: tokenData.alt, class: tokenData.attr.classList != [] ? tokenData.attr.classList.join(' ') : null, style: tokenData.attr.styleList}, m.trust(tokenData.text)) : m(tag, {id: tokenData.id, href: tokenData.href, class: tokenData.attr.classList != [] ? (tokenData.attr.classList.join(' ')+' '+isPresent).trim():null, style: tokenData.attr.styleList}, allChildren)
    }
}

function slidifyAst(ast){
    let lastHeadingIdx
    var newAst = ast
    newAst.forEach((x, idx) => {(x.type == "heading" & x.depth <= 2) ? lastHeadingIdx = idx : newAst[lastHeadingIdx]['tokens'].push(x)})
    newAst = newAst.filter(x => x.type == 'heading' & x.depth <= 2)
    return newAst
}

export {slides, ast, vIndexMax}
