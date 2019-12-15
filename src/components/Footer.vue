<template>
  <div class="footer">
    <van-tabbar route v-model="active">
        <van-tabbar-item
            v-for="(item,index) in iconList"
            :key="index"
            replace
            :to="item.route"
        >
        <span>{{item.name}}</span>
        <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? item.icon.active : item.icon.inactive"
        >
        </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data(){
    return {
        active:0,
        iconList:[
            {
                name:'首页',
                route:'/',
                icon: {
                    active: require('../assets/images/home-active.png'),
                    inactive: require('../assets/images/home.png')
                }
            },
            {
                name:'商学院',
                route:'/business',
                icon: {
                    active: require('../assets/images/home-active.png'),
                    inactive: require('../assets/images/home.png')
                }
            },
            {
                name:'我的',
                route:'/my',
                icon: {
                    active: require('../assets/images/my-active.png'),
                    inactive: require('../assets/images/my.png')
                }
            }
        ],
    }
  },
  created(){
      this.iconList.forEach((item,index)=>{
          if(item.route == this.$route.path){
              this.active = index
          }
      })
  }
}
</script>

<style scoped>
</style>
