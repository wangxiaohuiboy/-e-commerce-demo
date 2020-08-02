<template>
  <div>
    <van-search
      v-model="value"
      shape="round"
      background="#fff"
      disabled
      placeholder="请输入搜索关键词"
      @click="openPopup"
    />
    <div class="content">
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item v-for="item in categoryList" :key="item.id" :title="item.name" />
      </van-sidebar>
      <div class="right">
        <div class="banner">
          <img :src="currentCategory.banner_url" alt />
          <span>{{currentCategory.front_name}}</span>
        </div>
        <div class="mytitle">
          <h3>{{currentCategory.name}}分类</h3>
          <span></span>
        </div>
        <van-grid :column-num="3">
          <van-grid-item
            v-for="item in currentCategory.subCategoryList"
            :key="item.id"
            :icon="item.wap_banner_url"
            :text="item.name"
          />
        </van-grid>
      </div>
    </div>

    <transition name="fade">
      <div class="popup_bg" v-if="$store.state.search.showpopup"></div>
    </transition>
    <transition name="slide">
      <router-view v-if="$route.path=='/category/popup'" />
    </transition>
  </div>
</template>
 
<script>
import { AllCategoriesAPI, GetCurrentCategoryAPI } from "@/request/api";
export default {
  data() {
    return {
      value: "",
      activeKey: 0,
      //商品的分类
      categoryList: [],
      //分类页第一项
      currentCategory: {},
    };
  },
  created() {
    AllCategoriesAPI().then((res) => {
      let { categoryList, currentCategory } = res.data;
      this.categoryList = categoryList;
      this.currentCategory = currentCategory;
      if (this.$store.state.search.showpopup) {
        this.$store.state.search.showpopup = false;
      }
    });
  },
  methods: {
    openPopup() {
      this.$router.push("/category/popup");
      this.$store.commit("changeShowpopup", true);
    },
    onChange(index) {
      GetCurrentCategoryAPI({
        id: this.categoryList[index].id,
      }).then((res) => {
        if (res.errno == 0) {
          this.currentCategory = res.data.currentCategory;
        }
      });
    },
  },
};
</script>
 
<style lang = "less" scoped>
.slide-enter,
.slide-leave-to {
  right: -100%;
}
.slide-enter-active,
.slide-leave-active {
  transition: right 0.4s linear;
}
.slide-enter-to,
.slide-leave {
  right: 0;
}
.popup_bg {
  width: 100%;
  min-height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 8;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.content {
  display: flex;
  justify-content: space-between;
  .van-sidebar {
    width: 20%;
    height: calc(100vh - 104px);
    background: #f7f8fa;
  }
  .right {
    width: 80%;
    height: calc(100vh - 104px);
    background: #fff;
    .banner {
      width: 95%;
      margin: 0 auto;
      position: relative;
      img {
        width: 100%;
        height: 10rem;
        display: block;
        border-radius: 5px;
        box-shadow: 0 0 6px #000;
        filter: brightness(0.5);
      }
      span {
        position: absolute;
        left: 0;
        top: 0;
        color: #fff;
        width: 100%;
        text-align: center;
        line-height: 10rem;
      }
    }
  }
}
.mytitle {
  background: #fff;
  position: relative;
  height: 50px;
  h3 {
    width: 30%;
    position: absolute;
    background: #fff;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    line-height: 50px;
    font-size: 14px;
    color: #000;
    z-index: 2;
  }
  span {
    width: 50%;
    height: 2px;
    background: #ccc;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>