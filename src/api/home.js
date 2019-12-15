import request from '@/utils/request'

export function list(data) {
  return request({
    url:'/product/pagedQuery',
    method: 'post',
    data
  })
}