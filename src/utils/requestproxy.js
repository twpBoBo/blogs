import axios from 'axios';
// 域名
let host = 'https://autumnfish.cn/';
// process.env是Nodejs提供的一个API，它返回一个包含用户环境信息的对象。
// 通过NODE_ENV 判断当前环境是生产环境(production)还是开发环境(development) 自动切换不同域名
// 开发环境和生产环境
// if(process.env.NODE_ENV == "development"){
//     host = "http://shop.bufantec.com/bufan";
// }else{
//     host = "http://shop.bufantec.com/bufan";
// }
// 创建axios实例
const instance = axios.create({
  // baseURL  公共接口路径
  baseURL: host,
  // timeout 超时时间
  timeout: 5000
});
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 统一请求参数
    if (config.method.toLowerCase() == 'get') {
      config.params = config.data;
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);
// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    console.log('err' + error);
    return Promise.reject(error);
  }
);
export default instance;
