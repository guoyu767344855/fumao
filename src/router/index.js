import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const constantRoutes = [
  {
    path: '/',
    meta: {
      title: '富猫',
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
      title: '商品详情',
      keepAlive: false
    },
    component: () => import('@/views/goodDetail/index')
  },
  {
    path: '/pay',
    name:'pay',
    meta:{
      title: '确认订单',
      keepAlive: false
    },
    component: () => import('@/views/pay/index')
  },
  {
    path: '/address',
    meta:{
      title: '收货地址',
      keepAlive: false
    },
    component: () => import('@/views/address/index')
  },
  {
    path: '/addAddress',
    meta:{
      title: '添加地址',
      keepAlive: false
    },
    component: () => import('@/views/addAddress/index')
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
  },
  {
    path: '/articleList',
    meta:{
      title: '专业课程',
      keepAlive: false
    },
    component: () => import('@/views/articleList/index')
  },
  {
    path: '/article',
    meta:{
      title: '',
      keepAlive: false
    },
    component: () => import('@/views/article/index')
  },
  {
    path: '/member',
    meta:{
      title: '会员中心',
      keepAlive: false
    },
    component: () => import('@/views/member/index')
  },
  {
    path: '/product',
    meta:{
      title: '产品中心',
      keepAlive: false
    },
    component: () => import('@/views/product/index')
  },
  {
    path: '/estimate',
    meta:{
      title: '收益',
      keepAlive: false
    },
    component: () => import('@/views/estimate/index')
  },
  {
    path: '/explain',
    meta:{
      title: '结算说明',
      keepAlive: false
    },
    component: () => import('@/views/explain/index')
  },
  {
    path: '/fans',
    meta:{
      title: '粉丝',
      keepAlive: false
    },
    component: () => import('@/views/fans/index')
  },
  {
    path: '/withdraw',
    meta:{
      title: '提现',
      keepAlive: false
    },
    component: () => import('@/views/withdraw/index')
  },
  {
    path: '/aliPay',
    meta:{
      title: '修改绑定',
      keepAlive: false
    },
    component: () => import('@/views/aliPay/index')
  }
]

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    base:  '/',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

export default createRouter()
