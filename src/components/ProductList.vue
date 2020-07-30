<template>
  <ul class="list">
    <li v-for="item in goodList" :key="item.id" @click="goToProductDetail(item.id)">
      <img :src="item.list_pic_url" alt />
      <div>{{item.name}}</div>
      <p>{{item.retail_price|filterMoney}}</p>
    </li>
  </ul>
</template>
 
<script>
export default {
  props: ["goodList"],
  data() {
    return {};
  },
  methods:{
    goToProductDetail(id){
      this.$router.push("/productdetail/"+id)
    }
  }
};
</script>
 
<style lang = "less" scoped>
.list {
  display: flex;
  justify-content: space-between;
  padding: 0 10x;
  flex-wrap: wrap;
  padding-top: 10px;
  li {
    text-align: center;
    background: #fff;
    width: 49%;
    margin-bottom: 10px;
    img {
      width: 100%;
    }
    div,
    p {
      padding: 0 5px;
      height: 25px;
      line-height: 25px;
      /* 以下这段代码实现超出一行变省略号 */
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p {
      color: #ff0000;
    }
  }
}
</style>