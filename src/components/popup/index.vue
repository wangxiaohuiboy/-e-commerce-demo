<template>
  <div class="popup">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        :placeholder="placeholder"
        @search="onSearch"
        @input="OnInput"
      >
        <template #action>
          <div @click="onCancel">取消</div>
        </template>
      </van-search>
    </form>
    <HistoryHot v-if="blockShow==1" @changePlcaeholder="FachangePlcaeholder" />
    <List :listArr="listArr" v-else-if="blockShow==2" />
    <ProductShow v-else />
  </div>
</template>
 
<script>
import HistoryHot from "@/components/popup/HistoryHot";
import List from "@/components/popup/List";
import ProductShow from "@/components/popup/ProductShow";
import { KeepSearchAPI } from "@/request/api";
export default {
  components: {
    HistoryHot,
    List,
    ProductShow,
  },
  data() {
    return {
      value: "",
      blockShow: 3,
      placeholder: "",
      listArr:[]
    };
  },

  beforeCreate() {
    this.$store.dispatch("GetMessage");
  },
  updated() {
    this.$store.commit("GetSearchData", this.value);
  },
  methods: {
    onSearch() {},
    // 点击了取消按钮
    onCancel() {
      // 关闭popup，跳回上一个界面
      this.$router.back();
      //关闭弹出层的背景
      this.$store.commit("changeShowpopup", false);
    },
    //修改placeholder
    FachangePlcaeholder(arg) {
      this.placeholder = arg;
    },
    //实时搜索
    OnInput() {
      //显示列表区块
      this.blockShow = 2;
      KeepSearchAPI({
        params: {
          keyword: this.value,
        },
      }).then((res) => {
        if (res.errno == 0) {
          this.listArr = res.data
        }
      });
    },
  },
};
</script>
 
<style lang = "less" scoped>
.popup {
  width: 100%;
  height: 100%;
  position: absolute;
  /* right: 0; */
  top: 0;
  background: #efefef;
  z-index: 9;
}
</style>