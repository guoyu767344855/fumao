<!-- home -->
<template>
  <div class="home">
    <div class="canvasBox" v-if="showImg">
      <div class="close" @click="closeImg">关闭</div>
      <vue-canvas-poster :painting="painting" @success="success"></vue-canvas-poster>
      <div class="saveImg">长按图片进行保存</div>
    </div>
    <div>
      <van-swipe class="swiper" :autoplay="3000" indicator-color="white" :duration='1000'>
        <van-swipe-item class="swiper-item" v-for="(item,index) in bannerList" :key="index">
          <img class="swiper-img" :src="item" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="iconList">
      <div v-for="(item,index) in iconList" :key="index" @click="toIcon(item.route)">
        <img class="iconList-img" :src="item.pic" alt="">
        <div class="iconList-text">{{item.name}}</div>
      </div>
    </div>
    <div class="iconList iconList-two">
      <div v-for="(item,index) in iconList2" :key="index" @click="toIcon(item.route)">
        <img class="iconList-img" :src="item.pic" alt="">
        <div class="iconList-text">{{item.name}}</div>
      </div>
    </div>
    <div class="line">
      <img class="line-left" src="../../assets/images/lineLeft.png" alt="">
      <div>为你推荐</div>
      <img class="line-right" src="../../assets/images/lineRight.png" alt="">
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="list"
    >
      <div class="list-item" v-for="(item, index) in list" :key="index" @click="toDetail(item)">
        <div class="img-box">
          <img class="list-img" :src="item.pic" alt="">
          <span class="img-text">优质推荐</span>
        </div>
        <div class="list-content">
          <div class="list-content-one">
            {{item.name}}
          </div>
          <div class="list-content-two">
            {{item.subTitle}}
          </div>
          <div class="list-content-four">
            <span>¥{{item.price}}</span>
            <span class="four-right">月销{{item.sale}}{{item.unit}}</span>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { Toast } from 'vant';
