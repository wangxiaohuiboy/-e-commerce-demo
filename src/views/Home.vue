<template>
  <div class="home">
    <div v-if="tagym">
      <van-search
        v-model="value"
        shape="round"
        background="#4fc08d"
        disabled
        placeholder="请输入搜索关键词"
        @click="openPopup"
      />
      <van-swipe class="my-swipe" :autoplay="3000">
        <van-swipe-item v-for="item in banner" :key="item.id">
          <img :src="item.image_url" width="100%" style="display:block" alt />
        </van-swipe-item>
      </van-swipe>
      <channel :channel="channel" />
      <Brand :brandList="brandList" />
      <New :newGoodsList="newGoodsList">周一周四·新品首发</New>
      <Hot :hotGoodsList="hotGoodsList" />
      <Topic :topicList="topicList" />
      <New :newGoodsList="item.goodsList" v-for="item in categoryList" :key="item.id">{{item.name}}</New>
      <transition name="fade">
        <div class="popup_bg" v-if="$store.state.search.showpopup"></div>
      </transition>
    </div>

    <div v-else>
      <transition name="slide">
        <router-view @changetag="fnchangetag" />
      </transition>
    </div>
  </div>
</template>

<script>
import Channel from "@/components/home/Channel";
import Brand from "@/components/home/Brand";
import New from "@/components/home/New";
import Hot from "@/components/home/Hot";
import Topic from "@/components/home/Topic";
import { GetHomeDataAPI } from "@/request/api.js";
export default {
  name: "Home",
  components: {
    Channel,
    Brand,
    New,
    Hot,
    Topic,
  },
  data() {
    return {
      value: "",
      banner: [],
      channel: [],
      brandList: [],
      newGoodsList: [],
      hotGoodsList: [],
      topicList: [],
      categoryList: [],
      tagym: true,
    };
  },
  created() {
    //页面初始化时请求数据
    GetHomeDataAPI().then((res) => {
      //当errno为0时，代表请求成功，这时候直接拿最里面的data
      if (res.errno == 0) {
        let {
          banner,
          channel,
          brandList,
          newGoodsList,
          hotGoodsList,
          topicList,
          categoryList,
        } = res.data;
        // console.log(res);
        this.banner = banner;
        this.channel = channel;
        this.brandList = brandList;
        this.newGoodsList = newGoodsList;
        this.hotGoodsList = hotGoodsList;
        this.topicList = topicList;
        this.categoryList = categoryList;
        console.log(res.data);
      }
    });
  },
  methods: {
    openPopup() {
      this.$router.push("/home/popup");
      this.tagym = !this.tagym;
      this.$store.commit("changeShowpopup", true);
    },
    fnchangetag() {
      this.tagym = true;
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  padding-bottom: 60px;
}
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
//深度修改样式
/deep/.van-swipe__indicator {
  opacity: 1;
  background: skyblue;
}
/deep/.van-swipe__indicator--active {
  background: orange;
}
</style>
