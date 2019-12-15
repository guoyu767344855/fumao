<template>
  <div class='location'>
    <div v-if="list.length == 0" class="noList">暂无收货地址，快添加一个吧～</div>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        class="locction-item"
        />
    <!-- <div class="footer">
        <van-icon class="footer-add-o" name="add-o" />
        <div>新增收货地址</div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'location',

  data () {
    return {
      chosenAddressId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
          addressDetail: "杭州市西湖区 黄龙万科中心",
          areaCode: "110102",
          city: "北京市",
          country: "",
          county: "西城区",
          isDefault: false,
          postalCode: "046100",
          province: "北京市",
        },
        {
          id: '2',
          name: '李四',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
          addressDetail: "杭州市西湖区 黄龙万科中心",
          areaCode: "110102",
          city: "北京市",
          country: "",
          county: "西城区",
          isDefault: false,
          postalCode: "046100",
          province: "北京市",
        }
      ]
    }
  },

  methods: {
    onAdd() {
      this.$router.push({
        path:'/addLocation'
      })
    },

    onEdit(item, index) {
      console.log(item,index)
      this.$router.push({
        path:'/addLocation',
        query:item
      })
    }
  }
}
</script>

<style lang='less' scoped>
.location{
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
