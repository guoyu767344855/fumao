<template>
  <div class='orderDetail'>
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in details.albumPicUrls" :key="index"><img class="topImg" :src="item" alt=""></van-swipe-item>
    </van-swipe>
    <div class="topName">
        <div class="topName-left">
            <div class="topName-left-name">{{details.name}}</div>
            <div class="topName-left-num">¥{{details.price}}</div>
            <div class="topName-left-count">
                <span>库存：{{details.stock}}</span>
                <span>销量：{{details.sale}}</span>
            </div>
        </div>
        <div class="topName-right">
            <img class="topName-right-img" src="../../assets/images/share.png" alt="">
            <div>分享</div>
        </div>
    </div>
    <div class="line"></div>
    <div class="middle">
        <div class="middle-left">规格</div>
        <div class="middle-right">
            <span>选择规格</span>
            <van-icon name="arrow" />
        </div>
    </div>
    <div class="middle">
        <div class="middle-left">保障</div>
        <div class="middle-right">
            <span>正品保证  ｜  售后无忧</span>
        </div>
    </div>
    <div class="line"></div>
    <div class="bottom">
        <div class="bottom-title">商品详情</div>
        <div class="detailHtml" v-html="details.detailHtml"></div>
    </div>
    <div class="footer" v-if="!show">
        <div class="footer-left">
            <van-icon class="service-o" name="service-o" />
            <div>客服</div>
        </div>
        <div class="footer-center">
            <img src="../../assets/images/Shape.png" alt="">
            <div>赚￥4.25</div>
        </div>
        <div class="footer-right" @click="showPopup">立刻购买</div>
    </div>
    <van-sku
        v-model="show"
        stepper-title="数量"
        :sku="sku"
        :goods="goods"
        :goods-id="goodsId"
        :quota="quota"
        :quota-used="quotaUsed"
        :hide-stock="sku.hide_stock"
        show-add-cart-btn
        reset-stepper-on-hide
        close-on-click-overlay
        safe-area-inset-bottom
        @buy-clicked="onBuyClicked"
        @add-cart="onAddCartClicked"
        >
        <!-- 自定义 sku actions -->
        <template slot="sku-actions" slot-scope="props">
           <div class="footer">
                <div class="footer-left">
                    <van-icon class="service-o" name="service-o" />
                    <div>客服</div>
                </div>
                <div class="footer-center">
                    <img src="../../assets/images/Shape.png" alt="">
                    <div>赚￥4.25</div>
                </div>
                <div class="footer-right" @click="props.skuEventBus.$emit('sku:buy')">立刻购买</div>
            </div>
        </template>
        </van-sku>
  </div>
</template>

<script>
import { getDetail } from '@/api/goodDetail'
export default {
  name: 'orderDetail',

  data () {
    return {
        show: false,
        value:1,
        choseIndex:0,
        goodsId:26,
        quota:1,
        quotaUsed:2,
        details:{},
        sku: {},
        goods: {},
        messageConfig: {}
    }
  },
  created(){
    console.log(this.$route.query.id)
    this.getDetail(this.$route.query.id)
  },
  methods: {
      onBuyClicked(e){
          console.log(e)
          this.$router.push({
              path:`/pay?id=${e.selectedSkuComb.id}`
          })
      },
      onAddCartClicked(){

      },
    //   获取商品信息
    getDetail(id){
        getDetail(id).then(res=>{
            console.log(res.data)
            this.details = res.data
            this.sku = res.data.sku
            this.goods = {
                title:res.data.subTitle,
                picture:res.data.pic
            }
        })
    },
    showPopup() {
      if(!this.show){
          this.show = true;
      }else{
        this.$router.push({
            path: '/pay',
            query:{
            id:''
            }
        })
      }
    },
    chose(i){
        this.choseIndex = i
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
    .popup{
        border-top: 1px solid #979797;
        padding:26px 40px 80px 38px;
        box-sizing: border-box;
        &-top{
            display: flex;
            align-items: center;
            &-img{
                width:177px;
                height:180px;
                margin-right: 60px;
            }
            &-right{
                text-align: left;
            }
            &-one{
                font-size:36px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(247,0,0,1);
                line-height:50px;
            }
            &-two{
                font-size:20px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(0,0,0,1);
                line-height:28px;
                margin: 10px 0;
            }
            &-three{
                font-size:30px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height:42px;
            }
        }
        &-middle{
            text-align: left;
            &-line{
                font-size:30px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height:42px;
                margin: 25px 0;
            }
            &-txt{
                border-radius:10px;
                border:1px solid rgba(151,151,151,1);
                padding: 1px 22px;
                font-size:30px;
                line-height:42px;
                margin-right: 20px;
            }
            &-ontxt{
                background:rgba(228,53,53,1);
                color: #ffffff;
                border-radius:10px;
                border:1px solid rgba(151,151,151,1);
                padding: 1px 22px;
                font-size:30px;
                line-height:42px;
                margin-right: 20px;
            }
        }
        .bottom{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
    .topImg{
        width:100%;
        height:762px;
    }
    .topName{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px 25px;
        &-left{
            text-align: left;
            &-name{
               font-size:36px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height:50px; 
            }
            &-num{
                font-size:36px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(247,0,0,1);
                line-height:50px;
                margin: 10px 0; 
            }
            &-count{
                font-size:20px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(0,0,0,1);
                line-height:28px;
            }
        }
        &-right{
            font-size:20px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(0,0,0,1);
            line-height:28px;
            &-img{
                width:38px;
                height:38px;
                margin-bottom: 10px;
            }
        }
    }
    .line{
        width:100%;
        height:10px;
        background:rgba(238,238,238,1);
    }
    .middle{
        display: flex;
        align-items: center;
        margin: 25px;
        font-size:20px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:28px;
        &-left{
            margin-right: 40px;
        }
        &-right{
            display: flex;
            align-items: center;
            span{
                color:rgba(121,106,106,1);
                margin-right: 10px;
            }
        }
    }
    .bottom{
        &-title{
            font-size:36px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(0,0,0,1);
            line-height:50px;
            text-align: left;
            margin: 25px;
        }
        .detailHtml{
            width: 750px;
        }
    }
}
</style>
