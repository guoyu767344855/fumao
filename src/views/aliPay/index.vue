<template>
  <div class='withdraw'>
    <div class="header">修改提现账号</div>
    <div class="name">支付宝姓名</div>
    <div class="ints">
        <input type="text" placeholder="请输入您的支付宝姓名">
    </div>
    <div  class="name two">支付宝账号</div>
    <div class="int">
        <input type="text" placeholder="请输入您的支付宝账号">
    </div>
    <div class="text">
        支付宝号格式为“<span>手机号</span>”或“<span>邮箱</span>”，若这两者您都有，请优先填写为“<span>手机号</span>”的支付宝账号。
    </div>
    <div class="btn">立即修改</div>
  </div>
</template>

<script>
export default {
  name: 'withdraw',

  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang='less' scoped>
.flex{
    display: flex;
    align-items: center;
}
.withdraw{
    padding: 60px 56px;
    .header{
       font-size:36px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:36px; 
        margin-bottom: 60px;
    }
    .name{
        font-size:26px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(5,5,5,1);
        line-height:26px;
    }
    .ints{
        background:rgba(249,248,244,1);
        border-radius:16px;
        padding: 24px 26px;
        margin-top: 16px;
        input{
            border: none;
            background:rgba(249,248,244,1);
            font-size:32px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(0,0,0,1);
            line-height:32px;
            width: 100%;
        }
    }
    .two{
        margin-top: 50px;
    }
    .text{
        font-size:26px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(80,80,80,1);
        line-height:36px;
        margin-top: 10px;
        span{
            color: #4F93F6;
        }
    }
    .btn{
        background:rgba(79,147,246,1);
        border-radius:200px; 
        text-align: center;
        height:88px;
        line-height: 88px;
        font-size:32px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
        margin-top: 60px;
    }
    .tishi{
        font-size:26px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(80,80,80,1);
        line-height:26px;
        margin: 10px 0;
        div{
            margin: 10px 0;
        }
    }
    .tishiHeader{
        margin-top: 50px;
    }
}
</style>
