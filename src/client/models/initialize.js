import userConfig from '../../../json/slides.json'
import configOptions from './default.json'

for (const prop in userConfig.data){
    configOptions[prop] = userConfig.data[prop]
}

export default configOptions
