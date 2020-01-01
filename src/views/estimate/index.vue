<template>
  <div class='estimate'>
    <div class='header'>
        <div class='header-top flex'>
            <div>可提现<span class='header-top-money'>{{memberInfo.balance}}</span>元</div>
            <div class='towithdraw flex' @click="toWithdraw"><span>去提现</span><img class='header-top-img' src="" /></div>
        </div>
        <div class='header-bottom flex'>
            <div class='header-bottom-item Left'>
            <div class='header-bottom-item-money'><span>{{memberInfo.predictOfToday}}</span></div>
            <div class='header-bottom-item-text'><span>今日收益(元)</span></div>
            </div>
            <div class='header-bottom-item middle'>
            <div class='header-bottom-item-money'><span>{{memberInfo.predictOfTotal}}</span></div>
            <div class='header-bottom-item-text'><span>累计收益(元)</span></div>
            </div>
            <span class='header-bottom-item'>
            <div class='header-bottom-item-money'><span>{{memberInfo.balance}}</span></div>
            <span class='header-bottom-item-text'><span>账户余额(元)</span></span>
            </span>
        </div>
    </div>
    <div class='earnings flex'>
        <span>收益明细</span>
        <div class='earnings-text flex'>
            <span>结算说明</span><img class='earnings-img' src='' />
        </div>
    </div>
    <div class='chosetime flex'>
        <div class='chosetime-time flex'>
            <div class='flex' @click="select">
              <span class=''>{{date}}</span>
              <img class='chosetime-img' src='' />
            </div>
        </div>
        <div class='chosetime-text'>
          <!-- <span>本月累计收益：0元</span> -->
        </div>
    </div>
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
    <!-- <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    class="people"
    > -->
    <div class="people">
        <div class='people-item' v-for="(item, index) in list" :key="index">
            <div class="flex" style="padding-bottom:10px;justify-content: space-between;align-items: flex-start;">
                <div class='flex' style="align-items: flex-start;">
                    <img class='people-item-img' :src="item.productImageUrl" />
                    <div class='people-item-text'>
                        <div class='people-item-text-name'><span>{{item.orderUserName}}</span></div> 
                        <div class='people-item-text-money'><span>支付金额：¥{{item.orderAmount}}元</span></div>
                        <div class='people-item-text-time'><span>{{item.createTime}}</span></div>
                    </div>
                </div>
                <div class='people-item-text' style="text-align:right;">
                    <div class='people-item-text-count'><span>{{item.settled ? '已结算':'未结算'}}</span></div> 
                    <div class='people-item-text-status'><span>收益 ¥{{item.amount}}</span></div> 
                </div>
            </div>
            <div class="useritem flex">
                <img class="headerimg" :src="item.orderUserHeadImgUrl" alt="">
                <span>{{item.userName}}</span>
            </div>
        </div>
        <div class="people-item" style="text-align:center;" v-if="list.length == 0">暂无</div>
    </div>
    <!-- </van-list> -->
  </div>
</template>

<script>
import { orderList } from '@/api/estimate'
import {memberInfo} from '@/api/member'
export default {
  name: 'estimate',

  data () {
    return {
        pageQyery:{
          timeType:15
        },
        list: [],
        loading: false,
        finished: false,
        money:0,
        show: false,
        actions: [
            { name: '本月', value:15 },
            { name: '上月', value:14 },
            { name: '昨天', value:4 },
            { name: '今天', value:5 }
        ],
        memberInfo:{},
        date:'本月'
    }
  },
  created(){
    memberInfo().then(res=>{
      console.log(res)
      this.memberInfo = res.data
    })
    this.getList()
  },
  methods: {
    // 去提现
    toWithdraw(){
        this.$router.push({
            path:'/withdraw?amount=' + this.memberInfo.balance
        })
    },
    select(){
        this.show = true;
    },
    onSelect(item) {
        // 默认情况下，点击选项时不会自动关闭菜单
        // 可以通过 close-on-click-action 属性开启自动关闭
        this.show = false;
        console.log(item)
        this.date = item.name
        this.pageQyery.timeType = item.value
        this.getList()
    },
    getList(){
        orderList(this.pageQyery).then(res=>{
            console.log('订单列表',res)
            this.list = res.data.settles;
        })
    },
    onLoad() {
        // 异步更新数据
    },
  }
}
</script>

