<template>
  <div class='explain'>
    <div class='explain'>
       <div class='item'>
        <div class='item-header'><span>收益计算</span></div>
        <div class='item-content'><span>电影票由三方服务商提供，收益是出票后方可确认
生活服务类佣金按照界面显示计算佣金 </span></div>
       </div>
       <div class='item'>
        <div class='item-header'><span>结算时间</span></div>
        <div class='item-content'><span>电影票由三方服务商提供，收益是出票后方可确认
生活服务类佣金按照界面显示计算佣金 </span></div>
       </div>
     </div>
     <div class='explain'>
       <div class='item'>
        <div class='item-header'><span>提现方式</span></div>
        <div class='item-content'><span>支付宝</span></div>
       </div>
       <div class='item'>
        <div class='item-header'><span>提现限额</span></div>
        <div class='item-content'><span>最低限额：每次提现金额不少于10元</span></div>
       </div>
       <div class='item'>
        <div class='item-header'><span>手续费</span></div>
        <div class='item-content'><span>提现暂不收取手续费</span></div>
       </div>
     </div>
  </div>
</template>

<script>
export default {
  name: 'explain',

  data () {
    return {
        
    }
  },

  methods: {

  }
}
</script>

<style lang='less' scoped>
.explain{
    .item{
        margin: 30px;
        &-header{
            font-size:32px;
            font-weight:800;
            color:rgba(0,0,0,1);
            line-height:42px;
        }
        &-content{
            font-size:28px;
            color:rgba(102,102,102,1);
            line-height:48px;
            margin-top: 20px;
        }
    }
}
</style>
