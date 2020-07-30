<template>
  <div>
    <van-tabs v-model="active" @click="tabsClick">
      <van-tab v-for="item in brotherCategory" :title="item.name" :key="item.id">
        <h3 class="channel_title">{{item.name}}</h3>
        <p class="channel_subtitle">{{item.front_desc}}</p>
      </van-tab>
    </van-tabs>
    <product-list :goodList="goodsList"></product-list>
  </div>
</template>
 
<script>
import { GetCategoryAPI, GetProductAPI } from "@/request/api";
import ProductList from "@/components/ProductList";
export default {
  components: {
    ProductList,
  },
  data() {
    return {
      // 标签拦的当前项
      active: 2,
      //   标题栏数组
      brotherCategory: [],
      //   当前分类
      currentCategory: {},
      //   相关产品列表
      goodsList: [],
    };
  },
  created() {
    this.GetCategory();
    this.GetCategoryProduct();
  },
  methods: {
    tabsClick() {
      let id = this.brotherCategory[this.active].id;
      //   用户可以看到路由跳转
      this.$router.push("/channel/" + id);
      // 重新请求数据
      this.GetCategory();
      this.GetCategoryProduct();
    },
    // 分类数据获取
    GetCategory() {
      GetCategoryAPI({
        id: this.$route.params.id,
      }).then((res) => {
        let { brotherCategory, currentCategory } = res.data;
        this.brotherCategory = brotherCategory;
        this.currentCategory = currentCategory;
        console.log(brotherCategory);
        // 遍历brotherCategory数组中的每一项，如果其id与currentCategory.id一致，就是当前项
        this.brotherCategory.map((val, index) => {
          if (val.id == this.currentCategory.id) {
            this.active = index;
          }
        });
      });
    },
    GetCategoryProduct() {
      GetProductAPI({
        categoryId: this.$route.params.id,
        page: 1,
        size: 1000,
      }).then((res) => {
        if (res.errno == 0) {
          this.goodsList = res.data.goodsList;
        }
      });
    },
  },
};
</script>
 
<style lang = "less" scoped>
.channel_title {
  margin-top: 20px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
}
.channel_subtitle {
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #666;
}
</style>