## 1. axios为什么要封装

axios 的 API 很友好，完全可以很轻松地在项目中直接使用。

不过随着项目规模增大，如果每发起一次HTTP请求，就要把这些比如设置超时时间、设置请求头、根据项目环境判断使用哪个请求地址、错误处理等等操作，都需要写一遍

这种重复劳动不仅浪费时间，而且让代码变得冗余不堪，难以维护。为了提高我们的代码质量，我们应该在项目中二次封装一下 axios 再使用

## 2. 如何封装

封装的同时，需要和 后端协商好一些约定，请求头，状态码，请求超时时间…….

设置接口请求前缀：根据开发、测试、生产环境的不同，前缀需要加以区分

请求头 : 来实现一些具体的业务，必须携带一些参数才可以请求(例如：会员业务)

状态码: 根据接口返回的不同status ， 来执行不同的业务，这块需要和后端约定好

请求方法：根据get、post等方法进行一个再次封装，使用起来更为方便

请求拦截器: 在请求发送之前执行某些处理如添加loading处理等

响应拦截器： 根据后端返回来的状态码判定执行不同业务

### 5.2 API与Request封装

在 `src` 下新建 `request`目录 ，在`request`目录下新建 `request.js` 

`request.js` 中：

```js
import axios from "axios"

const instance = axios.create({
    baseURL:"http://192.168.113.249:8081/cms", 
    timeout:5000
})

instance.interceptors.request.use(config=>{
    console.log("每一次发起请求前，都会先执行这里的代码");
    console.log(config); //config本次请求的配置信息
    // 统一get和post的请求参数
    if (config.method.toLowerCase() == 'get') {
      config.params = config.data
    }
    return config;
    
},err=>{
    return Promise.reject(err)
})

instance.interceptors.response.use(res=>{
    console.log("每一次接收到响应，都会先执行这里的代码，再去执行成功的那个回调函数then");
    return res.data;
},err=>{
    return Promise.reject(err)
})

export default instance
```

在 `src` 下新建 `api`目录 ，在`api`目录下新建 和页面请求对应的文件

```js
import request from "@/request";

export function newSongs(data) {

 return request({

  url: "/simi/artist",

  method: "get",

  data,

 });

}
```

### 在vue组件中使用

~~~js
import {newSongs} from "@/api"
//写法一
created(){
  newSongs(参数（对象方式）)
        .then(res=>{
            if(res.errno == 0){ //是否报错
                console.log(res.data)	// 成功拿到所有首页数据
            }
        })
}

//写法二 解决回调地狱
async created(){
   //await Promise对象
   let res = await  newSongs(参数（对象方式）) ;
   console.log(res);
}
```
~~~



### 5.4 代理配置

们对 `vue.config.js` 进行配置：

```js
module.exports = {
    devServer: {
        port: 8080,
        proxy: {
            '/api': {  //封装请求中的baseURL就等于在个配置项
                target: "http://192.168.113.249:8081/cms",
                pathRewrite: {
                    '^/api': '' //把带/api变为空
                }
            }
        }
    }
}
```
