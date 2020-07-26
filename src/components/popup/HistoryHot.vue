<template>
  <section>
    <div v-if="ifShowHistory" class="history">
      <div class="seek">
        <div class="history-top">
          <h4>历史记录</h4>
          <van-icon @click="deleteHistory" size="20px" name="delete" />
        </div>
        <van-tag v-for="(item,index) in historyKeywordList" :key="index" plain>{{item}}</van-tag>
      </div>
    </div>
    <div class="hot-search">
      <div class="seek">
        <div class="history-top">
          <h4>热门搜索</h4>
        </div>
        <van-tag
          v-for="(item,index) in hotKeywordList"
          :key="index"
          :type="item.is_hot==1?'danger':'default'"
          plain
        >{{item.keyword}}</van-tag>
      </div>
    </div>
  </section>
</template>
 
<script>
import {GetSearchDataAPI,PostClearhistory} from "@/request/api"
export default {
  data() {
    return {
      historyKeywordList: [],
      hotKeywordList: [],
      ifShowHistory:true
    };
  },
  created() {
    //请求数据(历史数组、热门数组、搜索框的placeHolder)
    GetSearchDataAPI().then((res) => {
      console.log(res);
      let { defaultKeyword, historyKeywordList, hotKeywordList } = res.data;
      this.historyKeywordList = historyKeywordList;
      this.hotKeywordList = hotKeywordList;
      //修改Index.vue中的plcaeholder
      this.$emit("changePlcaeholder",defaultKeyword.keyword)
    });
  },
  methods: {
    //点击删除历史记录
    deleteHistory() {
      // this.$store.commit("deleteHistorys", false);
      PostClearhistory().then((res)=>{
        if(res.errno==0){
          this.$toast.success("删除成功");
          setTimeout(()=>{
            this.ifShowHistory = false;
          },400)
        }
      })
    },
  },
};
</script>
 
<style lang = "less" scoped>
section {
  margin: 0 auto;
}
.history,
.hot-search {
  margin-bottom: 20px;
  background: #fff;
  padding-bottom: 5px;
}
.seek {
  width: 337.5px;
  margin: 0 auto;
}
.history-top {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.history-top h4 {
  font-size: 20px;
  color: #000000;
}
.van-tag--default {
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: 14px;
}
.van-tag--danger.van-tag--plain {
  font-size: 14px;
  margin: 0 5px 5px 0;
}
</style>
