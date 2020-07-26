<template>
  <div>
    <van-dropdown-menu active-color="#ee0a24">
      <van-dropdown-item disabled title="综合" />
      <van-dropdown-item title="价格" v-model="value1" :options="option1" />
      <van-dropdown-item title="分类" v-model="value2" :options="option2" />
    </van-dropdown-menu>

    <van-grid class="product" column-num="2" :gutter="10" style="margin-top:6px">
      <van-grid-item v-for="value in 1" :key="value" icon="photo-o" text="文字">
        <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
        <p class="productName">母亲节礼物-舒适安睡组合</p>
        <div class="productPrice">{{2598|addPrice}}</div>
      </van-grid-item>
    </van-grid>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      value1: "a",
      value2: "A",
      option1: [
        { text: "价格由高到低", value: "a" },
        { text: "价格由低到高", value: "b" },
      ],
      option2: [
        { text: "全部", value: "A" },
        { text: "居家", value: "B" },
      ],
      usertext: "",
      arr: [],
    };
  },
  created() {},
  computed: {
    //获取用户搜索的关键词
    GetValue() {
      return this.$store.state.search.value;
    },
    //获取热门搜索数组
    GetHotData() {
      return this.$store.state.search.hotKeywordList;
    },
    // 获取搜索框商品数组
    GetArray() {
      return this.$store.state.search.goodsList;
    },
  },
  methods:{
      // 商品名称里包含用户输入的关键词的
    UserAntistop() {
      for (var i = 0; i < this.GetArray.length; i++) {
        for (var j = 0; j < this.arr.length; j++) {
          if (this.usertext != "") {
            if (this.GetArray[i].name.indexOf(this.arr[j]) != -1) {
              let str2 = this.GetArray[i];
              return str2;
            }
          }
        }
      }
    },
     // 检索商品库
    searchCommodity() {
      let arr = [];
      for (var i = 0; i < this.GetHotData.length; i++) {
        arr.push(this.GetHotData[i].keyword);
      }
      for (var j = 0; j < this.GetArray.length; j++) {
        arr.push(this.GetArray[j].name);
      }
      return arr;
    },
  },
   filters: {
    addPrice(val) {
      return `¥ ${val} 元`;
    },
  },
};
</script>
 
<style lang = "less" scoped>
.product {
  padding: 0;
  margin: 0;
}
.product .van-image {
  width: 165px;
  height: 165px;
}
.productName {
  margin: 0;
  padding: 0;
  font-size: 16px;
  color: #000000;
  width: 170px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
/deep/.van-grid-item__content--center {
  padding: 0;
  width: 170px;
}
.productPrice {
  line-height: 40px;
  display: block;
  font-size: 16px;
  color: #ff0000;
}
</style>