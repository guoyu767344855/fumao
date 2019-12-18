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
        <van-icon name="location" />
        <span class="header-right">收货地址</span>
      </div>
    </div>
    <div class="shouyi">
      <div class="shouyi-item">
        <div class="shouyi-item-num">{{memberInfo.predictOfToday}}</div>
        <div class="shouyi-item-txt">今日收益</div>
      </div>
      <div class="shouyi-item">
        <div class="shouyi-item-num">{{memberInfo.predictOfThisMonth}}</div>
        <div class="shouyi-item-txt">本月收益</div>
      </div>
      <div class="shouyi-item">
        <div class="shouyi-item-num">{{memberInfo.predictOfTotal}}</div>
        <div class="shouyi-item-txt">累计收益</div>
      </div>
      <div class="shouyi-item">
        <div class="shouyi-item-num">{{memberInfo.fansCount}}</div>
        <div class="shouyi-item-txt">我的粉丝</div>
      </div>
    </div>
    <div class="line"></div>
    <div class="myOrder">
      <div class="myOrder-left">我的订单</div>
      <div class="myOrder-right" @click="toMyorder('')">
        <span>全部订单</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="shouyi">
      <div class="shouyi-item" v-for="(item, index) in orderList" :key="index" @click="toMyorder(item.status)">
        <img class="shouyi-item-img" :src="item.pic" alt="">
        <div class="shouyi-item-txt">{{item.name}}</div>
      </div>
    </div>
    <div class="line"></div>
    <div class="more">更多服务</div>
    <div class="moreList" v-for="(item, index) in moreList" :key="index" @click="toMore(index)">
      <img class="moreList-img" :src="item.pic" alt="">
      <div class="moreList-right">
        <div>{{item.name}}</div>
        <div class="moreList-right-txt">
          <span>{{item.dc}}</span>
          <van-icon class="arrow" name="arrow" />
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
        {
          name:'全部订单',
          pic:require('../../assets/images/order.png'),
          status:''
        },
      ],
      moreList:[
        {
          pic:require('../../assets/images/kefu.png'),
          name:'客服'
        },
        // {
        //   pic:require('../../assets/images/bind.png'),
        //   name:'绑定手机'
        // },
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
        this.userDec = require('../../assets/images/CEO.png')
      }else if(res.data.level == 4){
        this.userDec = require('../../assets/images/lianchuang.png')
      }
    })
  },
  methods: {
    // 更多服务
    toMore(index){
      if(index == 0){
        window.location.href = 'https://xiaokefu.com.cn/s/11272kto0'
      }else if(index == 1){
        window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU2Nzc0MzU5Mg==&scene=123#wechat_redirect'
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
  .header{
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 30px 0;
    &-img{
      width:120px;
      height:120px;
      border-radius:4px;
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
      flex-shrink: 1;
      display: flex;
      align-items: center;
      font-size:34px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:48px;
      background-color: #D8D8D8;
      padding: 2px 10px;
      border-top-left-radius: 50px;
      border-bottom-left-radius: 50px;
    }
  }
  .shouyi{
    display: flex;
    align-items: center;
    padding: 0 33px;
    justify-content: space-around;
    padding: 20px 0;
    text-align: center;
    &-item{
      &-num{
        font-size:60px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:84px;
      }
      &-txt{
        font-size:26px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:37px;
      }
      &-img{
        // width:70px;
        height:70px;
        margin-bottom: 23px;
      }
    }
  }
  .line{
    height:20px;
    background:#EEEEEE;
    border:1px solid #EEEEEE;
  }
  .myOrder{
    display: flex;
    justify-content: space-between;
    padding: 16px 15px 20px 32px;
    &-left{
      font-size:36px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(51,51,51,1);
      line-height:50px;
    }
    &-right{
      font-size:32px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(153,153,153,1);
      line-height:45px;
      display: flex;
      align-items: center;
    }
  }
  .more{
    font-size:36px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:50px;
    padding: 30px 0 0px 17px;
    text-align: left;
  }
  .moreList{
    display: flex;
    align-items: center;
    padding: 0px 15px 0px 17px;
    &-img{
      width:60px;
      height:60px;
      border-radius:2px;
      margin-right: 32px;
      margin-top: -10px;
    }
    &-right{
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #EEEEEE;
      line-height: 110px;
      font-size:34px;
      &-txt{
        display: flex;
        align-items: center;
        font-size:32px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:45px;
        .arrow{
          margin: 0 30px 0 20px;
        }
      }
    }
  }
}
</style>
