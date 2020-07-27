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
    <HistoryHot v-if="blockShow==1" @changePlcaeholder="FachangePlcaeholder" @goSearch="goSearch" />
    <List @goSearch="goSearch" :listArr="listArr" v-else-if="blockShow==2" />
    <ProductShow
      @categroyResearch="categroyResearch"
      @priceResearch="priceResearch"
      :filterCategory="filterCategory"
      :goodList="goodList"
      v-else
    />
  </div>
</template>
 
<script>
import HistoryHot from "@/components/popup/HistoryHot";
import List from "@/components/popup/List";
import ProductShow from "@/components/popup/ProductShow";
import { KeepSearchAPI, GetSearchCommoadityData } from "@/request/api";
export default {
  components: {
    HistoryHot,
    List,
    ProductShow,
  },
  data() {
    return {
      value: "",
      // 1代表历史热门，2代表列表，3代表产品展示
      blockShow: 1,
      placeholder: "",
      //list组件的数组
      listArr: [],
      //商品数组
      goodList: [],
      //分类数组
      filterCategory: [],
      // 请求的页数
      page: 1,
      // 请求的个数
      size: 20,
      //价格排序
      order: "desc",
      // 按照id或者price排序
      sort: "id",
      //分类id
      categoryId: 0,
    };
  },

  beforeCreate() {
    this.$store.dispatch("GetMessage");
  },
  updated() {
    this.$store.commit("GetSearchData", this.value);
  },
  methods: {
    //从点击标签执行的搜索
    goSearch(arg) {
      this.value = arg;
      this.goodSearch();
    },
    //搜索，用户敲回车
    onSearch() {
      this.goodSearch();
    },
    // 按照价格重新搜索
    priceResearch(arg) {
      this.order = arg;
      this.sort = "price";
      this.goodSearch();
    },
    // 分类改变，重新搜索
    categroyResearch(arg) {
      this.categoryId = arg;
      this.goodSearch();
    },
    // 封装一个搜索事件
    goodSearch() {
      GetSearchCommoadityData({
        keyword: this.value,
        page: this.page,
        size: this.size,
        order: this.order,
        categoryId: this.categoryId,
        sort: this.sort,
      }).then((res) => {
        console.log(res.data);
        let { goodsList, filterCategory } = res.data;
        this.goodList = goodsList;
        //替换数组中的name和id
        this.filterCategory = JSON.parse(
          JSON.stringify(filterCategory)
            .replace(/name/g, "text")
            .replace(/id/g, "value")
        );
        this.blockShow = 3;
        console.log(this.filterCategory);
      });
    },
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
          this.listArr = res.data;
        }
      });
    },
  },
};
</script>
 
<style lang = "less" scoped>
.popup {
  width: 100%;
  min-height: 100%;
  position: absolute;
  /* right: 0; */
  top: 0;
  background: #efefef;
  z-index: 9;
}
</style>