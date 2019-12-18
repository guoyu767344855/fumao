<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <Footer v-if="$route.meta.footer"></Footer>
    <!-- <Share></Share> -->
  </div>
</template>
<script>
import Footer from './components/Footer'
import Share from './components/share'
  export default {
    name: 'App',
    components:{
      Footer,
      Share
    }
  }

</script>
<style>
</style>
