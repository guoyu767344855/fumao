<!-- home -->
<template>
  <div class="home">
    <van-swipe class="swiper" :loop="false" :width="300">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import {list,login} from '@/api/mock'
export default {
  name:'home',
  components: {
  },

  data () {
    return {
      show:false
    }
  },

  computed: {},

  mounted () {
    // console.log(process.env)
  },
  created(){
    
  },
  methods: {
    
  }
}

</script>
<style lang='less' scoped>
.home{
  .swiper{
    width:608px;
    height:291px;
    background-color: red;
  }
}
</style>
