import m from 'mithril'
import {slides} from '../models/marked'

var slideContainer = document.querySelector('#slide_container')
m.route(slideContainer, '/1/1', {
    '/:hIndex/:vIndex': slides
    }
)
