import m from 'mithril'
import {vIndexMax} from '../models/marked'
import configOptions from '../models/initialize'

var h = 1
var v = 1

var maxPagination = vIndexMax.reduce((x, y) => x+y)
maxPagination = [...Array(maxPagination).keys()].map(x => x+1)
var vPagination = vIndexMax.map(x => [...Array(x)])
vPagination = vPagination.map(x => x.map(y => maxPagination.shift()))

var vIndexHistory = new Array(vIndexMax.length).fill(1)

typeof(m.route.get()) != 'undefined' ? (h = parseInt(m.route.param('hIndex')), v = parseInt(m.route.param('vIndex'))) : (h = 1, v = 1)


var hMax = vIndexMax.length
var vMax = vIndexMax
document.addEventListener('keydown', (event) =>
    {slideIndexManager(event.key),
            configOptions.allowFullScreen ? fullscreenRequest(event.key):null
    })

function fullscreenRequest(key) {
    let body = document.querySelector('body')
    console.log(key)
    switch(key) {
        case 'f':
            !document.fullscreenElement ? body.requestFullscreen() : null
            break
    }
}

function slideIndexManager(key) {
    var hTemp = h
    var vTemp = v
    switch(key) {
        case configOptions.keyboard.left:
            h <= 1 ? null : (vIndexHistory[h-1]=v, h-=1, v=vIndexHistory[h-1])
            break
        case configOptions.keyboard.right:
            h >= hMax ? null : (vIndexHistory[h-1]=v, h+=1, v=vIndexHistory[h-1])
            break
        case configOptions.keyboard.up:
            v <= 1 ? null : v-=1
            break
        case configOptions.keyboard.down:
            v >= vMax[h-1] ? null : v+=1
            break
    }
    if (h!=hTemp | v!=vTemp) {
        routeChange()
    }
}

function routeChange(){
    m.route.set(`${h}/${v}`)
}

export {vPagination as vPagination, slideIndexManager as slideIndexManager}
