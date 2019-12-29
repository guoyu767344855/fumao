<template>
  <div class='withdraw'>
    <div class="header">提现</div>
    <!-- <div class="user flex" @click="toAliPay">
        <div class="flex">
            <img class="user-ali" src="../../assets/images/alipay.png" alt="">
            <div class="user-name">
                <div>测试小儿</div>
                <div>12345678910</div>
            </div>
        </div>
        <img class="user-rig" src="../../assets/images/right.png" alt="">
    </div> -->
    <div class="name">支付宝姓名</div>
    <div class="ints">
        <input type="text" v-model="pageQyery.alipayRealname" placeholder="请输入您的支付宝姓名">
    </div>
    <div  class="name two">支付宝账号</div>
    <div class="ints">
        <input type="text" v-model="pageQyery.alipayAccount" placeholder="请输入您的支付宝账号">
    </div>
    <div class="text">
        支付宝号格式为“<span>手机号</span>”或“<span>邮箱</span>”，若这两者您都有，请优先填写为“<span>手机号</span>”的支付宝账号。
    </div>
    <div class="money flex">
        <div>提现金额</div>
        <div class="money-text">可提现：{{amount}}元</div>
    </div>
    <div class="int flex">
        <input class="int-int" placeholder="请输入提现金额" type="number" v-model="pageQyery.amount">
        <div class="int-all" @click="all">全部</div>
    </div>
    <div class="btn" @click="apply">申请提现</div>
    <div class="tishi tishiHeader">温馨提示：</div>
    <div class="tishi">
        <div>1.满50元可随时提现，单笔不低于50元。</div>
        <div>2.每月22号后可提现上月已确认收货的订单收益。</div>
        <div>3.提现到账时间为1个工作日，节假日顺延。</div>
        <div>4.更多提现场景问题，请查阅<span style="color:#4F93F6;">《提现帮助》</span></div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import {memberWithdrawLog} from '@/api/withdraw'
export default {
  name: 'withdraw',

  data () {
    return {
        pageQyery:{
            alipayAccount:'',
            alipayRealname:'',
            amount:''
        },
        amount:0
    }
  },
  created(){
    console.log(this.$route.query.amount)
    this.amount = this.$route.query.amount
  },
  methods: {
      all(){
          this.pageQyery.amount = this.amount
      },
      toAliPay(){
          this.$router.push({
              path:'./aliPay'
          })
      },
      apply(){
          if(this.pageQyery.alipayAccount == ''){
              Toast.fail('请填写支付宝账号')
              return
          }
          else if(this.pageQyery.alipayRealname == ''){
              Toast.fail('请填写支付宝姓名')
              return
          }
          else if(this.pageQyery.amount == ''){
              Toast.fail('请输入提现金额')
              return
          }
          else if(Number(this.pageQyery.amount) > Number(this.amount)){
              Toast.fail('提现金额不能大于当前余额')
              return
          }
          memberWithdrawLog(Object.assign(this.pageQyery,{amount:Number(this.pageQyery.amount)})).then(res=>{
            if(res.code == 200){
                Toast.success('提现成功')
                this.pageQyery={
                    alipayAccount:'',
                    alipayRealname:'',
                    amount:''
                }
            }else{
                Toast.fail(res.message)
            }
          })
      }
  }
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
    .user{
        border-radius:8px;
        border:2px solid rgba(79,147,246,1);
        padding: 32px;
        justify-content: space-between;
        &-name{
            font-size:32px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(80,80,80,1);
            line-height:32px;
        }
        &-ali{
            width:80px;
            height:80px;
            margin-right: 16px;
        }
        &-rig{
            width:26px;
            height:26px;
        }
    }
    .money{
        justify-content: space-between;
        margin-top: 60px;
        font-size:26px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(5,5,5,1);
        line-height:26px;
        &-text{
            font-size:26px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:26px;
        }
    }
    .int{
        margin-top: 16px;
        background:rgba(249,248,244,1);
        border-radius:16px;
        font-size:32px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:32px;
        padding: 28px 32px;
        justify-content: space-between;
        &-int{
            border: none;
            background:rgba(249,248,244,1);
        }
        &-all{
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
