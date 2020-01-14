<template>
  <div class='my'>
    <div class="header">
      <div class="header-left">
        <img class="header-img" :src="userInfo.icon" alt="">
        <div class="header-user">
          <div class="header-user-name">{{userInfo.nickname}}</div>
          <img class="header-user-dc" :src="userDec" alt="">
        </div>
      </div>
      <div class="header-right" @click="toLocation">
        <van-icon class="location" name="location" />
        <span >收货地址</span>
      </div>
    </div>
    <div class="shouyi">
      <div class="shouyi-item" @click="toEst">
        <div class="shouyi-item-num">{{memberInfo.predictOfToday}}</div>
        <div class="shouyi-item-txt">今日收益</div>
      </div>
      <div class="shouyi-item center" @click="toEst">
        <div class="shouyi-item-num">{{memberInfo.predictOfThisMonth}}</div>
        <div class="shouyi-item-txt">本月收益</div>
      </div> 
      <div class="shouyi-item" @click="toEst">
        <div class="shouyi-item-num">{{memberInfo.predictOfTotal}}</div>
        <div class="shouyi-item-txt">累计收益</div>
      </div>
    </div>
    <div class="order">
      <div class="myOrder">
        <div class="myOrder-left">我的订单</div>
        <div class="myOrder-right" @click="toMyorder('')">
          <span>全部订单</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="orderlist">
        <div class="orderlist-item" v-for="(item, index) in orderList" :key="index" @click="toMyorder(item.status)">
          <img class="orderlist-item-img" :src="item.pic" alt="">
          <div class="orderlist-item-txt">{{item.name}}</div>
          <span class="doot"></span>
        </div>
      </div>
    </div>
    <div class="moreListBox">
      <div class="moreList" v-for="(item, index) in moreList" :key="index" @click="toMore(index)">
        <img class="moreList-img" :src="item.pic" alt="">
        <div class="moreList-right">
          <div>{{item.name}}</div>
          <div class="moreList-right-txt">
            <span>{{item.dc ? memberInfo.fansCount : ''}}</span>
            <van-icon class="arrow" name="arrow" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getUserInfo} from '@/api/my'
import {memberInfo} from '@/api/member'
export default {
  name: 'my',

  data () {
    return {
      userInfo:{},
      orderList:[
        {
          name:'全部订单',
          pic:require('../../assets/images/order.png'),
          status:''
        },
        {
          name:'待付款',
          pic:require('../../assets/images/pay.png'),
          status:0
        },
        {
          name:'待发货',
          pic:require('../../assets/images/fahuo.png'),
          status:1
        },
        {
          name:'待收货',
          pic:require('../../assets/images/shou.png'),
          status:2
        },
      ],
      moreList:[
        {
          pic:require('../../assets/images/fensi.png'),
          name:'粉丝',
          dc:true
        },
        {
          pic:require('../../assets/images/kefu.png'),
          name:'客服'
        },
        {
          pic:require('../../assets/images/about.png'),
          name:'关于我们',
          dc:''
        }
      ],
      userDec:'',
      memberInfo:{}
    }
  },
  created(){
    memberInfo().then(res=>{
      console.log(res)
      this.memberInfo = res.data
    })
    getUserInfo().then(res=>{
      console.log(res)
      this.userInfo = res.data
      if(res.data.level == 0){
        this.userDec = require('../../assets/images/liren.png')
      }else if(res.data.level == 1){
        this.userDec = require('../../assets/images/yiren.png')
      }else if(res.data.level == 2){
        this.userDec = require('../../assets/images/aixin.png')
      }else if(res.data.level == 3){
        this.userDec = require('../../assets/images/lianchuang.png')
      }else if(res.data.level == 4){
        this.userDec = require('../../assets/images/lianchuang.png')
      }
    })
  },
  beforeDestroy(){
    _MEIQIA('hidePanel');
  },
  methods: {
    // 去收益
    toEst(){
      this.$router.push({
            path:"/estimate"
        })
    },
    // 去粉丝
    toFans(){
      this.$router.push({
            path:"/fans"
        })
    },
    // 更多服务
    toMore(index){
      if(index == 1){
        // window.location.href = 'https://xiaokefu.com.cn/s/11272kto0'
        _MEIQIA('showPanel');
      }else if(index == 2){
        window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU2Nzc0MzU5Mg==&scene=123#wechat_redirect'
      }else if(index == 0){
        this.toFans();
      }
    },
    // 去地理位置
    toLocation(){
        this.$router.push({
            path:"/address"
        })
    },
    // 去我的订单
    toMyorder(e){
      this.$router.push({
            path:"/orderList?status=" + e
        })
    }
  }
}
</script>

