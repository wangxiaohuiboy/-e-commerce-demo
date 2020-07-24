<template>
  <van-grid column-num="5">
    <van-grid-item v-for="item in channel" :key="item.id" :icon="item.icon_url" :text="item.name" />
  </van-grid>
</template>
 
<script>
export default {
  props: ["channel"],
  data() {
    return {};
  },
};
</script>
 
<style lang = "less" scoped>
</style>