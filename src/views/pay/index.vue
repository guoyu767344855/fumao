<template>
  <div class='pay'>
    <div class="location" @click="toLocation">
        <van-icon class="location-lef" name="location" />
        <div v-if="addressList.length != 0" class="location-mid">
            <div>
                <span class="location-mid-name">{{address.name}}</span>
                <span>{{address.phoneNumber}}</span>
            </div>
            <div>{{address.province}} {{address.city}} {{address.region}} {{address.detailAddress}}</div>
        </div>
        <div v-else class="location-mid">
            请添加收货地址
        </div>
        <van-icon class="location-rig" name="arrow" />
    </div>
    <div class="goods">
        <img class="goods-img" :src="details.pic" alt="">
        <div class="goods-rig">
            <div class="goods-rig-one">{{details.productName}}</div>
            <div class="goods-rig-two">规格：
                <span>{{details.attr}}</span>
            </div>
            <div class="goods-rig-thr">¥{{details.price}}</div>
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
        <div class="line-left">备注</div>
        <input class="line-txt" maxlength="20" placeholder="选填" v-model="remark"/>
    </div>
    <div class="footer">
        <div class="footer-center">
            <div>总计: ￥{{totalPrice}}</div>
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
export default {
  name: 'pay',

  data () {
    return {
        id:null,
        count:1,
        remark:'',
        message:'',
        details:{},
        address:{},
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
            if(this.addressId){
                this.address = this.addressList.find(item=>item.id == this.addressId)
            }else{
                this.address = this.addressList[0]
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
        createOrder(data).then(res=>{
            console.log(res)
            pay(res.data).then(res=>{
                console.log(res)
            })
        })
    },
    // 去地理位置
    toLocation(){
        this.$router.push({
            path:"/address?id=" + this.address.id
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
        border:1px solid rgba(133,133,133,1);
        z-index: 10000;
        background-color: #ffffff;
        text-align: center;
        &-center{
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size:28px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(246,66,66,1);
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
            flex-grow: 1;
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
            flex-shrink: 0;
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
        }
    }
}
</style>
