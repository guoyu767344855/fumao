import request from '@/utils/request'
import wx from 'weixin-js-sdk';

export function pay(orderId) {
  console.log(wx)
    return new Promise((resolved,rejected)=>{
    request({
        url:'/pay/wechat/jsApi',
        method: 'post',
        data:{orderId}
      }).then(res=>{
        console.log('调起微信支付信息',res.data)
        let {timeStamp,nonceStr,packageValue,paySign} = res.data
        webPay(timeStamp,nonceStr,packageValue,paySign,resolved,rejected)
      })
    })
}

// 公众号支付
function  webPay(timeStamp,nonceStr,packageValue,paySign,resolved,rejected){
    wx.chooseWXPay({
      timestamp:Number(timeStamp),
      nonceStr,
      package:packageValue,
      signType: 'MD5',
      paySign,
      success (res) {
        resolved(res)
      },
      fail (res) { 
        rejected(res)
      },
    });
  }