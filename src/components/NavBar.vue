<template>
  <van-tabbar v-model="active" active-color="#4fc08d" inactive-color="#999">
    <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/topic" icon="label-o">专题</van-tabbar-item>
    <van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
    <van-tabbar-item to="/cart" icon="cart-o">购物车</van-tabbar-item>
    <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</template>
 
<script>
export default {
  data() {
    return {
        // active: 0,
    };
  },
  computed: {
    active: {
      get() {
        return this.$route.meta.num;
      },
      set(){
          return;
      }
    },
  },
};
</script>
 
<style lang = "less" scoped>
.van-tabbar{
  width: 100%;
}
</style>