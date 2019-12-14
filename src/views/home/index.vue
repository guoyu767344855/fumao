<!-- home -->
<template>
  <div class="home">
    <div>
      <van-swipe class="swiper" :autoplay="3000" indicator-color="white">
        <van-swipe-item class="swiper-item" v-for="(item,index) in bannerList" :key="index">
          <img class="swiper-img" :src="item" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="iconList">
      <div v-for="(item,index) in iconList" :key="index">
        <img class="iconList-img" :src="item.pic" alt="">
        <div class="iconList-text">{{item.name}}</div>
      </div>
    </div>
    <div class="line">
      为你推荐
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="list"
    >
      <div class="list-item" v-for="(item, index) in list" :key="index" @click="toDetail(item)">
        <img class="list-img" src="../../assets/images/aa.jpg" alt="">
        <div class="list-content">
          <div class="list-content-one">
            欧舒丹甜蜜樱花沐浴啫喱/身体乳套装
          </div>
          <div class="list-content-two">
            法国品牌 | 过敏包退 | 官方直售
          </div>
          <div class="list-content-three">
            <span class="youzhi">优选推荐</span>
            <span>月销20111件</span>
          </div>
          <div class="list-content-four">
            ¥378
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import {list,login} from '@/api/mock'
export default {
  name:'home',
  components: {
  },

  data () {
    return {
      bannerList:[
        require('../../assets/images/aa.jpg'),
        require('../../assets/images/aa.jpg'),
        require('../../assets/images/aa.jpg'),
        require('../../assets/images/aa.jpg')
      ],
      iconList:[
        {
          pic:require('../../assets/images/aa.jpg'),
          name:'会员中心'
        },
        {
          pic:require('../../assets/images/aa.jpg'),
          name:'黄精文化'
        },
        {
          pic:require('../../assets/images/aa.jpg'),
          name:'产品中心'
        },
        {
          pic:require('../../assets/images/aa.jpg'),
          name:'商学院'
        },
      ],
      list: [],
      loading: false,
      finished: false
    }
  },

  computed: {},

  mounted () {
    // console.log(process.env)
  },
  created(){
    
  },
  methods: {
    // 去详情
    toDetail(){
      this.$router.push({
        path: '/goodDetail',
        query:{
          id:''
        }
      })
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 80) {
          this.finished = true;
        }
      }, 500);
    }
  }
}

</script>
<style lang='less' scoped>
.home{
  padding-bottom: 50PX;
  .swiper{
    width:750px;
    height:291px;
    margin: 20px auto;
    &-item{
      padding: 0 30px;
    }
    &-img{
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .iconList{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 33px;
    &-img{
      width:94px;
      height:94px;
      background:rgba(216,216,216,1);
      border-radius:40px;
      opacity:0.79;
    }
    &-text{
      margin-top: 16px;
      font-size:26px;
    }
  }
  .line{
    font-size:36px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:50px;
    text-align: left;
    padding: 33px 33px 0 33px;
  }
  .list{
    padding: 0 33px;
    &-item{
      display: flex;
      padding: 30px 0;
      border-bottom: 2px solid #EEEEEE;
    }
    &-img{
      width:200px;
      height:200px;
      background:rgba(241,248,255,1);
      border-radius:2px;
    }
    &-content{
      text-align: left;
      padding-left: 32px;
      &-one{
        font-size:34px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:600;
        color:rgba(51,51,51,1);
        line-height:48px;
      }
      &-two{
        font-size:24px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:33px;
        margin: 10px 0;
      }
      &-three{
        font-size:24px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:33px;
        margin: 20px 0;
        .youzhi{
          font-size:24px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(232,84,30,1);
          line-height:33px;
          background:rgba(233,90,39,.1);
          border-radius:2px;
          padding: 3px 8px;
        }
      }
      &-four{
        font-size:40px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:600;
        color:rgba(255,59,48,1);
        line-height:56px;
      }
    }
  }
}
</style>
