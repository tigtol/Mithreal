var mithrealCont = document.querySelector('#mithreal_container')

function reportWindowSize() {
    let windowHeight = window.innerHeight
    let windowWidth = window.innerWidth
    let windowSizeRatio = windowHeight / windowWidth
    let mithrealHeight = parseInt(getComputedStyle(mithrealCont).getPropertyValue('--slide-height'))
    let mithrealWidth = parseInt(getComputedStyle(mithrealCont).getPropertyValue('--slide-width'))
    let mithrealSizeRatio = mithrealHeight/mithrealWidth
    let scale = mithrealSizeRatio > windowSizeRatio ? windowHeight/mithrealHeight : windowWidth/mithrealWidth
    mithrealCont.style.transform = 'scale('+scale+')'
}

window.onresize = reportWindowSize
