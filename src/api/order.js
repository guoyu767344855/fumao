import request from '@/utils/request'

export function createOrder(data) {
  return request({
    url:'/order/create',
    method: 'post',
    data
  })
}

export function orderList(data) {
  return request({
    url:'/order/pagedQuery',
    method: 'post',
    data
  })
}