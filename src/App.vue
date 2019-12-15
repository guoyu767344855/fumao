<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <Footer v-if="$route.meta.footer"></Footer>
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
<style>
</style>
