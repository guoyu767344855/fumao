<template>
  <div class='orderDetail'>
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in details.albumPicUrls" :key="index"><img class="topImg" :src="item" alt=""></van-swipe-item>
    </van-swipe>
    <div class="topName">
        <div class="topName-left">
                <div class="topName-left-name">{{details.name}}</div>
                <div class="topName-right" @click="openShare">
                    <img class="topName-right-img" src="../../assets/images/share.png" alt="">
                    <div>分享</div>
                </div>
        </div>
        <div class="topName-bot">
            <div class="topName-bot-num">
                <span>¥{{details.price}}</span>
                <span class="del">¥{{details.price}}</span>
            </div>
            <div class="topName-bot-count">
                <span>库存：{{details.stock}}</span>
                <span>销量：{{details.sale}}</span>
            </div>
        </div>
    </div>
    <div class="shouhou">
        <img src="../../assets/images/shouhou.png" alt="">
    </div>
    <!-- <div class="line"></div>
    <div class="middle">
        <div class="middle-left">规格</div>
        <div class="middle-right" @click="showPopup">
            <span>{{specification ? specification : '选择规格'}}</span>
            <van-icon name="arrow" />
        </div>
    </div>
    <div class="middle">
        <div class="middle-left">保障</div>
        <div class="middle-right">
            <span>正品保证  ｜  售后无忧</span>
        </div>
    </div>
    <div class="line"></div> -->
    <div class="bottom">
        <div class="bottom-title">商品详情</div>
        <div class="detailHtml" v-html="details.detailHtml"></div>
    </div>
    <div class="footer" v-if="!show">
        <div class="footer-left">
            <van-icon class="service-o" name="service-o" />
            <div @click="kefu">客服</div>
        </div>
        <div class="footer-center" @click="openShare">
            <img src="../../assets/images/Shape.png" alt="">
            <div>赚￥{{details.commission | levelCount}}</div>
        </div>
        <div class="footer-right" @click="showPopup">立刻购买</div>
    </div>
    <van-sku
        class="sku"
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
        @sku-selected="skuSelected"
        @stepper-change="stepperChange"
        >
        <!-- 自定义 sku actions -->
        <template slot="sku-actions" slot-scope="props">
           <div class="footer">
                <div class="footer-left">
                    <van-icon class="service-o" name="service-o" />
                    <div @click="kefu">客服</div>
                </div>
                <div class="footer-center" @click="openShare">
                    <img src="../../assets/images/Shape.png" alt="">
                    <div>赚￥{{details.commission | levelCount}}</div>
                </div>
                <div class="footer-right" @click="props.skuEventBus.$emit('sku:buy')">立刻购买</div>
            </div>
        </template>
        </van-sku>
        <!-- 分享 -->
        <div class='share' v-if="shareStatus" @click="closeShare">
            <img src="../../assets/images/sha.png" alt="">
        </div>
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
        quota:0,
        quotaUsed:2,
        unitPrice:0,
        totalPrice:0.00,
        details:{},
        sku: {},
        goods: {},
        messageConfig: {},
        specification:'',
        shareStatus:false
    }
  },
  computed:{
  },
  filters:{
      levelCount(e){
          let level = localStorage.getItem('level')
          if(level == 0){
              return e = e*0
          }else if(level == 1){
              return e = e*0.5
          }else if(level == 2){
              return e = e*0.72
          }else if(level == 3){
              return e = e*0.76
          }else{
              return e
          }
      }
  },
  created(){
    this.getDetail(this.$route.query.id)
  },
  methods: {
    // 打开分享
    openShare(){
        this.shareStatus = true
    },
    //   关闭分享
    closeShare(){
        this.shareStatus = false
    },
    //   客服
    kefu(){
        window.location.href = 'https://xiaokefu.com.cn/s/11272kto0'
    },
    // 选择规格
    skuSelected(e){
        console.log(e)
        if(e.selectedSkuComb){
            this.unitPrice = e.selectedSkuComb.price
            this.totalPrice = (e.selectedSkuComb.price*this.value/100).toFixed(2)
        }
        if(e.selectedSkuComb){
            for(var name in e.selectedSkuComb){
                if(/.*[\u4e00-\u9fa5]+.*/.test(name)){
                    console.log(name)
                    this.specification += name+": "+ e.selectedSkuComb[name]+"\r\n ";
                }
            }
        }else{
            this.specification = ''
        }
    },
    // 选择数量
    stepperChange(e){
        console.log(e)
        this.value = e
        this.totalPrice = this.unitPrice*e/100
    },
    // 立即购买
    onBuyClicked(skuData){
        // console.log(skuData.selectedSkuComb.id)
        this.$router.push({
            path:`pay`,
            query:{
                id:skuData.selectedSkuComb.id,
                count:this.value
            }
        })
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
            document.title = res.data.subTitle
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
        z-index: 10000;
        background-color: #ffffff;
        text-align: center;
        &-left{
            flex: 1;
            font-size:24px;
            font-family:HYQiHei-DES,HYQiHei;
            font-weight:normal;
            color:rgba(51,51,51,1);
            line-height:30px;
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
            font-family:HYQiHei-FES,HYQiHei;
            font-weight:normal;
            color:rgba(51,51,51,1);
            line-height:34px;
            background:rgba(254,232,88,1);
            height: 100%;
            img{
                width: 36px;
                height: 36px;
                margin-top: -5px;
            }
        }
        &-right{
            flex: 2;
            height: 100%;
            background:rgba(255,62,83,1);
            font-size:28px;
            font-family:HYQiHei-FES,HYQiHei;
            font-weight:normal;
            color:rgba(255,255,255,1);
            line-height:80px;
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
        width:750px;
        height:750px;
    }
    .topName{
        padding: 15px 25px;
        &-left{
            text-align: left;
            display: flex;
            justify-content: space-between;
            &-name{
                width:600px;
                font-size:32px;
                font-family:HYQiHei-FES,HYQiHei;
                font-weight:normal;
                color:rgba(0,0,0,1);
                line-height:40px;
            }
        }
        &-right{
            font-size:16px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(255,62,83,1);
            line-height:22px;
            border-left: 1PX dotted #D8D8D8;
            padding-left: 20px;
            &-img{
                width:38px;
                height:38px;
                margin-bottom: 10px;
            }
        }
        &-bot{
            display: flex;
            justify-content: space-between;
            align-items: center;
            &-num{
                font-size:36px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(247,0,0,1);
                line-height:50px;
                margin: 10px 0; 
                .del{
                    font-size:28px;
                    font-family:HYQiHei-DES,HYQiHei;
                    font-weight:normal;
                    color:rgba(153,153,153,1);
                    line-height:34px;
                    text-decoration:line-through;
                }
            }
            &-count{
                font-size:24px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(153,153,153,1);
                line-height:34px;
            }
        }
    }
    .shouhou{
        width:750px;
        height:80px;
        background:rgba(248,248,248,1);
        img{
          width: 656px;
          height: 32px; 
          margin: 24px 32px;
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
        font-size:24px;
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
        width: 750px;
        &-title{
            font-size:28px;
            font-family:HYQiHei-GEW,HYQiHei;
            font-weight:normal;
            color:rgba(0,0,0,1);
            line-height:34px;
            text-align: center;
            margin: 20px;
        }
    }
    .sku{
        color: black !;
    }
    .share{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 1000000;
        img{
        position: absolute;
        top: 0;
        right: 0;
        width: 550px;
        }
    }
}
</style>
<style>
.detailHtml{
    width: 750px;
}
.detailHtml img{
    width: 100%;
}
</style>
