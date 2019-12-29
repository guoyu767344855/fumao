import request from '@/utils/request'

export function memberWithdrawLog(data) {
  return request({
    url:'/memberWithdrawLog/withdraw',
    method: 'post',
    data
  })
}