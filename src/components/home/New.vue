<template>
  <div class="new">
    <div class="home_title">
      <slot></slot>
    </div>
    <ProductList :goodList="newGoodsList" />
  </div>
</template>
 
<script>
import ProductList from "@/components/ProductList";
export default {
  props: ["newGoodsList"],
  components: {
    ProductList,
  },
  data() {
    return {};
  },
};
</script>
 
<style lang = "less" scoped>
.new {
  width: 100%;
  text-align: center;
  margin-top: 20px;
  background: #fff;
  .home_title {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #000;
  }
}
</style>