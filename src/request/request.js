import axios from "axios"

//创建一个单例
const instance = axios.create({
    baseURL: "http://kumanxuan1.f3322.net:8001",
    timeout: 3000
})


//请求拦截（拦截器：interceptors）

instance.interceptors.request.use(config => {
    //在请求头中加入token
    let token = localStorage.getItem("token");
    if(token){
        config.headers['X-Nideshop-Token'] = token;
    }
    return config;
}, err => {
    return Promise.reject(err)
});


//响应拦截

instance.interceptors.response.use(result => {
    //如果请求成功就返回  result.data
    if (result.status == 200) {
        return result.data;
    }
}, err => {
    return Promise.reject(err);
})


export default instance;