import { Toast } from "vant"
export default {
  //修改弹出层
  changeShowpopup(state, payload) {
    state.showpopup = payload;
  },
  //获取数据的地方
  GetData(state, payload) {
    // 获取热门搜索数据
    state.hotKeywordList = payload[0];
    // 获取历史记录的数据
    state.historyKeywordList = payload[1];
    // 获取搜索框默认文本
    state.keyword = payload[2]
  },
  //历史记录删除
  deleteHistorys(state, payload) {
    state.flag = payload;
    state.historyKeywordList = [];
    Toast.success("删除成功");
  },
  //获取搜索框时时数据
  GetSearchData(state, payload) {
    state.value = payload
  },
  //获取搜索框商品数据
  GetSearchArray(state, payload) {
    state.goodsList = payload
  }
}