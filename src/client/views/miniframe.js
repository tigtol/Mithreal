import m from "mithril"
import {ast} from "../models/marked"

function getH1H2(ast){
    var h1h2 = ast.filter(x => x.type === 'heading' ? x.depth <= 2 : false)
    return h1h2
}
    
function getH1(h1h2) {
    var h1 = h1h2.map(x => x.depth === 1 ? x : null).filter(x => x !== null)
    return h1
}

function getH2byH1(h1h2) {
    var h2byh1 = new Array()
    h1h2.forEach(x => x.depth === 1 ? h2byh1.push(new Array()) : h2byh1[h2byh1.length-1].push(x))
        return h2byh1
}


function genMiniframe(ast) {
    function genH1(x, idx){
        return {
            hIndex: idx+1,
            view: (vnode) => m('li', {class: vnode.state.hIndex == m.route.param('hIndex') ? 'present':null}, [m('a', {href: '#!'+ parseInt(vnode.state.hIndex) +'/1'}, x.text), vnode.children])
        }
    }

    function genH2(x, hIndex, vIndex){
        return {
            hIndex: hIndex,
            vIndex: vIndex,
            view: (vnode) => m('li', {class: vnode.state.hIndex == m.route.param('hIndex') & vnode.state.vIndex == m.route.param('vIndex') ? 'present':null}, [m('a',{href: '#!'+parseInt(hIndex)+'/'+parseInt(vIndex)})])
        }
    }

    var h1h2 = getH1H2(ast)
    var h1 = getH1(h1h2)
    var h2byh1 = getH2byH1(h1h2)

    var h2byh1Comp = h2byh1.map((x, idx) => m('ul', x.map((y, idy) => m(genH2(y, idx+1, idy+2)))))
    let h1Comp = h1.map(function(x, idx) {
        return {view: () =>m(genH1(x, idx), h2byh1Comp[idx])}
    })
    console.log('h1Comp')
    console.log(h1Comp)
    var miniframeComp = {
        view: () => m('ul', h1Comp.map(x => m(x)))
    }
    
    return miniframeComp
}

function main() {
    var miniframe = genMiniframe(ast)
    var miniframeContainer = document.querySelector('nav')

    m.mount(miniframeContainer, miniframe)

    return miniframe
}


var miniframe = main()

export default miniframe;
