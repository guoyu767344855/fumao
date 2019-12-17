import request from '@/utils/request'

export function list(data) {
  return request({
    url:'/member/address/list',
    method: 'get',
  })
}

export function update(data) {
  return request({
    url:'/member/address/update/'+data.id,
    method: 'POST',
    data
  })
}

export function add(data) {
  return request({
    url:'/member/address/add',
    method: 'POST',
    data
  })
}

export function Delete(data) {
  return request({
    url:'/member/address/delete/'+data,
    method: 'POST',
  })
}