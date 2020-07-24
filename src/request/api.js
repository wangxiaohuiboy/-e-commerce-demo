import request from "./request"


//按需导出API

export const GetHomeDataAPI = () => request.get("/index/index")