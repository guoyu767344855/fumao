import request from '@/utils/request'

export function login(data) {
  return request({
    url:'/sso/login?username=xuyanjun&password=123456',
    method: 'post',
  })
}