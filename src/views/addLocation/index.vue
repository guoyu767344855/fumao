<template>
  <div class='addLocation'>
    <van-address-edit
    :address-info="addressInfo"
    :area-list="areaList"
    show-postal
    :show-delete="isEdit"
    show-set-default
    show-search-result
    :search-result="searchResult"
    :area-columns-placeholder="['请选择', '请选择', '请选择']"
    @save="onSave"
    @delete="onDelete"
    @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import areaList from "../../assets/js/area";
import { Toast } from "vant";
export default {
  name: 'addLocation',

  data () {
    return {
        addressInfo:{},
        isEdit:false,
        areaList,
        searchResult: []
    }
  },
  created(){
    if(this.$route.query.id){
      this.isEdit = true,
      this.addressInfo = this.$route.query
    }
    console.log(this.$route.query)
  },
  methods: {
    onSave(item) {
      console.log(item)
    },
    onDelete() {
        Toast("delete");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }];
      } else {
        this.searchResult = [];
      }
    }
  }
}
</script>

<style lang='less' scoped>
.addLocation{
    text-align: left;
}
</style>
