<template>
  <div id="app">
    <transition name="silde">
      <router-view></router-view>
    </transition>
    <!-- 如果不是popup页面，就用下面这一条 -->
    <!-- <router-view></router-view> -->
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
  height: 100%;
  color: #000;
  font-size: 14px;
  font-family: microsoft yahei;
}
a {
  text-decoration: none;
  color: #000;
}
h1,h2,h3,h4,h5,h6{
  margin: 0;
  font-weight: normal;
}
.silde-enter,
.silde-leave-to {
  right: -100%;
}
.silde-enter-active,
.silde-leave-active {
  transition: right 0.4s linear;
}
.silde-enter-to,
.silde-leave {
  right: 0;
}
</style>
