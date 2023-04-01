## rem适配

#### 安装两个工具

```bash
// postcss-pxtorem 是一款 PostCSS 插件，用于将 px 单位转化为 rem 单位

npm i postcss-pxtorem --save-dev 

// 用于设置 rem 基准值 

npm i lib-flexible --save 

```

#### 在main.js导入amfe-flexible

```javascript
//import 'amfe-flexible'; ？？？？？？？？？？？？？？？？
import 'lib-flexible' //自适应
```

#### 配置postcss-pxtorem

可在vue.config.js、.postcssrc.js、postcss.config.js其中之一配置，权重从左到右降低，没有则新建文件，只需要设置其中一个即可：

##### 在vue.config.js配置如下：

```js
	module.exports = {
	    //...其他配置
	    css: {
	        loaderOptions: {
	            postcss: {
	                plugins: [
	                    require('postcss-pxtorem')({
	                        rootValue: 37.5,
	                        propList: ['*']
	                    })
	                ]
	            },
                sass: {
                    // 配置scss文件全局变量,没有分号会报错
                    data: `@import "@ui/common.scss";` // 旧版sass-loader写法(8.0以下)
                    // prependData: `@import "@ui/common.scss";` // 新版scss-loader(8.0及以上)
                }
	        }
	    },
	}
```
##### 在.postcssrc.js或postcss.config.js中配置如下（手动创建）

```js
	module.exports = {
	    "plugins": {
	        'postcss-pxtorem': {
	            rootValue: 37.5,
	            propList: ['*']
	        }
	    }
	}
```
rootValue根据设计稿宽度除以10进行设置，这边假设设计稿为375，即rootValue设为37.5；

propList是设置需要转换的属性，这边*为所有都进行转换。

###  解决最大跟字体大小为54px的问题

找到node_modules文件夹下的lib-flexible 搜索 refreshRem 把条件语句去掉

**mian.js引入 import 'lib-flexible' 解决！！！！**![null](http://doc.bufanui.com/uploads/yidongduankaifa/images/m_8fd9171cb8fb4fb230269266e8b2067d_r.png)

# 问题

##### CNM!!!!!!!

body设置的font-size不生效 要在标签中使用font-size（根据情况自己去调font-size）

没有找到更好的解决方法 ！！！！！！！！！！！！

# 