import request from '@/utils/request'

export function memberInfo(data) {
  return request({
    url:'/member/my',
    method: 'GET',
  })
}