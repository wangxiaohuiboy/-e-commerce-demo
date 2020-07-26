<template>
  <van-list  :finished="true" finished-text="没有更多了">
    <van-cell v-for="item in listArr" :key="item" :title="item" />
  </van-list>
</template>
 
<script>
export default {
  props:["listArr"],
  data() {
    return {
    };
  },
};
</script>
 
<style lang = "less" scoped>
</style>