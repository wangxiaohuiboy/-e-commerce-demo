<template>
  <div style="padding-bottom:150px">
    <Safeguard></Safeguard>
    <van-checkbox-group v-model="result" ref="checkboxGroup">
      <van-checkbox name="a" v-for="item in 10" :key="item">
        <van-card
          num="2"
          price="2.00"
          desc="描述信息"
          title="商品标题"
          thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
        />
      </van-checkbox>
    </van-checkbox-group>
    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checkAll">全选</van-checkbox>
      <template #tip>
        累计共613件商品，可点击
        <van-button
          :type="editStatus?'danger':'primary'"
          size="small"
          @click="editStatus=!editStatus"
        >{{editStatus?'完成编辑':'编辑'}}</van-button>按钮进行商品数量修改
      </template>
    </van-submit-bar>
  </div>
</template>
 
<script>
import Safeguard from "@/components/Safeguard";
import { GetCartDataAPI } from "@/request/api";
export default {
  components: {
    Safeguard,
  },
  created() {
    GetCartDataAPI().then((res) => {
      let { cartList, cartTotal } = res.data;
      this.cartList = cartList;
      this.cartTotal = cartTotal;
      console.log(res.data);
    });
  },
  data() {
    return {
      //购物车数组列表
      cartList: [],
      //购物车总数据
      cartTotal: {},
      //result数组中的值要跟name的值对应上，此时表示选中
      result: ["a"],
      //全选
      checkAll: false,
    // 编辑按钮切换
      editStatus:false,
    };
  },
  methods: {
    onSubmit() {},
  },
};
</script>
 
<style lang = "less" scoped>
.van-checkbox-group {
  background: #fff;
  .van-checkbox {
    border-bottom: 1px solid #ccc;
    padding: 10px 4%;
  }
  /deep/.van-checkbox__label {
    flex: 1;
  }
}
.van-submit-bar {
  bottom: 49px;
  border-bottom: 1px solid #ccc;
}
</style>