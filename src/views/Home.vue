<template>
  <div class="home">
    <van-search
      v-model="value"
      shape="round"
      background="#4fc08d"
      disabled
      placeholder="请输入搜索关键词"
      @click="openPopup"
    />
    <transition name="fade">
      <div class="popup_bg" v-if="$store.state.showpopup"></div>
    </transition>
    <transition name="silde">
      <router-view></router-view>
    </transition>
    <van-swipe class="my-swipe" :autoplay="3000">
      <van-swipe-item v-for="item in banner" :key="item.id">
        <img :src="item.image_url" width="100%" style="display:black" alt />
      </van-swipe-item>
    </van-swipe>
    <channel :channel="channel" />
  </div>
  
</template>

<script>
import Channel from "@/components/home/Channel";
import { GetHomeDataAPI } from "@/request/api.js";
export default {
  name: "Home",
  components: {
    Channel,
  },
  data() {
    return {
      value: "",
      banner: [],
      channel:[]
    };
  },
  created() {
    //页面初始化时请求数据
    GetHomeDataAPI().then((res) => {
      //当errno为0时，代表请求成功，这时候直接拿最里面的data
      if (res.errno == 0) {
        let { banner,channel } = res.data;
        console.log(channel);
        this.banner = banner;
        this.channel = channel;
      }
    });
  },
  methods: {
    openPopup() {
      this.$router.push("./home/popup");
      this.$store.commit("changeShowpopup", true);
    },
  },
};
</script>
<style lang="less" scoped>
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
.popup_bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 8;
  position: fixed;
  top: 0;
  left: 0;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s linear;
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
