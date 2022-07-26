function walkTokens(ast, fns){
    function getChildren(token){ 
        const compose = (x) => fns.reduce((y, f) => f(y), x);
        token = compose(token)
        typeof(token.tokens) === 'undefined' ? null : token.tokens = token.tokens.map(x => getChildren(x))
        return token
    }

    ast = ast.map(x => getChildren(x))
    return ast
}

export {walkTokens as walkTokens}
