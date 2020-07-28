import { GetSearchDataAPI, PostClearhistory,GetSearchCommoadityData } from "@/request/api.js";
export default {
    GetMessage(context) {
        GetSearchDataAPI().then((res) => {
            if (res.errno == 0) {
                let { hotKeywordList, historyKeywordList, defaultKeyword } = res.data;
                context.commit("GetData", [hotKeywordList, historyKeywordList, defaultKeyword])
            }
        });
        PostClearhistory().then((res) => {
            //获取清除历史记录的post请求
            console.log(res.errno);
        });
        //获取搜索框商品数据
        GetSearchCommoadityData().then((res)=>{
            context.commit("GetSearchArray",res.data.goodsList)
        })
    }
}