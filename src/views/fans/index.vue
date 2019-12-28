<template>
  <div class='fans'>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="people"
        >
        <div class='people-item flex' key={index}>
            <div class='flex'>
            <img class='people-item-img' src="" />
            <div class='people-item-text'>
                <div class='people-item-text-name'><span>昵称</span></div> 
                <div class='people-item-text-time'><span>时间</span></div> 
            </div>
            </div>
            <div class='people-item-text'>
            <div class='people-item-text-count'><span>联系Ta</span></div>
            </div>
        </div>
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'fans',

  data () {
    return {
        active: 0,
        list: [],
        loading: false,
        finished: false,
        statusList:[
          {status:'',title:'今日新增'},
          {status:0,title:'授权粉丝'},
          {status:1,title:'全部粉丝'},
        ],
        pageQyery:{
          pageIndex: 1,
          pageSize: 10,
          sortDirection: "string",
          sortField: "string",
          status:0
        },
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
    //   orderList(this.pageQyery).then(res=>{
    //     console.log('订单列表',res)
    //     this.list = this.list.concat(res.list);
    //     this.loading = false;
    //     this.pageQyery.pageIndex ++ 
    //     if (this.list.length >= res.total) {
    //       this.finished = true;
    //     }
    //   })
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
.fans{
    .flex{
        display: flex;
        align-items: center;
    }
    .people{
        background-color: #ffffff;
        padding: 0 30px;
        &-item{
            padding: 34px 0;
            border-bottom: 1px solid rgba(235,238,240,.9);
            justify-content: space-between;
            &-img{
                width:92px;
                height:92px;
                background:rgba(235,235,235,1);
                border:2px solid rgba(0, 0, 0, 0.13);
                border-radius:50%;
                margin-right: 30px;
            }
            &-text{
                &-name{
                    font-size:32px;
                    font-weight:800;
                    color:rgba(0,0,0,1);
                    line-height:26px;
                }
                &-time{
                    font-size:24px;
                    font-weight:500;
                    color:rgba(102,102,102,1);
                    line-height:26px;
                    padding-top: 20px;
                }
                &-count{
                    background:rgba(255,219,41,1);
                    border-radius:60px;
                    font-size:28px;
                    color:rgba(0,0,0,1);
                    line-height:70px;
                    padding: 0 40px;
                }
            }
        }
        .noFans{
            text-align: center;
            margin-top: 30px;
        }
    }
}
</style>
