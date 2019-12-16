import request from '@/utils/request'

export function getDetail(data) {
  return request({
    url:'/sku/'+data,
    method: 'get',
  })
}