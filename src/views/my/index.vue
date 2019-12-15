<template>
  <div class='my'>
    <div class="header">
      <div class="header-left">
        <img class="header-img" src="../../assets/images/aa.jpg" alt="">
        <div class="header-user">
          <div class="header-user-name">{{userInfo.username}}</div>
          <div class="header-user-dc">用户描述描述描述</div>
        </div>
      </div>
      <div class="header-right" @click="toLocation">
        <van-icon name="location" />
        <span class="header-right">收货地址</span>
      </div>
    </div>
    <div class="shouyi">
      <div class="shouyi-item">
        <div class="shouyi-item-num">15</div>
        <div class="shouyi-item-txt">今日收益</div>
      </div>
      <div class="shouyi-item">
        <div class="shouyi-item-num">15</div>
        <div class="shouyi-item-txt">今日收益</div>
      </div>
      <div class="shouyi-item">
        <div class="shouyi-item-num">15</div>
        <div class="shouyi-item-txt">今日收益</div>
      </div>
      <div class="shouyi-item">
        <div class="shouyi-item-num">15</div>
        <div class="shouyi-item-txt">今日收益</div>
      </div>
    </div>
    <div class="line"></div>
    <div class="myOrder">
      <div class="myOrder-left">我的订单</div>
      <div class="myOrder-right" @click="toMyorder">
        <span>全部订单</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="shouyi">
      <div class="shouyi-item" v-for="(item, index) in 4" :key="index">
        <img class="shouyi-item-img" src="../../assets/images/my.png" alt="">
        <div class="shouyi-item-txt">待付款</div>
      </div>
    </div>
    <div class="line"></div>
    <div class="more">更多服务</div>
    <div class="moreList" v-for="(item, index) in moreList" :key="index">
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
export default {
  name: 'my',

  data () {
    return {
      userInfo:{},
      moreList:[
        {
          pic:'',
          name:'客服'
        },
        {
          pic:'',
          name:'联系我们'
        },
        {
          pic:'',
          name:'绑定手机'
        },
        {
          pic:'',
          name:'绑定手机',
          dc:'描述文字'
        }
      ]
    }
  },
  created(){
    getUserInfo().then(res=>{
      console.log(res)
      this.userInfo = res.data
    })
  },
  methods: {
    // 去地理位置
    toLocation(){
        this.$router.push({
            path:"/location"
        })
    },
    // 去我的订单
    toMyorder(){
      this.$router.push({
            path:"/orderList"
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
        font-size:28px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:40px;
      }
    }
    &-left{
      display: flex;
      align-items: center;
      text-align: left;
    }
    &-right{
      display: flex;
      align-items: center;
      font-size:34px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:48px;
      background-color: #D8D8D8;
      padding: 2px 0;
      padding-left: 10px;
      border:1px solid #979797;
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
        width:70px;
        height:70px;
        margin-bottom: 23px;
      }
    }
  }
  .line{
    height:20px;
    background:rgba(216,216,216,1);
    border:1px solid rgba(151,151,151,1);
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
      background:rgba(221,221,221,1);
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