<style lang='less' scoped>
.estimate{
    background-color: #F5F5F5;
    min-height: 100%;
    .flex{
        display: flex;
        align-items: center;
    }
    .header{
        background-color: #FF5164;
        padding: 0 25px;
        &-top{
            justify-content: space-between;
            font-size:32px;
            font-weight:bold;
            color:rgba(0,0,0,1);
            line-height:26px;
            padding: 40px 0;
            border-bottom: 1px solid rgba(0,0,0,.1);
            &-money{
                font-family:DINOT;
                font-size: 36px;
            }
            &-img{
                width:6px;
                height:11px;
                margin-left: 8px;
            }
            .towithdraw{
                background:rgba(255,255,255,1);
                border-radius:24px;
                font-size:24px;
                color:rgba(1,1,1,1);
                line-height:26px;
                padding: 10px 15px;
            }
        }
        &-bottom{
            justify-content: space-between;
            padding: 40px 0;
            &-item{
                flex: 1;
                text-align: center;
                &-money{
                    font-size:42px;
                    font-family:DINOT;
                    font-weight:bold;
                    color:rgba(0,0,0,1);
                    padding-bottom: 22px;
                }
                &-text{
                    font-size:26px;
                    font-family:PingFang SC;
                    font-weight:500;
                    color:rgba(0,0,0,1);
                    line-height:26px;
                }
            }
            .middle{
                border-left: 1px solid rgba(0,0,0,.1);
                border-right: 1px solid rgba(0,0,0,.1);
            }
            .Left{
                border-left: 1px solid rgba(0,0,0,.1);
            }
        }
    }
    .earnings{
        font-size:32px;
        font-weight:bold;
        color:rgba(0,0,0,1);
        line-height:26px;
        justify-content: space-between;
        padding: 50px 25px;
        background-color: #ffffff;
        &-text{
            font-size:28px;
            color:rgba(100,166,255,1); 
        }
        &-img{
            width:28px;
            height:28px; 
            margin-left: 10px;
        }
    }
    .chosetime{
        padding: 15px 30px;
        justify-content: space-between;
        background-color: rgba(245,245,245,1);
        &-time{
            background:rgba(255,255,255,1);
            border-radius:60px; 
            padding: 16px 25px;
            font-size:28px;
            color:rgba(0,0,0,1);
            line-height:26px; 
        }
        &-img{
            width:8px;
            height:6px;
            margin-left: 20px;
            line-height: 0;
        }
        &-text{
            font-size:28px;
            color:rgba(102,102,102,1);
            line-height:26px;
        }
    }
    .people{
        background-color: #ffffff;
        padding: 0 30px;
        &-item{
            padding: 34px 0 0px 0;
            border-bottom: 1px solid rgba(235,238,240,.9);
            justify-content: space-between;
            .headerimg{
                width:30px;
                height:30px;
                border-radius: 50%;
                margin-right: 15px;
            }
            .useritem{
                padding: 20px 0;
                border-top: 2px solid #EEEEEE;
            }
            &-img{
                width:118px;
                height:120px;
                background:rgba(235,235,235,1);
                margin-right: 30px;
            }
            &-text{
                &-name{
                    font-size:26px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    line-height:36px;
                }
                &-money{
                    font-size:20px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    line-height:36px;
                    margin-bottom: 15px;
                }
                &-time{
                    font-size:20px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    line-height:28px;
                }
                &-count{
                    font-size:20px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(0,144,255,1);
                    line-height:28px;
                    padding-bottom: 22px;
                }
                &-status{
                    font-size:20px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(239,10,10,1);
                    line-height:28px;
                }
            }
        }
        .nopeople{
            text-align: center;
            color: #666;
            padding-top: 60px;
            font-size: 30px;
        }
    }
}
</style>
