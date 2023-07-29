import {
    pinia
} from '../store'
import router from '../router'
import vuetify from './vuetify'
import video from './video'

// Add your plugins here
const plugins = [pinia, router, vuetify, video]

export default {
    install: (app) => {
        plugins.forEach((plugin) => {
            app.use(plugin)
        })
    }
}