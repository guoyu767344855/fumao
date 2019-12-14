import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const constantRoutes = [
  {
    path: '/',
    meta: {
      title: '伊水一方',
      keepAlive: false
    },
    component: () => import('@/views/home/index')
  },
  {
    path: '/business',
    meta:{
      title: '商学院',
      keepAlive: false
    },
    component: () => import('@/views/business/index')
  },
  {
    path: '/my',
    meta:{
      title: '我的',
      keepAlive: false
    },
    component: () => import('@/views/my/index')
  }
]

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    base:  '/app/',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

export default createRouter()
