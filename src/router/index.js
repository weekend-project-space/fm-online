import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

const About = {
    template: '<div>About</div>'
}
const routes = [{
        path: '/',
        component: () => import('@/views/Index.vue')
    }, {
        path: '/setup',
        component: () => import('@/views/Setup.vue')
    },
    {
        path: '/about',
        component: About
    },
]
export default createRouter({
    history: createWebHashHistory(),
    routes,
})