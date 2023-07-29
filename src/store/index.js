import {
    defineStore,
    createPinia
} from 'pinia'

const setItem = (k, v) => localStorage.setItem(k, v instanceof String ? v : JSON.stringify(v));
const getItem = (k) => localStorage.getItem(k) ? JSON.parse(localStorage.getItem(k)) : null

export const useAppStore = defineStore('app', {
    // other options...
    state: () => ({
        fm: getItem('fm') || {
            url: '',
            name: '',
            meta: {}
        },
        sourceUrl: getItem('sourceUrl') || null,
    }),
    actions: {
        setFM(data) {
            this.fm = data
            setItem('fm', data)
        },
        setSourceUrl(data) {
            this.sourceUrl = data
            setItem('sourceUrl', data)
        }
    },
})

export const pinia = createPinia()