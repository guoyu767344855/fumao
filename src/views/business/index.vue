<template>
  <div class='business'>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="list"
        >
        <div class="list-item" v-for="(item, index) in list" :key="index" @click="toDetail(item)">
          <div class="list-item-left">
            <div class="list-item-left-top">{{item.title}}</div>
            <div>{{item.people}}</div>
          </div>
          <img class="list-item-right" :src="item.pic" alt="">
        </div>
        </van-list>
  </div>
</template>

<script>
export default {
  name: 'business',

  data () {
    return {
      list: [
        {
          title:'科学普及-宫颈机能不全CIC与STIS感染',
          people:'113人已读',
          pic: require('../../assets/images/1.png'),
          url:'https://mp.weixin.qq.com/s/jjfI7vuxhncw74qN7BYBpw'
        },
        {
          title:'从主动tiao逗到享受愉悦这才是女人该做的。',
          people:'286人已读',
          pic:require('../../assets/images/2.png'),
          url:'https://mp.weixin.qq.com/s/lHtxjcjHEkzbWcsmRDkw2Q'
        },
        {
          title:'有办法让男人对你一直保持热情？',
          people:'445人已读',
          pic:require('../../assets/images/3.png'),
          url:'https://mp.weixin.qq.com/s/mp3p3MOW8rs-j_XGexH0sA'
        },
        {
          title:'爱情是最让人患得患失的东西',
          people:'334人已读',
          pic:require('../../assets/images/0.png'),
          url:'https://mp.weixin.qq.com/s/IaH46UExvO9lj2KPEP_FvA'
        },
        {
          title:'我们总是在危机面前，才慢慢学会成长',
          people:'299人已读',
          pic:require('../../assets/images/2.png'),
          url:'https://mp.weixin.qq.com/s/cyupnxZOM77AoQYuKW-zRQ'
        },
        {
          title:'私密健康全系解读！',
          people:'135人已读',
          pic:require('../../assets/images/1.png'),
          url:'https://mp.weixin.qq.com/s/AUidFSOhL_OliRe29j1PIQ'
        }
      ],
      loading: false,
      finished: true,
    }
  },

  methods: {
    // 去文章
    toDetail(item){
      window.location.href = item.url
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
    onLoad() {
      // setTimeout(() => {
      //   for (let i = 0; i < 5; i++) {
      //     this.list.push(this.list.length + 1);
      //   }
      //   // 加载状态结束
      //   this.loading = false;

      //   // 数据全部加载完成
      //   if (this.list.length >= 5) {
      //     this.finished = true;
      //   }
      // }, 500);
    }
  }
}
</script>

<style lang='less' scoped>
.business{
  padding-bottom: 50PX;
  .list{
    &-item{
      display: flex;
      padding: 100px 32px 20px 32px;
      border-bottom: 1px solid #EEEEEE;
      &-left{
        flex-grow: 1;
        font-size:28px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:40px;
        &-top{
          font-size:34px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(51,51,51,1);
          line-height:48px;
          margin-bottom: 25px;
        }
      }
      &-right{
        flex-shrink: 0;
        width:218px;
        height:152px;
        background:rgba(241,248,255,1);
        margin-left: 32px;
      }
    }
    &-item:nth-child(1){
      padding-top: 40px;
    }
  }
}
</style>
