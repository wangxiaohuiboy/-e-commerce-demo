<template>
  <van-list  :finished="true" finished-text="没有更多了">
    <van-cell @click="cellClick(item)" v-for="item in listArr" :key="item" :title="item" />
  </van-list>
</template>
 
<script>
export default {
  props:["listArr"],
  data() {
    return {
    };
  },
  methods:{
    cellClick(arg){
      this.$emit("goSearch",arg)
    }
  }
};
</script>
 
<style lang = "less" scoped>

</style>