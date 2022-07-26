import m from "mithril"
import configOptions from "../models/initialize"
import {vPagination} from "../controls/keyboard"

if (configOptions.progress) {
    let progressbarCont = document.querySelector('#progressbar_container')
    let maxPagination = vPagination[vPagination.length-1][vPagination[vPagination.length-1].length-1]
    let progressBar = {
        view: () => m('#progressbar', m('#cursor', {style: {width: (vPagination[m.route.param('hIndex')-1][m.route.param('vIndex')-1]-1)/(maxPagination-1)*100+'%'}}))
    }

    m.mount(progressbarCont, progressBar)
}
