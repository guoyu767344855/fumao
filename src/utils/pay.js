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

        // request({
        //     url: '/createJsapiSignature',
        //     data:{url:window.location.href},
        //     method: 'POST'
        // },true).then(res => {
        //     console.log('获取jssdk签名',res)
        //     if(res.data.success){
        //       wx.config(Object.assign(res.data.data,
        //         {
        //           debug: true,
        //           jsApiList: [ "chooseWXPay","getLocation","updateAppMessageShareData","updateTimelineShareData" ]
        //         }
        //       ));
        //       wx.ready(function(){
        //         webPay(timeStamp,nonceStr,packageValue,paySign,resolved,rejected)
        //       });
        //     }else{
        //       Taro.showToast({
        //         title:'获取jssdk签名失败，请升级微信'
        //       })
        //     } 
        // })

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