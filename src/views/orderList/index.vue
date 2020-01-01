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
                
                <div class="list-item-content flex">
                    <img class="list-img" :src="item.productPic" alt="">
                    <div class="list-right flex">
                      <div class="list-txt">
                          <div class="list-txt-top">{{item.productName}}</div>
                          <div class="guigeBox">
                            <span v-for="(items,indexs) in item.spec" :key="indexs" class="guige">{{items ? items : '默认'}}</span>
                          </div>
                      </div>
                      <div style="text-align:right;">
                        <div>¥{{item.unitPrice}}</div>
                        <div style="margin-top:20px;">X1</div>
                      </div>
                    </div>
                </div>
                <div class="heji">共{{item.qty}}件商品 合计：¥{{item.payAmount}}</div>
                <div class="list-item-header flex">
                    <div class="list-item-header-dc">{{item.status | statusFilter}}</div>
                    <!-- <div>{{item.createTime}}</div> -->
                    <span class="detail">详情</span>
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
      padding: 20px 30px;
      text-align: left;
      border-bottom: 15px solid #EEEEEE;
      background-color: #ffffff;
      &-header{
        font-size:24px;
        font-family:HYQiHei-DES,HYQiHei;
        font-weight:normal;
        color:rgba(254,51,45,1);
        line-height:30px;
        justify-content: space-between;
        margin-top: 20px;
        align-items: center;
        &-dc{
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:#FF5E45;
        }
        .detail{
          border:2px solid rgba(254,51,45,1);
          padding: 10px 30px;
        }
      }
      &-content{
          padding: 20px 0;
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
    .heji{
      text-align: right;
      font-size:28px;
      font-family:HYQiHei-DES,HYQiHei;
      font-weight:normal;
      color:rgba(51,51,51,1);
      line-height:34px;
      padding-bottom: 18px;
      border-bottom: 1PX solid #F2F2F2;
    }
    &-img{
        width:180px;
        height:180px;
        border-radius:10px;
    }
    &-right{
      background-color: #EEEEEE;
      width: 100%;
      padding: 20px;
      justify-content: space-between;
      border-radius: 10px;
    }
    &-txt{
        font-size:26px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:37px;
        width:320px;
        &-top{
          font-weight: 600;
        }
        .guigeBox{
          margin-top:14px;
          width:320px;
          font-size:24px;
        }
        .guige{
          border-radius:10px;
          border:1PX solid rgba(66,66,63,0.3);
          padding: 4px 16px;
          margin-left: 10px;
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
    }
  }
}
</style>