<style lang='less' scoped>
.my{
  padding-bottom: 50PX;
  background:#EEEEEE;
  min-height: 100vh;
  .header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 0 120px 0;
    background-color: #FF5164;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    &-img{
      width:120px;
      height:120px;
      border-radius:50%;
      margin: 0 33px;
      flex-shrink: 1;
    }
    &-user{
      &-name{
        font-size:34px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:600;
        color:rgba(51,51,51,1);
        line-height:48px;
      }
      &-dc{
        width: 120px;
        height: 45px;
        margin-top: 15px;
      }
    }
    &-left{
      display: flex;
      align-items: center;
      text-align: left;
    }
    &-right{
      margin-right: 20px;
      flex-shrink: 1;
      display: flex;
      align-items: center;
      border-radius:30px;
      opacity:0.49;
      border:2px solid rgba(255,255,255,1);
      padding: 16px 20px;
      color: #FFFFFF;
      .location{
        margin-top: -3px;
      }
    }
  }
  .shouyi{
    display: flex;
    align-items: center;
    padding: 34px 33px;
    justify-content: space-around;
    margin: 0 20px;
    text-align: center;
    background:rgba(255,255,255,1);
    border-radius:10px;
    margin-top: -80px;
    &-item{
      flex: 1;
      &-num{
        font-size:28px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:34px;
      }
      &-txt{
        font-size:24px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:37px;
      }
      &-img{
        width:70px;
        height:70px;
        margin-bottom: 23px;
      }
    }
    .center{
      border-right: 1px solid #EEEEEE;
      border-left: 1px solid #EEEEEE;
    }
  }
  .order{
    background-color: #FFFFFF;
    margin: 20px;
  }
  .orderlist{
    display: flex;
    align-items: center;
    justify-content: space-around;
    &-item{
      text-align: center;
      position: relative;
      &-img{
        width: 52px;
        height: 52px;
      }
      &-txt{
        font-size:20px;
        margin-top: 22px;
        margin-bottom: 30px;
      }
      .doot{
        font-size: 20px;
        padding: 0px 8px;
        border-radius: 50%;
        background-color: #FF5164;
        color: #FFFFFF;
        position: absolute;
        top: 0;
        right: 3px;
        opacity: .9;
      }
    }
  }
  .myOrder{
    display: flex;
    justify-content: space-between;
    padding: 16px 15px 20px 32px;
    &-left{
      font-size:28px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(51,51,51,1);
      line-height:50px;
    }
    &-right{
      font-size:28px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(153,153,153,1);
      line-height:45px;
      display: flex;
      align-items: center;
    }
  }
  .moreListBox{
    margin: 20px;
  }
  .moreList{
    display: flex;
    align-items: center;
    border-radius:10px;
    background-color: #FFFFFF;
    border-bottom: 1PX solid #EEEEEE;
    padding: 26px;
    &-img{
      width:42px;
      height:42px;
      border-radius:2px;
      margin-right: 26px;
    }
    &-right{
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size:28px;
      &-txt{
        display: flex;
        align-items: center;
        font-size:32px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:45px;
        .arrow{
          margin: 0 0 0 20px;
        }
      }
    }
  }
}
</style>
