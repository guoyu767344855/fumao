import request from '@/utils/request'

export function orderList(data) {
  return request({
    url:'/orderPredicate/listByTime',
    method: 'post',
    data
  })
}