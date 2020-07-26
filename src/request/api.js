import request from "./request"


//按需导出API

//按需导出API
//请求首页的数据
export const GetHomeDataAPI = () => request.get("/index/index")
//获取历史和热门的数据
export const GetSearchDataAPI = () => request.get("/search/index")
//清除历史记录
export const PostClearhistory = () => request.post("/search/clearhistory")
//popup中搜索框实时搜索功能
export  const KeepSearchAPI = (params) => request.get("/search/helper",params)
//搜索框商品搜索
export const GetSearchCommoadityData = (params) => request.get("/goods/list",{params})

export const GetHelper = () => request.get("search/helper")

