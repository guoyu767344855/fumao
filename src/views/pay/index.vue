<template>
  <div class='pay'>
    <div :class="addressList.length != 0 ? 'location ':'location loca'" @click="toLocation">
        <img class="location-img" src="../../assets/images/location.png" alt="">
        <div v-if="addressList.length != 0" class="location-mid">
            <div>
                <span class="location-mid-name">{{address.name}}</span>
                <span class="location-mid-phone">{{address.phoneNumber}}</span>
            </div>
            <div>{{address.province}} {{address.city}} {{address.region}} {{address.detailAddress}}</div>
        </div>
        <div v-else class="location-mid">
            请添加收货地址
        </div>
        <van-icon class="location-rig" name="arrow" />
    </div>
    <div>
        <div class="goods">
            <img class="goods-img" :src="details.pic" alt="">
            <div class="goods-rig">
                <div style="display:flex;justify-content: space-between;margin-bottom:15px;">
                    <div class="goods-rig-one">{{details.productName}}</div>
                    <div class="goods-rig-thr">¥{{details.price}}</div>
                </div>
                <div class="goods-rig-two">
                    <span>{{details.attr}}白色</span>
                </div>
            </div>
        </div>
    </div>
    <div class="line">
        <div class="line-left">数量</div>
        <van-stepper v-model="count" integer />
    </div>
    <div class="line">
        <div class="line-left">商品金额</div>
        <div class="line-num">¥{{totalPrice}}</div>
    </div>
    <div class="line">
        <div class="line-left">运费</div>
        <div class="line-txt">包邮免运费</div>
    </div>
    <div class="line">
        <textarea class="line-remark" maxlength="20" placeholder="备注(选填)" v-model="remark"/>
    </div>
    <div class="payText">
        支付方式
    </div>
    <div class="payCheck">
        <div style="display: flex;align-items: center;">
            <img class="wechatpay" src="../../assets/images/wechatpay.png" alt="">
            <div>微信支付</div>
        </div>
        <img class="checket" src="../../assets/images/checket.png" alt="">
    </div>
    <div class="payText">
        提交订单则表示您同意《服务协议》
    </div>
    <div class="footer">
        <div class="footer-center">
            <div>
                共{{count}}件商品 需付款:
                <span style="color:#FF5E45">￥{{totalPrice}}</span>
            </div>
        </div>
        <div class="footer-right" @click="pay">立刻购买</div>
    </div>
  </div>
</template>

<script>
import {getDetail} from '@/api/pay'
import {list} from '@/api/address'
import {createOrder} from '@/api/order'
import {pay} from '@/utils/pay'
import { Toast } from 'vant';
export default {
  name: 'pay',

  data () {
    return {
        id:null,
        count:1,
        remark:'',
        message:'',
        details:{},
        address:{
            id:''
        },
        addressList:[],
        addressId:this.$store.state.app.addressId
    }
  },
  created(){
    // console.log(this.$store.state.app.addressId)
    this.id = this.$route.query.id
    this.count = this.$route.query.count
    this.getDetails()
    this.getAddress()
  },
  computed:{
      totalPrice(){
          return (this.count*this.details.price).toFixed(2)
      },
    //   addressId(){
    //       return this.$store.state.app.addressId
    //   }
  },
  watch:{
      addressId(e){
          console.log(e)
      }
  },
  methods: {
    //   获取收货地址
    getAddress(){
        list().then(res=>{
            console.log(res.data[0])
            this.addressList = res.data
            if(this.addressList.length != 0){
                if(this.addressId){
                    this.address = this.addressList.find(item=>item.id == this.addressId)
                }else{
                    this.address = this.addressList[0]
                }
            }
        })
    },
    // 获取页面数据
    getDetails(){
        getDetail(this.id).then(res=>{
            console.log(res)
            this.details = res.data
        })
    },
    // 支付
    pay(){
        let data = {
            addressId:this.address.id,
            qty:this.count,
            skuId:this.id,
            remark:this.remark
        }
        if(!this.address.id){
            Toast.fail('请选择地址')
            return
        }
        createOrder(data).then(res=>{
            console.log(res)
            pay(res.data).then(resq=>{
                console.log(resq)
                this.$router.push({
                    path:`/orderDetail?id=${res.data}&pay=true`
                })
            })
        })
    },
    // 去地理位置
    toLocation(){
        this.$router.push({
            path:"/address?id=" + this.address.id || ''
        })
    }
  }
}
</script>

