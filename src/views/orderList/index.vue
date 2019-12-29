<template>
  <div class='orderList'>
    <van-tabs v-model="active" sticky  @click="chooseStatus">
        <van-tab v-for="(item,index) in statusList" :key="index" :title="item.title">
            <!-- <div v-if="list.length == 0" class="noList">暂无订单~</div> -->
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            class="list"
            >
            <div class="list-item" v-for="(item, index) in list" :key="index" @click="toDetail(item)">
                <div class="list-item-header flex">
                    <div>{{item.createTime}}</div>
                    <div class="list-item-header-dc">{{item.status | statusFilter}}</div>
                </div>
                <div class="list-item-content flex">
                    <div class="flex">
                        <img class="list-img" :src="item.productPic" alt="">
                        <div class="list-txt">
                            <div class="list-txt-top">{{item.productName}}</div>
                            <div style="margin-top:20px;">X1</div>
                        </div>
                    </div>
                    <div class="list-count"><span>支付金额：</span><span class="money">¥{{item.payAmount}}</span></div>
                </div>
                <div class="list-item-footer">
                    <span>详情</span>
                </div>
            </div>
            </van-list>
        </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {orderList} from '@/api/order'
export default {
  name: 'orderList',

  data () {
    return {
        active: 0,
        list: [],
        loading: false,
        finished: false,
        statusList:[
          {status:'',title:'全部订单'},
          {status:0,title:'待付款'},
          {status:1,title:'待发货'},
          {status:2,title:'已发货'},
          {status:3,title:'已完成'},
          {status:4,title:'已关闭'},
          {status:5,title:'无效订单'},
        ],
        pageQyery:{
          pageIndex: 1,
          pageSize: 10,
          sortDirection: "string",
          sortField: "string",
          status:''
        },
    }
  },
  filters:{
    statusFilter(e){
      if(e==0){
        return '待付款'
      }else if(e==1){
        return '待发货'
      }else if(e==2){
        return '已发货'
      }else if(e==3){
        return '已完成'
      }else if(e==4){
        return '已关闭'
      }else if(e==5){
        return '无效订单'
      }
    }
  },
  created(){
    if(this.$route.query.status){
      console.log('状态',this.$route.query.status)
      this.pageQyery.status = this.$route.query.status
      this.active = this.$route.query.status ? Number(this.$route.query.status)+1 : 0
      console.log('active',this.active)
    }
  },
  methods: {
    // 选择订单状态
    chooseStatus(e){
      // console.log(e)
      this.list = []
      this.finished = false
      this.pageQyery = {
          pageIndex: 1,
          pageSize: 10,
          sortDirection: "string",
          sortField: "string",
          status:e == 0 ? '' : e-1
      }
      this.onLoad()
    },
    // 获取列表详情
    getList(){
      console.log(this.pageQyery.pageIndex)
      orderList(this.pageQyery).then(res=>{
        console.log('订单列表',res)
        this.list = this.list.concat(res.list);
        this.loading = false;
        this.pageQyery.pageIndex ++ 
        if (this.list.length >= res.total) {
          this.finished = true;
        }
      })
    },
    onLoad() {
      this.getList();
    },
    toDetail(item){
        this.$router.push({
            path:"/orderDetail?id="+item.id
        })
    }
  }
}
</script>

<style lang='less' scoped>
.orderList{
    .list{
    &-item{
      padding: 30px 33px 5px 30px;
      text-align: left;
      border-bottom: 15px solid #EEEEEE;
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
}
</style>
