import m from 'mithril'
import {vPagination, slideIndexManager} from './keyboard'
import configOptions from '../models/initialize'


function arrow(direction) {
    return {view: () => m('button', {id: 'navigate-'+direction, onclick: function() {slideIndexManager(configOptions.keyboard[direction])}, class: isLast(direction)}, [m('.arrow_part_1'), m('.arrow_part_2')])}
}

function isLast(direction) {
    let h = m.route.param('hIndex')
    let v = m.route.param('vIndex')
    let isHidden = null
    switch(direction) {
        case 'left':
            isHidden = h == 1
            break
        case 'right':
            isHidden = h == vPagination.length
            break
        case 'up':
            isHidden = v == 1
            break
        case 'down':
            isHidden = v == vPagination[h-1].length
            break
    }
    return isHidden ? 'hidden' : null
}



function parsePagination(){
    let numberFormat = configOptions.slideNumber
    switch(numberFormat) {
        case true:
            numberFormat = vPagination[m.route.param('hIndex')-1][m.route.param('vIndex')-1]
            break
        case false:
            break
        default:
            numberFormat = numberFormat.split("").map(x => x == 'h' ? m.route.param('hIndex') : x == 'v' ? m.route.param('vIndex') : x == 'c' ? vPagination[m.route.param('hIndex')-1][m.route.param('vIndex')-1] : x == 't' ? vPagination[vPagination.length-1][vPagination[vPagination.length-1].length-1] : x)
    }
    return numberFormat
}

let pagination = configOptions.slideNumber != false ? {view: () => m('span', {id: 'pagination'}, parsePagination())} : null

let navigation = {
    view : () => m('div', [m(arrow('left')), m(arrow('up')), m(arrow('right')), m(arrow('down')), pagination ? m(pagination): null])
}

let navigationCont = document.querySelector("#navigation")

m.mount(navigationCont, navigation)

export default navigation
