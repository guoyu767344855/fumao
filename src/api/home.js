import request from '@/utils/request'

export function list(data) {
  return request({
    url:'/product/pagedQuery',
    method: 'post',
    data
  })
}

export function getShareQrCode() {
  return request({
    url:'/share/getShareQrCode',
    method: 'get'
  })
}

export function getContent() {
  return request({
    url:'/home/content',
    method: 'get'
  })
}