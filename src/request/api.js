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
export const KeepSearchAPI = (params) => request.get("/search/helper", params)
//搜索框商品搜索
export const GetSearchCommoadityData = (params) => request.get("/goods/list", { params })
//专题页数据
export const GetTopicApi = (params) => request.get("/topic/list", { params })
//登陆注册
export const LoginRegisterApI = (params) => request.post("/auth/loginByWeb", params)
// 分类数据获取
export const GetCategoryAPI = (params) => request.get("/goods/category", { params });
// 分类页面商品列表请求
export const GetProductAPI = (params) => request.get("/goods/list", { params });
// 产品明细
export const GetdetailAPI = (params) => request.get("/goods/detail", { params });
// 品牌详情
export const GetLBranDtailsAPI = (params) => request.get("/brand/detail", { params })
// 品牌详情中的产品列表
export const GetBranDetailsGoodlistAPI = (params) => request.get("/goods/list", { params })
// 获取购物车产品数量
export const GetCartGoodsCountAPI = () => request.get("/cart/goodscount")
// 加入购物车
export const AddToCartAPI = (params) => request.post("/cart/add", params)
// 获取购物车数据
export const GetCartDataAPI = (params) => request.get("/cart/index", { params })
// 选中商品接口（含全选）
export const SelectedGoodsAPI = (params) => request.post("/cart/checked", params);
// 商品步进器
export const StepAPI = (params) => request.post("/cart/update", params);
// 删除商品
export const DeleteCart = (params) => request.post("/cart/delete", params);
// 相关产品
export const RelatedProducts = (params) => request.get("/goods/related", { params });
// 全部分类数据接口
export const AllCategoriesAPI = () => request.get("/catalog/index");
// 获取当前分类数据
export const GetCurrentCategoryAPI = (params) => request.get("/catalog/current", { params });
