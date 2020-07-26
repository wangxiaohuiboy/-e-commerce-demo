<template>
  <div>
    <van-dropdown-menu active-color="#ee0a24">
      <van-dropdown-item disabled title="综合" />
      <van-dropdown-item title="价格" v-model="value1" :options="option1" />
      <van-dropdown-item title="分类"  :options="filterCategory" />
    </van-dropdown-menu>
    <ProductList v-if="goodList.length>0" :goodList="goodList" />
    <van-empty v-else image="search" description="您搜索的商品不存在" />
  </div>
</template>
 
<script>
import ProductList from "@/components/ProductList";
export default {
  props: ["goodList","filterCategory"],
  components: {
    ProductList,
  },
  data() {
    return {
      value1: "",
      option1: [
        { text: "价格由高到低", value: "a" },
        { text: "价格由低到高", value: "b" },
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
  methods: {
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
};
</script>
 
<style lang = "less" scoped>
</style>