import {list,getShareQrCode} from '@/api/home'
export default {
  name:'home',
  components: {
  },

  data () {
    return {
      showImg:false,
      src:'',
      // 海报
      painting:{
        width: 225,
        height: 400,
        views:[
          {
            type: 'image',
            url: require('../../assets/images/canvas.jpg'),
            left: 0,
            top: 0,
            width: 225,
            height: 400,
          },
          {
            type: 'qrcode',
            content:'http://api-test.hangim.com/wxMpAuth/index',
            background: '#fff',
            color: '#000',
            left: 89.5,
            top: 303,
            width: 60,
            height: 60,
          },
        ]
      },
      bannerList:[
        require('../../assets/images/banner.png'),
        require('../../assets/images/banner.png'),
        require('../../assets/images/banner.png'),
        require('../../assets/images/banner.png')
      ],
      iconList:[
        {
          pic:require('../../assets/images/huangjing.png'),
          name:'加入富猫',
          route:'加入富猫'
        },
        {
          pic:require('../../assets/images/huiyuan.png'),
          name:'富猫会员',
          route:'/member'
        },
        {
          pic:require('../../assets/images/chanpin.png'),
          name:'富猫产品',
          route:'/product'
        },
        {
          pic:require('../../assets/images/jiankang.png'),
          name:'健康商学院',
          route:'客服'
        },
      ],
      iconList2:[
        {
          pic:require('../../assets/images/liangxing.png'),
          name:'两性学院',
          route:'/business'
        },
        {
          pic:require('../../assets/images/shangxue.png'),
          name:'财富学院',
          route:'财富学院'
        },
        {
          pic:require('../../assets/images/meiri.png'),
          name:'每日特惠',
          route:'每日特惠'
        },
        {
          pic:require('../../assets/images/tuandui.png'),
          name:'团队',
          route:'/fans'
        },
      ],
      pageQyery:{
        pageIndex: 1,
        pageSize: 10,
        sortDirection: "string",
        sortField: "string"
      },
      list: [],
      loading: false,
      finished: false
    }
  },

  computed: {},

  mounted () {

  },
  created(){
    getShareQrCode().then(res=>{
      // console.log(res)
    })
  },
  methods: {
    // 关闭图片
    closeImg(){
      this.showImg = false;
    },
    // 生成海报
    success(src) {
      // 设置img的src
      this.src = src
      // console.log(src)
    },
    // 去icon
    toIcon(path){
      if(path == '每日特惠'){
        this.$router.push({
        path: '/goodDetail',
        query:{
          id: 40
        }
      })
      }else if(path == '加入富猫'){
        this.showImg = true
      }else if(path == '财富学院'){
        Toast('建设中')
      }else if(path == '客服'){
        window.location.href = 'https://chat-new.mqimg.com/widget/standalone.html?eid=187321'
      }else{
        this.$router.push({path})
      }
    },
    // 获取列表详情
    getList(){
      console.log(this.pageQyery.pageIndex)
      list(this.pageQyery).then(res=>{
        console.log('商品列表',res)
        this.list = this.list.concat(res.list);
        this.loading = false;
        this.pageQyery.pageIndex ++ 
        if (this.list.length >= res.total) {
          this.finished = true;
        }
      })
    },
    // 去详情
    toDetail(item){
      this.$router.push({
        path: '/goodDetail',
        query:{
          id: item.id
        }
      })
    },
    onLoad() {
      // 异步更新数据
      // setTimeout(() => {
      //   this.getList();
      // }, 500);
      this.getList();
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
    margin-bottom: 32px;
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
    font-size:24px;
    font-family:HYQiHei-DES,HYQiHei;
    font-weight:normal;
    color:rgba(51,51,51,1);
    line-height:30px;
    text-align: center;
    &-img{
      width:120px;
      height:120px;
      border-radius:40px;
      opacity:0.79;
    }
    &-text{
      margin-top: 16px;
      font-size:26px;
    }
    &-two{
      margin-top: 20px;
    }
  }
  .line{
    font-size:32px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:44px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0 0 0;
    div{
      margin: 0 10px;
    }
    &-left{
      width: 80px;
      height: 20px;
    }
    &-right{
      width: 80px;
      height: 20px;
    }
  }
  .list{
    padding: 0 33px;
    .img-box{
      position: relative;
      .img-text{
        position: absolute;
        left: 20px;
        bottom: 20px;
        background:linear-gradient(270deg,rgba(255,188,147,1) 0%,rgba(247,139,121,1) 100%);
        border-radius:20px;
        padding: 6px 12px 4px 12px;
        font-size:24px;
        font-family:HYQiHei-EES,HYQiHei;
        font-weight:normal;
        color:rgba(255,255,255,1);
        line-height:30px;
      }
    }
    &-item{
      padding: 20px 0 30px 0;
      border-bottom: 2px solid #EEEEEE;
    }
    &-img{
      width:686px;
      height:400px;
      background:rgba(255,255,255,1);
      border-radius:20px;
    }
    &-content{
      text-align: left;
      &-one{
        font-size:38px;
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight:600;
        color:rgba(25,25,25,1);
        line-height:52px;
        margin-top: 10px;
      }
      &-two{
        font-size:24px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:34px;
        margin: 10px 0;
      }
      &-four{
        font-size:36px;
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight:600;
        color:rgba(255,56,78,1);
        line-height:50px;
        display: flex;
        justify-content: space-between;
        .four-right{
          font-size:24px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(153,153,153,1);
          line-height:34px;
        }
      }
    }
  }
}
</style>
<style>
.canvasBox{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.7)
}
.canvas{
    top:-50px !important;
    right:0;
    bottom:0;
    left:0;
    margin: auto !important;
}
.saveImg{
    position: fixed;
    bottom: 0;
    line-height: 100px;
    font-size: 30px;
    width: 750px;
    background-color: aliceblue;
    text-align: center;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
   -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.close{
  position: fixed;
  top: 20px;
  right: 20px;
  color: #ffffff;
  font-size: 28px;
  z-index: 10000;
}
</style>

