import request from '@/utils/request'
import wx from 'weixin-js-sdk';

 function share() {
   console.log(window.location.href)
      request({
          url: '/createJsapiSignature',
          data:{url:window.location.href},
          method: 'POST'
      },true).then(res => {
          console.log('获取jssdk签名',res)
          let config = {}
          if(res.code == 200){
            config = Object.assign(res.data,
              {
                debug: false,
                jsApiList: [ "chooseWXPay","getLocation","updateAppMessageShareData","updateTimelineShareData" ]
              }
            )
            wx.config(config);
            wx.ready(function(){
              shareConfig();
            });
          }else{
            console.log('获取jssdk签名失败，请升级微信')
          } 
      })
}
function shareConfig(){
  wx.updateAppMessageShareData({
    title:'黄金鹿鞭', // 分享标题
    desc:'分享', // 分享描述
    link:`http://api-test.hangim.com/wxMpAuth/index?parentId=${localStorage.getItem('userId') || ''}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl:require('../assets/images/sharIcon.jpg'), // 分享图标
    success: function () {
      // 设置成功
      console.log('发送朋友设置成功')
    }
  })
  wx.updateTimelineShareData({ 
    title:'黄金鹿鞭', // 分享标题
    link:`http://api-test.hangim.com/wxMpAuth/index?parentId=${localStorage.getItem('userId') || ''}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl:require('../assets/images/sharIcon.jpg'), // 分享图标
    success: function () {
      // 设置成功
      console.log('分享朋友圈设置成功')
    }
  })
}

share()