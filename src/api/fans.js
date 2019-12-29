import request from '@/utils/request'

export function orderList(data) {
  return request({
    url:'/pagedQuery',
    method: 'post',
    data
  })
}