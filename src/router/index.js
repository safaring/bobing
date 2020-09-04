import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: 'home'
        },
        {
            path: '/home',
            name: 'Home',
            component: resolve => require(['@/views/Home'], resolve),
            meta: {
                title: '首页', // 页面标题
                keepAlive: true, // 是否缓存页面
            }
        }
    ]
})