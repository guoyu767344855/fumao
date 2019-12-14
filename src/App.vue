<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from './components/Footer'
  export default {
    name: 'App',
    components:{
      Footer
    }
  }

</script>
<style lang='scss'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
  background-color: #FFFFFF;
}
</style>
