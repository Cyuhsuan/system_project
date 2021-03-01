import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import MessageBoard from '../views/MessageBoard.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: "首頁",
      needLogin: true //需要登录
    }
  },
  {
    path: '/message-board',
    name: 'MessageBoard',
    component: MessageBoard,
    meta: {
      needLogin: true //需要登录
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// // 全局路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.needLogin) { // 判断该路由是否需要登录权限
    if (token) { // 判断是否已经登录
      next()
    }
    else {
      next({ path: '/' }) //跳转到登录页
    }
  } else {
    next()
  }
})

export default router
