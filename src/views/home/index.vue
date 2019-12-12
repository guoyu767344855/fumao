<!-- home -->
<template>
  <div>
    <h1>home</h1>
    <van-button type="primary">主要按钮</van-button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <van-button @touchstart.stop="show = true">
      弹出默认键盘
    </van-button>
    <van-number-keyboard
      safe-area-inset-bottom
      :show="show"
      extra-key="."
      close-button-text="完成"
      @blur="show = false"
      @input="onInput"
      @delete="onDelete"
    />
    <div class="van-ellipsis">这是一段最多显示一行的文字，多余的内容会被省略</div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import {list,login} from '@/api/mock'
export default {
  components: {
    HelloWorld,
  },

  data () {
    return {
      show:false
    }
  },

  computed: {},

  mounted () {
    console.log(process.env)
  },
  created(){
    list().then(res=>{
      console.log(res)
    })
  },
  methods: {
    onInput(value) {
      Toast(value);
    },
    onDelete() {
      Toast('删除');
    }
  }
}

</script>
<style lang='scss' scoped>
h1 {
  background: red;
  width: 100%;
  font-size: 30px;
}
</style>
