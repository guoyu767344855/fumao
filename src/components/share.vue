<template>
  <div class='share' v-if="shareStatus" @click="close">
    <img src="../assets/images/sha.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'share',

  data () {
    return {
        shareStatus:true
    }
  },
  computed: {
      
  },
  methods: {
    close(){
        this.shareStatus = false
    }
  }
}
</script>

<style lang='less' scoped>
.share{
    width: 100%;
    height: 100%;
    position: absolute;
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
</style>
