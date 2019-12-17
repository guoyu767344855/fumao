<template>
  <div class='address'>
    <div v-if="list.length == 0" class="noList">暂无收货地址，快添加一个吧～</div>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @select="chooseAddress"
        class="locction-item"
        />
    <!-- <div class="footer">
        <van-icon class="footer-add-o" name="add-o" />
        <div>新增收货地址</div>
    </div> -->
  </div>
</template>

<script>
import {list} from '@/api/address'
export default {
  name: '',

  data () {
    return {
      chosenAddressId: 0,
      list: []
    }
  },
  created(){
    if(this.$route.query.id){
      this.chosenAddressId = `${this.$route.query.id}`
    }
    list().then(res=>{
      console.log(res)
      let addressList = res.data
      addressList = addressList.map(item=>{
        return item = {
          id: `${item.id}`,
          name: item.name,
          tel: item.phoneNumber,
          address: item.province + item.city + item.region + item.detailAddress,
          addressDetail: item.detailAddress,
          areaCode: item.areaCode,
          city: item.city,
          country: "",
          county: item.region,
          isDefault: item.defaultStatus ? true : false,
          postalCode: item.postCode,
          province: item.province,
        }
      })
      console.log('映射',addressList)
      this.list = addressList
    })
  },
  methods: {
    // 添加地址
    onAdd() {
      this.$router.push({
        path:'/addAddress'
      })
    },
  // 修改地址
    onEdit(item, index) {
      console.log(item,index)
      this.$router.push({
        path:'/addAddress',
        query:item
      })
    },
  // 选择地址
    chooseAddress(e){
      console.log(e)
      this.$store.commit('add',e.id)
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='less' scoped>
.address{
    background-color: #f5f5f5;
    height: 100%;
    text-align: center;
    &-item{
        margin: 30px;
    }
    .noList{
      font-size:36px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(81,80,80,1);
      line-height:50px;
      line-height: 100vh;
    }
    // .footer{
    //     width: 100%;
    //     position: fixed;
    //     bottom: 0;
    //     height: 80px;
    //     display: flex;
    //     align-items: center;
    //     border:1px solid rgba(133,133,133,1);
    //     z-index: 10000;
    //     background-color: #ffffff;
    //     justify-content: center;
    //     font-size:36px;
    //     font-family:PingFangSC-Regular,PingFang SC;
    //     font-weight:400;
    //     color:rgba(81,80,80,1);
    //     line-height:50px;
    //     &-add-o{
    //         margin-right: 45px;
    //     }
    // }
}
</style>
