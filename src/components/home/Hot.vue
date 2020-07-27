<template>
  <div class="hot">
    <div class="home_title">人气推荐</div>
    <van-card
      v-for="item in hotGoodsList"
      :key="item.id"
      :price="item.retail_price.toFixed(2)+'元'"
      :desc="item.goods_brief"
      :title="item.name"
      :thumb="item.list_pic_url"
    />
  </div>
</template>
 
<script>
export default {
  props: ["hotGoodsList"],
  data() {
    return {};
  },
};
</script>
 
<style lang = "less" scoped>
.hot {
  margin-top: 20px;
  background: #fff;
  .home_title {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #000;
    text-align: center;
  }
  .van-card__title{
      font-size: 16px;
      margin-bottom: 10px;
  }
}
</style>
