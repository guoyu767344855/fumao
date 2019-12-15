<template>
  <div class='articleList'>
    <div v-if="list.length == 0" class="noList">暂无订单~</div>
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="list"
        >
        <div class="list-item" v-for="(item, index) in list" :key="index" @click="toDetail(item)">
            <div class="list-item-header flex">
                <div>2019-10-10 12:00:00</div>
                <div class="list-item-header-dc">待付款</div>
            </div>
            <div class="list-item-content flex">
                <div class="flex">
                    <img class="list-img" src="../../assets/images/aa.jpg" alt="">
                    <div class="list-txt">
                        <div class="list-txt-top">伊水一方H2O2水净清</div>
                        <div style="margin-top:20px;">X1</div>
                    </div>
                </div>
                <div class="list-count"><span>支付金额：</span><span class="money">¥399</span></div>
            </div>
            <div class="list-item-footer">
                <span>详情</span>
            </div>
        </div>
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'articleList',

  data () {
    return {
        list: [],
        loading: false,
        finished: false
    }
  },

  methods: {
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
    },
  }
}
</script>

<style lang='less' scoped>
.articleList{
    .list{
    &-item{
      padding: 30px 33px 5px 30px;
      text-align: left;
      margin-bottom: 15px;
      background-color: #ffffff;
      &-header{
        font-size:20px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:28px;
        &-dc{
            font-size:20px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(243,5,5,1);
            line-height:28px;
        }
      }
      &-content{
          padding: 20px 0;
          border-bottom: 1px solid #DFDBDB;
      }
      &-footer{
        text-align: right;
        margin: 20px 0;
        span{
            border-radius:10px;
            border:1PX solid rgba(151,151,151,1);
            font-size:20px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(151,151,151,1);
            line-height:28px;
            padding: 4px 20px 5px 20px;
        }
      }
    }
    &-img{
        width:118px;
        height:120px;
        margin-right: 15px;
    }
    &-txt{
        font-size:26px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:37px;
        &-top{
          font-weight: 600;
        }
    }
    &-count{
        align-self:flex-end;
        font-size:20px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:28px;
        .money{
            color: #F70707;
        }
    }
    .flex{
        display: flex;
        justify-content: space-between;
    }
  }
  .noList{
      line-height: 100vh;
  }
}
</style>