<style lang='less' scoped>
.pay{
    padding-bottom: 80px;
    .footer{
        width: 100%;
        position: fixed;
        bottom: 0;
        height: 80px;
        display: flex;
        align-items: center;
        border:2px solid rgba(216,216,216,1);
        z-index: 10000;
        background-color: #ffffff;
        text-align: center;
        &-center{
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size:24px;
            font-family:HYQiHei-DES,HYQiHei;
            font-weight:normal;
            color:rgba(51,51,51,1);
            line-height:40px;
            height: 100%;
            img{
                width: 36px;
                height: 30px;
                margin-top: -5px;
            }
        }
        &-right{
            width: 280px;
            background:rgba(255,62,83,1);
            font-size:28px;
            font-family:HYQiHei-FES,HYQiHei;
            font-weight:normal;
            color:rgba(255,255,255,1);
            line-height:80px;
        }
    }
    .location{
        display: flex;
        align-items: center;
        color: #1A1A1A;
        &-img{
            width:32px;
            height:32px;
            margin-right: 18px;
            margin-left: 34px;
        }
        &-lef{
            padding: 38px;
            font-size: 40px; 
        }
        &-mid{
            text-align: left;
            flex-shrink: 1;
            flex-grow: 1;
            font-size:24px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            line-height:42px;
            padding: 20px 0;
            &-name{
                font-size:28px;
            }
            &-phone{
                font-size:28px;
            }
        }
        &-rig{
            padding: 5px;
            font-size: 40px; 
        }
    }
    .loca{
        background:linear-gradient(90deg,rgba(255,111,126,1) 0%,rgba(247,45,65,1) 100%);
        color:rgba(255,255,255,1);
    }
    .goods{
        display: flex;
        align-items: center;
        padding: 20px 40px 20px 40px;
        border-bottom: 20px solid #F2F2F2;
        border-top: 20px solid #F2F2F2;
        &-img{
            width:180px;
            height:180px;
            border-radius:10px;
        }
        &-rig{
            text-align: left;
            height:180px;
            width: 100%;
            background-color: #F2F2F2;
            border-radius:10px;
            padding: 20px;
            &-one{
                width:320px;
                font-size:28px;
                font-family:HYQiHei-EES,HYQiHei;
                font-weight:normal;
                color:rgba(34,34,34,1);
                line-height:32px;
            }
            &-two{
                span{
                    font-size:24px;
                    font-family:HYQiHei-DES,HYQiHei;
                    font-weight:normal;
                    color:rgba(51,51,51,1);
                    line-height:30px;
                    border-radius:10px;
                    border:1PX solid rgba(66,66,63,0.3);
                    margin-right: 10px;
                    padding: 6px 16px;
                }
            }
            &-thr{
                font-size:28px;
                font-family:HYQiHei-FES,HYQiHei;
                font-weight:600;
                color:rgba(51,51,51,1);
                line-height:34px;
            }
        }
    }
    .line{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 10px;
        margin: 0 40px;
        &-left{
            font-size:34px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:#333333;
            line-height:48px;
            flex-shrink: 0;
        }
        &-num{
            font-size:28px;
            font-family:LucidaGrande;
            color:rgba(51,51,51,1);
            line-height:34px;
        }
        &-txt{
            font-size:34px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(144,143,143,1);
            line-height:48px;
            text-align: right;
            border: none;
        }
        &-remark{
            width:690px;
            height:160px;
            background:rgba(242,242,242,1);
            border-radius:10px;
            font-size:34px;
            font-family:HYQiHei-DES,HYQiHei;
            font-weight:normal;
            color:rgba(153,153,153,1);
            line-height:34px;
            padding: 20px;
            border: none;
            margin-bottom: 20px;
        }
    }
    .payText{
        background-color: #F2F2F2;
        line-height: 70px;
        padding-left: 40px;
        font-size:24px;
        font-family:HYQiHei-FZS,HYQiHei;
        font-weight:normal;
        color:rgba(153,153,153,1);
    }
    .payCheck{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size:28px;
        font-family:HYQiHei-FZS,HYQiHei;
        font-weight:normal;
        color:rgba(51,51,51,1);
        line-height:34px;
        padding: 40px;
        .wechatpay{
            width: 60px;
            height: 56px;
            margin-right: 20px;
        }
        .checket{
            width:40px;
            height:40px;
        }
    }
}
</style>
