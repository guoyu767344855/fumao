import request from '@/utils/request'

export function list(data) {
  return request({
    url:'/member/address/list',
    method: 'get',
  })
}