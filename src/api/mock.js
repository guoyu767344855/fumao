import request from '@/utils/request'
import '../../mock/mock'

export function list(data) {
  return request({
    url:'/list',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url:'/login',
    method: 'post',
    data
  })
}
