import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const constantRoutes = [
  {
    path: '/',
    meta: {
      title: '伊水一方',
      keepAlive: false,
      footer:true
    },
    component: () => import('@/views/home/index')
  },
  {
    path: '/business',
    meta:{
      title: '商学院',
      keepAlive: false,
      footer:true
    },
    component: () => import('@/views/business/index')
  },
  {
    path: '/my',
    meta:{
      title: '我的',
      keepAlive: false,
      footer:true
    },
    component: () => import('@/views/my/index')
  },
  {
    path: '/goodDetail',
    meta:{
      title: '订单详情',
      keepAlive: false
    },
    component: () => import('@/views/goodDetail/index')
  },
  {
    path: '/pay',
    meta:{
      title: '确认订单',
      keepAlive: false
    },
    component: () => import('@/views/pay/index')
  },
  {
    path: '/location',
    meta:{
      title: '收货地址',
      keepAlive: false
    },
    component: () => import('@/views/location/index')
  },
  {
    path: '/addLocation',
    meta:{
      title: '添加地址',
      keepAlive: false
    },
    component: () => import('@/views/addLocation/index')
  },
  {
    path: '/orderList',
    meta:{
      title: '我的订单',
      keepAlive: false
    },
    component: () => import('@/views/orderList/index')
  },
  {
    path: '/orderDetail',
    meta:{
      title: '我的订单',
      keepAlive: false
    },
    component: () => import('@/views/orderDetail/index')
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
