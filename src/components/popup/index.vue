<template>
  <div class="popup">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div @click="onCancel">取消</div>
        </template>
      </van-search>
    </form>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  methods: {
    onSearch() {},
    // 点击了取消按钮
    onCancel() {
      this.$router.back("home");
    },
  },
};
</script>
 
<style lang = "less" scoped>
.popup {
  width: 100%;
  height: 100%;
  position: fixed;
  /* right: 0; */
  top: 0;
  background: pink;
  z-index: 9;
}
</style>