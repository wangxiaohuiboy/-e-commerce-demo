<template>
  <div id="app">
   
    <!-- 如果不是popup页面，就用下面这一条 -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {

};
</script>
<style lang="less">
body,
html,
#app {
  background: #efefef;
  width: 100%;
  min-height: 100%;
  color: #000;
  font-size: 14px;
  font-family: microsoft yahei;
}
a {
  text-decoration: none;
  color: #000;
}
h1,h2,h3,h4,h5,h6,p{
  margin: 0;
  font-weight: normal;
}

</style>
