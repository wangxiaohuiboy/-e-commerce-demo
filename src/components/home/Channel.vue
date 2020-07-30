<template>
  <van-grid column-num="5">
    <van-grid-item v-for="item in channel" :key="item.id" :icon="item.icon_url" :text="item.name" @click="cutClass(item.id)" />
  </van-grid>
</template>
 
<script>
export default {
  props: ["channel"],
  data() {
    return {};
  },
  methods:{
    cutClass(id){
      this.$router.push("/channel/"+id);
    }
  }
};
</script>
 
<style lang = "less" scoped>
.van-grid{
  width: 100%;
}
</style>