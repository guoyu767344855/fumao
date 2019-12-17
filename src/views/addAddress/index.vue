<template>
  <div class='addAddress'>
    <van-address-edit
    :address-info="addressInfo"
    :area-list="areaList"
    :show-delete="isEdit"
    show-set-default
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
import { add , update , Delete} from '@/api/address'
export default {
  name: 'addAddress',

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
      let data = {
        "city": item.city,
        "defaultStatus": item.isDefault ? 1 : 0,
        "detailAddress": item.addressDetail,
        "name": item.name,
        "phoneNumber": item.tel,
        "province": item.province,
        "region": item.county,
        "areaCode": item.areaCode
      }
      console.log(data)
      if(this.isEdit){
        data = Object.assign(data,{id:this.$route.query.id})
        update(data).then(res=>{
          console.log('更新',res)
          this.$router.go(-1)
        })
      }else{
        add(data).then(res=>{
          console.log('保存',res)
          this.$router.go(-1)
        })
      }
    },
    onDelete(item) {
      console.log(item)
        Delete(item.id).then(res=>{
          console.log(res)
          this.$router.go(-1)
        })
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
.addAddress{
    text-align: left;
}
</style>
