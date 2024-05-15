import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index' 
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: 'Page not found',
    },
    component: () => import('@/views/404.vue')
  },
  // 所有未定义路由，全部重定向到404页
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  base: "/chat",
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
