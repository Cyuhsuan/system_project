import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import MessageBoard from '../views/MessageBoard.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: "首頁",
      needLogin: true //需要登入
    }
  },
  {
    path: '/message-board',
    name: 'MessageBoard',
    component: MessageBoard,
    meta: {
      needLogin: true //需要登入
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
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
// 路徑守衛
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.needLogin) { // 判斷是否需要登入驗證
    if (token) { // 判斷是否已登入
      next()
    }
    else {
      next({ path: '/' }) //跳轉登入頁面
    }
  } else {
    next()
  }
})

export default router
