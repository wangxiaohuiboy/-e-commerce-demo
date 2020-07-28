<template>
  <div class="topic_page">
    <ul>
      <li v-for="item in arr" :key="item.id">
        <img :src="item.scene_pic_url" width="100%" alt />
        <h4 class="van-ellipsis">{{item.title}}</h4>
        <div class="van-ellipsis">{{item.subtitle}}</div>
        <p>{{item.price_info|filterMoney}}起</p>
      </li>
    </ul>
    <van-pagination
      v-model="currentPage"
      :page-count="totalPages"
      @change="pageChange"
      mode="simple"
    />
  </div>
</template>
 
<script>
import { GetTopicApi } from "@/request/api";
export default {
  data() {
    return {
      arr: [],
      //   当前页数
      currentPage: 1,
      //   总页数
      totalPages: 2,
      //   每页请求个数
      size: 10,
    };
  },
  created() {
    this.GetTopicData();
  },
  methods: {
    //   点击上下页
    pageChange() {
      window.scrollTo(0, 0);
      this.GetTopicData();
    },
    //  请求专题
    GetTopicData() {
      GetTopicApi({
        page: this.currentPage,
        size: this.size,
      }).then((res) => {
        if (res.errno == 0) {
          let { data, currentPage, totalPages } = res.data;
          this.arr = data;
          this.currentPage = currentPage;
          this.totalPages = totalPages;
        }
      });
    },
  },
};
</script>
 
<style lang = "less" scoped>
.topic_page {
  padding-bottom: 60px;
  ul {
    li {
      text-align: center;
      background: #fff;
      margin-bottom: 20px;
      font-size: 16px;
      padding-bottom: 5px;
      h3,
      div {
        width: 90%;
        margin: auto;
        line-height: 40px;
        height: 40px;
      }
      div {
        color: #666;
        font-size: 12px;
      }
      p {
        color: #4fc08d;
        height: 20px;
        line-height: 20px;
      }
    }
  }
  /deep/.van-pagination__page-desc {
    display: none;
  }
  /deep/.van-pagination__item {
    color: #4fc08d;
  }
  /deep/.van-pagination__item--disabled {
    color: #999;
  }
}
</style>