<template>
  <div class='orderDetail'>
    <div class="header">{{details.status | statusFilter}}</div>
    <div class="location">
        <van-icon class="location-lef" name="location" />
        <div class="location-mid">
            <div>
                <span class="location-mid-name">{{details.receiverName}}</span>
                <span>{{details.receiverPhone}}</span>
            </div>
            <div>{{details.receiverProvince}} {{details.receiverCity}} {{details.receiverRegion}} {{details.receiverDetailAddress}}</div>
        </div>
        <van-icon class="location-rig" name="arrow" />
    </div>
    <div class="goods">
        <img class="goods-img" src="../../assets/images/aa.jpg" alt="">
        <div class="goods-rig">
            <div class="goods-rig-one">{{details.productName}}</div>
            <div class="goods-rig-two">规格：默认</div>
            <div class="goods-rig-thr">¥{{details.payAmount}}</div>
        </div>
    </div>
    <div class="line">
        <div class="line-left">数量</div>
        <van-stepper v-model="value" integer :disabled="details.status == 0 ? false : true"/>
    </div>
    <div class="line">
        <div class="line-left">运费</div>
        <div class="line-txt">包邮免运费</div>
    </div>
    <div class="line">
        <div class="line-left">备注</div>
        <input class="line-txt" maxlength="20" placeholder="选填" v-model="remark" :disabled="details.status == 0 ? false : true"/>
    </div>
    <div class="line">
        <div class="line-left">总计</div>
        <div class="line-num">¥{{details.totalAmount}}</div>
    </div>
    <div class="lin"></div>
    <div>
        <div class="line">
            <div class="line-left">订单信息</div>
        </div>
        <div>
            <div class="detail">
                <div>订单编号</div>
                <div>{{details.orderSn}}</div>
                <div class="copy">复制</div>
            </div>
            <div class="detail">
                <div>创建时间</div>
                <div>{{details.createTime}}</div>
            </div>
        </div>
    </div>
    <div class="lin"></div>
    <div class="footer" v-if="details.status == 0 ? true : false">
        <div class="footer-left">
            <van-icon class="service-o" name="service-o" />
            <div>客服</div>
        </div>
        <div class="footer-center">
            <div>取消订单</div>
        </div>
        <div class="footer-right">付款</div>
    </div>
  </div>
</template>

<script>
import {orderDetail} from '@/api/order'
export default {
  name: 'orderDetail',

  data () {
    return {
        value:1,
        id:null,
        remark:'',
        details:{}
    }
  },
  created(){
    console.log(this.$route.query.id)
    if(this.$route.query.id){
        this.id = this.$route.query.id
    }
    orderDetail(this.id).then(res=>{
        console.log(res)
        this.details = res.data
    })
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
  methods: {
    // 支付
    pay(){

    }
  }
}
</script>

<style lang='less' scoped>
.orderDetail{
    padding-bottom: 80px;
    .footer{
        width: 100%;
        position: fixed;
        bottom: 0;
        height: 80px;
        display: flex;
        align-items: center;
        border:1px solid rgba(133,133,133,1);
        z-index: 10000;
        background-color: #ffffff;
        text-align: center;
        &-left{
            flex: 1;
            font-size:20px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(0,0,0,1);
            line-height:28px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .service-o{
                font-size: 40px;
            }
        }
        &-center{
            flex: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size:28px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(246,66,66,1);
            line-height:40px;
            border-radius:4px 0px 0px 4px;
            border:1PX solid rgba(247,80,80,1);
            height: 100%;
            img{
                width: 36px;
                height: 30px;
                margin-top: -5px;
            }
        }
        &-right{
            flex: 2;
            height: 100%;
            background-image: url('../../assets/images/Combined.png');
            background-size: 100%;
            font-size:28px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:40px;
            line-height: 80px;
        }
    }
    .header{
        font-size:40px;
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight:600;
        color:rgba(51,51,51,1);
        line-height:56px;
        text-align: left;
        padding-left: 50px;
    }
    .location{
        display: flex;
        align-items: center;
        border-radius:10px;
        border:1PX solid rgba(151,151,151,1);
        margin: 18px 16px;
        padding: 20px;
        &-lef{
            padding: 38px;
            font-size: 40px; 
        }
        &-mid{
            text-align: left;
            flex-shrink: 1;
            font-size:30px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(112,109,109,1);
            line-height:42px;
            &-name{
                font-size:36px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height:50px; 
                margin-right: 18px;
            }
        }
        &-rig{
            padding: 5px;
            font-size: 40px; 
            color:rgba(112,109,109,1);
        }
    }
    .goods{
        display: flex;
        align-items: center;
        margin: 40px 40px 20px 40px;
        padding: 10px;
        &-img{
            width:177px;
            height:180px;
            margin-right: 30px;
        }
        &-rig{
            text-align: left;
            &-one{
                font-size:36px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height:50px;
            }
            &-two{
                font-size:30px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(112,109,109,1);
                line-height:42px;
                margin: 10px 0;
            }
            &-thr{
                font-size:36px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(247,0,0,1);
                line-height:50px;
            }
        }
    }
    .line{
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #EEEEEE;
        padding: 25px 10px;
        margin: 0 40px;
        &-left{
            font-size:34px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(0,0,0,1);
            line-height:48px;
        }
        &-num{
            font-size:34px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(255,0,0,1);
            line-height:48px;
        }
        &-txt{
            font-size:34px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(144,143,143,1);
            line-height:48px;
            text-align: right;
            border: none;
            background-color: #ffffff;
        }
    }
    .lin{
        width: 100%;
        height: 17px;
        background-color: #EEEEEE;
    }
    .detail{
        font-size:28px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:40px;
        display: flex;
        padding-left: 50px;
        margin: 10px;
        div{
            margin-right: 30px;
        }
    }
    .copy{
        font-size:28px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(0,144,255,1);
        line-height:40px;  
    }
}
</style>
