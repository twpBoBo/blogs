# UNI-APP开发

## 标签（组件）

**body的元素选择器请改为page**

以前是html标签，比如`<div>`，现在是小程序组件，比如`<view>`。 那么`标签`和`组件`有什么区别，不都是用尖括号包围起来一段英文吗？ 其实标签是老的概念，标签属于浏览器内置的东西。但组件，是可以自由扩展的。 类似你可以把一段js封装成函数或模块，你也可以把一个ui控件封装成一个组件。

`uni-app`参考小程序规范，提供了一批内置组件。

下为html标签和uni-app内置组件的映射表：

- div 改成 [view](https://uniapp.dcloud.io/component/view)
- span、font 改成 [text](https://uniapp.dcloud.io/component/text)
- a 改成 [navigator](https://uniapp.dcloud.io/component/navigator)
- img 改成 [image](https://uniapp.dcloud.io/component/image)
- [input](https://uniapp.dcloud.io/component/input) 仅仅是输入框。 原html规范中input不仅是输入框，还有radio、checkbox、时间、日期、文件选择功能。在uni-app和小程序规范中，input仅仅是输入框。其他功能uni-app有单独的组件或API：[radio组件](https://uniapp.dcloud.io/component/radio)、[checkbox组件](https://uniapp.dcloud.io/component/checkbox)、[时间选择](https://uniapp.dcloud.io/component/picker?id=时间选择器)、[日期选择](https://uniapp.dcloud.io/component/picker?id=日期选择器)、[图片选择](https://uniapp.dcloud.io/api/media/image?id=chooseimage)、[视频选择](https://uniapp.dcloud.io/api/media/video?id=choosevideo)、[多媒体文件选择(含图片视频)](https://uniapp.dcloud.io/api/media/video?id=choosemedia)、[通用文件选择](https://uniapp.dcloud.io/api/media/file?id=choosefile)。
- [form](https://uniapp.dcloud.io/component/form)、[button](https://uniapp.dcloud.io/component/button)、[label](https://uniapp.dcloud.io/component/label)、[textarea](https://uniapp.dcloud.io/component/textarea)、[canvas](https://uniapp.dcloud.io/component/canvas)、[video](https://uniapp.dcloud.io/component/video) 这些还在。
- select 改成 [picker](https://uniapp.dcloud.io/component/picker)
- iframe 改成 [web-view](https://uniapp.dcloud.io/component/web-view)
- ul、li没有了，都用view替代。做列表一般使用[uList组件](https://ext.dcloud.net.cn/plugin?id=24)
- audio 不再推荐使用，改成api方式，[背景音频api文档](https://uniapp.dcloud.io/api/media/background-audio-manager?id=getbackgroundaudiomanager) 其实老的HTML标签也可以在uni-app里使用，uni-app编译器会在编译时把老标签转为新标签，比如把div编译成view。但不推荐这种用法，调试H5端时容易混乱。

**除了改动外，新增了一批手机端常用的新组件**

- scroll-view [可区域滚动视图容器](https://uniapp.dcloud.io/component/scroll-view)

- swiper [可滑动区域视图容器](https://uniapp.dcloud.io/component/swiper)

- icon [图标](https://uniapp.dcloud.io/component/icon)

- rich-text [富文本（不可执行js，但可渲染各种文字格式和图片）](https://uniapp.dcloud.io/component/rich-text)

- progress [进度条](https://uniapp.dcloud.io/component/progress)

- slider [滑块指示器](https://uniapp.dcloud.io/component/slider)

- switch [开关选择器](https://uniapp.dcloud.io/component/switch)

- camera [相机](https://uniapp.dcloud.io/component/camera)

- live-player [直播](https://uniapp.dcloud.io/component/live-player)

- map [地图](https://uniapp.dcloud.io/component/map)

- cover-view [可覆盖原生组件的视图容器](https://uniapp.dcloud.io/component/cover-view?id=cover-view)

  cover-view需要多强调几句，uni-app的非h5端的video、map、canvas、textarea是原生组件，层级高于其他组件。如需覆盖原生组件，则需要使用cover-view组件。详见[层级介绍](https://uniapp.dcloud.net.cn/component/native-component)

除了内置组件，还有很多开源的扩展组件，把常用操作都进行封装，DCloud建立了插件市场收录这些扩展组件，详见[插件市场](https://ext.dcloud.net.cn/)

## JS变化

- **以前的dom操作，改成vue的MVVM模式**

现在前端趋势是去dom化，改用mvvm模式，更简洁的写法，大幅减少代码行数，同时差量渲染性能更好。

uni-app使用vue的数据绑定方式解决js和dom界面交互的问题。

现在的做法，是vue的绑定模式，给这个dom元素绑定一个js变量，在script中修改js变量的值，dom会自动变化，页面会自动更新渲染

## 和微信小程序不同

**绑定动态属性、值和事件都和vue一样**

如果你学过小程序的数据绑定，但不了解vue，要注意：

- 小程序的数据绑定参考了vue，但自己修改了一些。在uni-app中只支持标准的vue，不支持小程序的数据绑定语法

  ```js
  	<button :type="buttontype" @click="changetextvalue()">修改为789</button><!-- 这里演示了属性和事件的绑定 --
  ```

  

  - 小程序里的setData在uni-app里并不存在，因为vue是自动双向数据绑定的。直接通过赋值方式修改数据，如果数据绑定到界面上，界面会自动更新渲染

    

## 和小程序一样

样式的大小单位：rpx

pages.json配置文件

页面的生命周期

## 组件通信

自定义事件uni-app的升级版

子组件可以修改父组件传来的值，并返回给我们的父组件

使用xxx.sync='xxx'



```js
//父组件
data() {
		return {
			name: '精选',
        }
}
<tabs-mycom :name.sync="name">
    

 //子组件
 this.$emit('update:name',name)
```



## js api的变化

因为uni-app的api是参考小程序的，所以和浏览器的js api有很多不同，如

1. alert,confirm 改成 [uni.showmodel](https://uniapp.dcloud.io/api/ui/prompt?id=showmodal)
2. ajax 改成 [uni.request](https://uniapp.dcloud.io/api/request/request)
3. cookie、session 没有了，local.storage 改成 [uni.storage](https://uniapp.dcloud.io/api/storage/storage?id=setstorage)

uni-app的js api还有很多，但基本就是小程序的api，把wx.xxx改为uni.xxx即可。[详见](https://uniapp.dcloud.io/api/README)

uni-app在不同的端，支持条件编译，无限制的使用各端独有的api，[详见条件编译](https://uniapp.dcloud.io/platform)

## 工程结构和页面管理

uni-app的工程结构有单独的要求，[详见](https://uniapp.dcloud.io/frame?id=目录结构)

每个可显示的页面，都必须在 [pages.json](https://uniapp.dcloud.io/collocation/pages) 中注册。如果你开发过小程序，那么pages.json类似app.json。如果你熟悉vue，这里没有vue的路由，都是在pages.json里管理。

原来工程的首页一般是index.html或default.html，是在web server里配的。而uni-app的首页，是在pages.json里配的，page节点下第一个页面就是首页。一般在/pages/xx的目录下。

app和小程序中，为了提升体验，页面提供了原生的导航栏和底部tabbar，注意这些配置是在pages.json中做，而不是在vue页面里创建，但点击事件的监听在显示的vue页面中做。

如果你熟悉小程序开发的话，对比变化如下：

- 原来app.json被一拆为二。页面管理，被挪入了uni-app的pages.json；非页面管理，挪入了manifest.json
- 原来的app.js和app.wxss被合并到了app.vue中

# 其实就是微信小程序和vue的结合 （可跨平台）

**完全可以使用vue来开发**



# 使用vscode来开发uni-app(留个坑)

其实总的来说还是无法完全脱离HBuilder X的，但是因为一直使用vs code开发习惯了 使用HBuilder X真的很不上手 所以我们可以使用这个方法

1. 使用 `HBuilder X` 运行项目，将它运行到你想要的平台 
2. 使用 `VsCode` 打开要开发的项目
3. 在  VSCode中安装插件：
   1. [uni-helper](https://marketplace.visualstudio.com/items?itemName=ModyQyW.vscode-uni-helper)
   2. [uni-app-snippets](https://marketplace.visualstudio.com/items?itemName=ModyQyW.vscode-uni-app-snippets)
   3. [uni-app-schemas](https://marketplace.visualstudio.com/items?itemName=ModyQyW.vscode-uni-app-schemas)
   4. [uni-ui-snippets](https://marketplace.visualstudio.com/items?itemName=ModyQyW.vscode-uni-ui-snippets)
4. 最后只要在vscode中进行代码的开发就好了 保存文件后会自动运行

# 自定义导航栏（头部）

pages.json配置路由是否使用默认的导航

```json
	{
			"path": "pages/home/home",
			"style": { 
				"navigationStyle": "custom" //不显示默认导航
			}
		},
```

还需要在页面中设置一个占位的元素

```html
	<view class="status_bar"><!-- 这里是状态栏 --></view>
	
	 .status_bar {
	        height: var(--status-bar-height);
	        width: 100%;
	    }
```

# 样式

**样式响应式想要神马是响应式就给他一个rpx**

## 样式单位换算

**举例说明：**

1. 若设计稿宽度为 750px，元素 A 在设计稿上的宽度为 100px，那么元素 A 在 `uni-app` 里面的宽度应该设为：`750 * 100 / 750`，结果为：100rpx。
2. 若设计稿宽度为 640px，元素 A 在设计稿上的宽度为 100px，那么元素 A 在 `uni-app` 里面的宽度应该设为：`750 * 100 / 640`，结果为：117rpx。
3. 若设计稿宽度为 375px，元素 B 在设计稿上的宽度为 200px，那么元素 B 在 `uni-app` 里面的宽度应该设为：`750 * 200 / 375`，结果为：400rpx。



# easycom

# 自定义组件/ui库

> `HBuilderX 2.5.5`起支持`easycom`组件模式。

传统vue组件，需要安装、引用、注册，三个步骤后才能使用组件。**`easycom`将其精简为一步**。 只要组件**安装在项目根目录或uni_modules的components目录下**，并符合`components/组件名称/组件名称.vue`或`uni_modules/插件ID/components/组件名称/组件名称.vue`目录结构。就可以不用引用、注册，直接在页面中使用。 

不管components目录下安装了多少组件，`easycom`打包后会自动剔除没有使用的组件，对组件库的使用尤为友好。

在[uni-app插件市场](https://ext.dcloud.net.cn/)下载符合`components/组件名称/组件名称.vue`目录结构的组件，均可直接使用。

`easycom`是自动开启的，不需要手动开启，有需求时可以在`pages.json`的`easycom`节点进行个性化设置，如关闭自动扫描，或自定义扫描匹配组件的策略.**看文档**

# 内置的底部导航栏

// 配置tabBar导航栏
	// "tabBar": {
	// 		"borderStyle": "#CCC",
	// 		"selectedColor": "#000000",
	// 		"color": "#444444",
	// 		"backgroundColor": "#ffffff",
	// 		"list": [
	// 			{
	// 				"pagePath": "pages/home/home",
	// 				"iconPath": "static/tabBar/shouye.png",
	// 				"selectedIconPath": "static/tabBar/shouyeS.png",
	// 				"text": "首页"
	// 			},
	// 			{
	// 				"pagePath": "pages/video/video",
	// 				"iconPath": "static/tabBar/video.png",
	// 				"selectedIconPath": "static/tabBar/videoS.png",
	// 				"text": "视频"
	// 			},
	// 			{
	// 				"pagePath": "pages/circle/circle",
	// 				"iconPath": "static/tabBar/quanzi.png",
	// 				"selectedIconPath": "static/tabBar/quanziS.png",
	// 				"text": "圈子"
	// 			},
	// 			{
	// 				"pagePath": "pages/discover/discover",
	// 				"iconPath": "static/tabBar/faxian.png",
	// 				"selectedIconPath": "static/tabBar/faxianS.png",
	// 				"text": "发现"
	// 			},
	// 			{
	// 				"pagePath": "pages/my/my",
	// 				"iconPath": "static/tabBar/31wode.png",
	// 				"selectedIconPath": "static/tabBar/31wodeS.png",
	// 				"text": "我的"
	// 			}
	// 		]
	// },

# 自定义导航栏（tabBar底部）

**有bug 第一次加载，切换页面会闪动**

custom-tarbar.vue

pages.json配置z只配置路由就行

```js
// 配置tabBar导航栏
"tabBar": {
		"list": [
			{
				"pagePath": "pages/home/home"
			},
			{
				"pagePath": "pages/video/video"
			},
			{
				"pagePath": "pages/circle/circle"
			},
			{
				"pagePath": "pages/discover/discover"
			},
			{
				"pagePath": "pages/my/my"
			}
		]
},
```

新建组件custom-tarbar

```vue
<template>
	<view>
		<view class="tabbar-list" :style="{background:tabBar.backgroundColor, color:tabBar.color }">
			<view class="tabbar-item" v-for="item,index in tabBar.list" :key="index" @click.top="setSelected(index)">
				<view class="img">
					<image :src="index == selected ? item.selectedIconPath : item.iconPath" mode=""></image>
				</view>
				<view class="tit">{{item.text}}</view>
				</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'custom-tarbar',
	props: ['selected'],
	data() {
		return {
			tabBar:{
				borderStyle: '#CCC',
				selectedColor: '#000000',
				color: '#444444',
				backgroundColor: '#ffffff',
				list: [
					{
						pagePath: '/pages/home/home',
						iconPath: require('@/static/tabBar/shouye.png'),
						selectedIconPath: require('@/static/tabBar/shouyeS.png'),
						text: '首页'
					},
					{
						pagePath: '/pages/video/video',
						iconPath: require('@/static/tabBar/video.png'),
						selectedIconPath: require('@/static/tabBar/videoS.png'),
						text: '视频'
					},
					{
						pagePath: '/pages/circle/circle',
						iconPath: require('@/static/tabBar/quanzi.png'),
						selectedIconPath: require('@/static/tabBar/quanziS.png'),
						text: '圈子'
					},
					{
						pagePath: '/pages/discover/discover',
						iconPath: require('@/static/tabBar/faxian.png'),
						selectedIconPath: require('@/static/tabBar/faxianS.png'),
						text: '发现'
					},
					{
						pagePath: '/pages/my/my',
						iconPath: require('@/static/tabBar/31wode.png'),
						selectedIconPath: require('@/static/tabBar/31wodeS.png'),
						text: '我的'
					}
				]
			}
		};
	},
	methods:{
		setSelected(index){
			console.log(index);
			uni.switchTab({
				url:this.tabBar.list[index].pagePath
			})
		}	
	}
};
</script>

<style lang="scss">
	.tabbar-list{
		z-index: 999;
		width: 100%;
		height: 120rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-shadow: 0 1rpx 10rpx black;
		.img{
			image{
				width: 60rpx;
				height: 60rpx;
			}
		}
		.tit{
			font-size: 28rpx;
			color: #b5b5b5;
		}
	}
</style>

```

使用并传入当前的索引（用于样式切换）

```html
<custom-tarbar :selected="0"/> 
```

# 第二中方法

**彻底放弃tabbar**

使用和vue一样的方法

创建一个主页来包含需要底部导航的页面

**小程序页面生命周期不起作用**！！！！放弃

```vue
<template>
	<view>
		<view>
			<component :is="comName"></component>
		</view>
		<custom-tarbar :Active.sync="Active"/> //传样式选中的索引 
	</view>
</template>

<script>
	import homeD from "../home/home.vue"
	import circleD from "../circle/circle.vue"
	import discoverD from "../discover/discover.vue"
	import myD from "../my/my.vue"
	import videoD from "../video/video.vue"
	export default {
		name:"MsterPage",
		data() {
			return {
				comName:'homeD',
				Active:0
			};
		},
		watch:{
			Active(value){
				console.log(value);
				switch(value){
					case 0:
					this.comName="homeD"
					break;
					case 1:
					this.comName="videoD"
					break;
					case 2:
					this.comName="circleD"
					break;
					case 3:
					this.comName="discoverD"
					break;
					case 4:
					this.comName="myD"
					break;
				}
			}	
		},
		components:{
			homeD,
			circleD,
			discoverD,
			myD,
			videoD
		},
		methods:{
			onTabItemTap(){
				
			}
		}
	}
</script>
<style lang="scss">

</style>

```

**使用uni的自定义事件 让子组件可以改变父组件中的值来实现样式和动态组件的切换**

```js
methods:{
		setSelected(index){
			this.$emit('update:active',index)
			console.log(index);
			uni.navigateTo({
				url:this.tabBar.list[index].pagePath
			})
		}	
	}
```

跳转时使用 

```js
uni.navigateTo({
				url:this.tabBar.list[index].pagePath
			})
不用
uni.switchTab({})
```

# cnm!!!!!

小程序中，uniapp的ref要绑定在子组件中才能被获取，如果绑定在view，是获取不了的，你得把业务写在一个组件来引用才行。

h5则没有这种情况。

1.uniapp vue 的 ref绑定不能用于内置组件 (view这些) 

2.[uni-app](https://so.csdn.net/so/search?q=uni-app&spm=1001.2101.3001.7020)修改data里的数组某个值 要用 this.$set(this.arr, index, value);

3.uniapp 只能获取DOM，不能操作DOM元素

# 底部点击效果(无js)

```html
<view class="anmition" hover-class="anmition-1">
```

```scss
@keyframes pulse {
	0%{
		transform: translate(-50%) scale(0);
		opacity: 1;
	}
	100%{
		transform: translate(-50%) scale(30);
		opacity: 0;
	}
}


.anmition-1{
			animation: pulse 1.5s linear;
		}
		.anmition{
			position: absolute;
			top:50%;
			left:50%;
			transform: translate(-50%);
			background-color: rgba(0, 0, 0, 0.2);
			opacity: 0;
			border-radius: 50%;
			width: 80rpx; //尽量大一点
			height: 80rpx;
			}
```

# 自定义tabs标签组件

它那个底部横线偏移有点问题！！！ 认真去计算需要考虑的因素态多了

**导航条**

```vue
<template>
	<view>
	<view class="tabs">
		<view class="tabs-item" v-for="item,index in list" :key="index" @click="select(item.name,index)">
			<view class="tit":style="item.name ==name? style:''">
				{{item.name}}
			</view>
		</view>
	</view>
	<view class="selectlinwrp">
		<view class="selectlin" :style="{left:anmitionLeft}"></view>
	</view>
	</view>
</template>
<script>
	export default {
		name:"tabs-mycom",
		props:['list'],
		data() {
			return {
				name:'精选',
				style:{
					fontSize: '28rpx',
					fontWeight: 'bold',
				},
				anmitionLeft:'2%'
				
			};
		},
		methods:{
			select(name,index){
				this.name=name
				if(index==0){
					this.anmitionLeft=`2%`
				}else if(index==this.list.length-1){
					this.anmitionLeft=`94%`
				}else{
					let offset=100/(this.list.length-1)
					console.log(offset);
					this.anmitionLeft=`${offset*index-2}%`
				}
			}
		},

	}
</script>

<style lang="scss">
.tabs{
	width: 100%;
	display: flex;
	justify-content: space-between;
	text-align: center;
	position: relative;
	.tit{
		padding: 10rpx;
	}
}
.selectlinwrp{
		position: relative;
		margin: 0 10rpx;
		box-sizing: border-box;
		.selectlin{
			position: absolute;
			height: 5rpx;
			width: 30rpx;
			background-color: red;
			bottom: 0;
			left:0;
			transition: left 0.5s linear;
		}
	}
</style>
```

使用给标题

```vue
data() {
		return {
			list:[
				{
					name:'精选'
				},
				{
					name:'刷一刷'
				},
				{
					name:'好事鲜'
				},
				{
					name:'视频'
				}
			]
		};
<tabs-mycom :list="list"></tabs-mycom>
```

# 新添加内容块

#### 完整的 

滑动条有误差

```vue
<template>
	<view class="tabs-com">
	<view class="tabs" :style="{padding:`0 ${boxP}rpx`}">
		<view class="tabs-item" v-for="item,index in list" :key="index" @click="select(item.name,index)">
			<view class="tit":style="item.name ==name? style:''">
				{{item.name}}
			</view>
		</view>
	</view>
	<view class="selectlinwrp" :style="{margin:`0 ${boxP}rpx`}">
		<view class="selectlin" :style="{left:anmitionLeft}"></view>
	</view>
		<view class="contenWrap" :style="{width:`${list.length*100}%`,left:boxLeft}" >
			<view class="conten" v-for="item,index in list" :key="index">
				<slot :name="index+1"></slot>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name:"tabs-mycom",
		props:['list','boxP'],
		data() {
			return {
				name:'精选',
				boxLeft:'0',
				style:{
					fontSize: '32rpx',
					fontWeight: 'bold',
				},
				anmitionLeft:'4%',
				// 需要传值过来
				// boxwidth:'',
			};
		},
		methods:{
			select(name,index){
				this.name=name
				this.$emit('update:name',name)
				this.boxLeft=`-${index*100}%`
				if(index==0){
					this.anmitionLeft=`4%`
				}else if(index==this.list.length-1){
					this.anmitionLeft=`90%`
				}else{
					let offset=100/(this.list.length-1)
					console.log(offset);
					this.anmitionLeft=`${offset*index-2}%`
				}
			}
		},

	}
</script>

<style lang="scss">
.tabs-com{
		.contenWrap{
			position: relative;
			left: 0;
			top: 0;
			margin-top: 10rpx;
			display: flex;
			transition: left 0.2s linear;
			.conten{
				width: 100%;
				background-color: red;
			}
		}

.tabs{
	width: 100%;
	display: flex;
	justify-content: space-between;
	text-align: center;
	position: relative;
	box-sizing: border-box;
	.tit{
		padding:0 10rpx 10rpx;
	}
}
.selectlinwrp{
		position: relative;
		box-sizing: border-box;
		.selectlin{
			position: absolute;
			height: 5rpx;
			width: 30rpx;
			border-radius: 10rpx;
			background-color: red;
			bottom: 0;
			left:0;
			transition: left 0.3s linear;
		}
	}
}
</style>
```

使用

```HTML
<view class="bigConten">
			<tabs-mycom :list="list" :name.sync="name" :boxP="boxP"> //
				<template v-slot:1>
					<view>Here might be a page title</view>
				</template>
				<template v-slot:2>
					<view>A paragraph for the main content.</view>
					<view>And another one.</view>
				</template>
				<template v-slot:3>
					<view>Here's some contact info</view>
				</template>
				<template v-slot:4>
					<view>Here's some contact info</view>
				</template>
			</tabs-mycom>
		</view>
```

**bug依然存在**

大概思路就是

想切换内容时使用使用具名插槽来区分内容块,命名要让组件能循环遍历

因为前面我们传了标签名过去了，标签和内容块是对应的所以我直接使用我们标签列表做我们循环体

```html
	<view class="conten" v-for="item,index in list" :key="index">
				<slot :name="index+1"></slot> //更具插槽名和循环的关系遍历内容块
	</view>
```

#### 终极版

**bug修复减少了滑动条的误差**

```vue
<template>
	<view class="tabs-com">
	<view class="tabs" :style="{padding:`0 ${boxP}rpx`}">
		<view class="tabs-item" v-for="item,index in list" :key="index" @click="select(item.name,index)">
			<view class="tit":style="item.name ==name? style:''">
				{{item.name}}
			</view>
		</view>
	</view>
	<view class="selectlinwrp" :style="{margin:`0 ${boxP+10}rpx`}">
		<view class="selectlin" :style="anmitionLeft"></view>
	</view>
		<view class="contenWrap" :style="{width:`${list.length*100}%`,left:boxLeft}" >
			<view class="conten" v-for="item,index in list" :key="index">
				<slot :name="index+1"></slot>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name:"tabs-mycom",
		props:['list','boxP'],
		data() {
			return {
				name:'精选',
				boxLeft:'0',
				style:{
					fontSize: '32rpx',
					fontWeight: 'bold',
				},
				anmitionLeft:{
					left:'0'
				}
			};
		},
		methods:{
			select(name,index,event){
				console.log(event);
				this.name=name
				this.$emit('update:name',name)
				this.boxLeft=`-${index*100}%`
				if(index==0){
					this.anmitionLeft={left:`0%`}
				}else if(index==this.list.length-1){
					this.anmitionLeft={left:`100%`,transform: "translateX(-100%)"}
				}else{
					let offset=100/(this.list.length-1)
					console.log(offset);
					this.anmitionLeft={left:`${offset*index}%`,transform: "translateX(-50%)"}
                    //使用transform来减小误差！！！
				}
			}
		},

	}
</script>

<style lang="scss">
.tabs-com{
		.contenWrap{
			position: relative;
			left: 0;
			top: 0;
			margin-top: 10rpx;
			display: flex;
			transition: left 0.2s linear;
			.conten{
				width: 100%;
			}
		}

.tabs{
	width: 100%;
	display: flex;
	justify-content: space-between;
	text-align: center;
	position: relative;
	box-sizing: border-box;
	.tit{
		font-size: 30rpx;
		padding:0 10rpx 10rpx;
	}
}
.selectlinwrp{
		position: relative;
		background-color: red;
		box-sizing: border-box;
		// width: 100%;
		height: 10rpx;
		// margin: 10rpx;
		.selectlin{
			transition: all 0.3s linear;
			position: absolute;
			height: 10rpx;
			width: 60rpx;
			border-radius: 10rpx;
			background-color: black;
			bottom: 0;
			// left:0;
			// right: 0;
		}
	}
}
</style>
```

**问题：这样会不会 一开我们页面需要加载的东西太多啊**

**考虑懒加载！！**

**草拟吗的两个自定义的都用不了好难受啊**

# 自定义tabs标签组件（滑动的）

**你给我等着**

## 无敌了

使用我的自定义的组件（主要用于标签栏切换）
配合我们的swiper（用于内容切换）

bug还在（切换的样式条o(╥﹏╥)o）

```html
	<view class="bigConten">		//把索引给组件，组件根据索引做响应的事
			<tabs-mycom :list="list" :current.sync="current" :boxP="boxP"></tabs-mycom>
			<swiper class="swiper-box" :current="current" @change="change" >
				<swiper-item v-for="(item, index) in [1,2,3,4]" :key="index">
					{{item}}
				</swiper-item>
			</swiper>
		</view>
```

```
	current: 0, //给一个索引， 也就是当前页 
```

```js
	change(e){
			this.current = e.detail.current; //内容切换 更改索引
	}
```

组件

```vue
<template>
	<view class="tabs-com">
		<view class="navwrap" :style="{padding:`${boxH}rpx 0`}">
			<view class="tabs" :style="{ padding: `0 ${boxP}rpx` }">
				<view class="tabs-item" v-for="(item, index) in list" :key="index" @click="select(index)">
					<view class="tit" :style="index == current ? style : ''">{{ item.name }}</view>
				</view>
			</view>
			<view class="selectlinwrp" :style="{ margin: `0 ${boxP + 10}rpx` }"><view class="selectlin" :style="anmitionLeft"></view></view>
		</view>
	</view>
</template>
<script>
export default {
	name: 'tabs-mycom',
	props: ['list', 'boxP', 'boxH','current'],
	data() {
		return {
			style: {
				fontSize: '32rpx',
				fontWeight: 'bold'
			},
			anmitionLeft: {
				left: '0'
			}
		};
	},
	watch:{
	current(value){
		this.roll(value)
	}	
	},
	methods: {
		select(index) {
			console.log(index); 
			this.$emit('update:current', index); //点击改变标签内容改变的关键
			this.roll(index)
		},
		// 滚动
		roll(current){
			if (current == 0) {
				this.anmitionLeft = { left: `0%` };
			} else if (current == this.list.length - 1) {
				this.anmitionLeft = { left: `100%`, transform: 'translateX(-100%)' };
			} else {
				let offset = 100 / (this.list.length - 1);
				this.anmitionLeft = { left: `${offset * current}%`, transform: 'translateX(-50%)' };
			}
		}
	}
};
</script>

<style lang="scss">
.tabs-com {
.navwrap{
		.tabs {
		width: 100%;
		display: flex;
		justify-content: space-between;
		text-align: center;
		align-items: center;
		position: relative;
		box-sizing: border-box;
		.tit {
			font-size: 30rpx;
			padding: 0 10rpx 10rpx;
		}
	}
	.selectlinwrp {
		position: relative;
		background-color: red;
		box-sizing: border-box;
		.selectlin {
			transition: all 0.3s linear;
			position: absolute;
			height: 5rpx;
			width: 60rpx;
			border-radius: 10rpx;
			background-color: #caf6dd;
		}
	}
}
}
</style>

```

## swipe高度自适应

```js
<swiper-item>
		<view id="conten-wrap0"><choiceness-p /></view>
</swiper-item>
```

```js
setHeight() {
			let _this=this
			let element = '#conten-wrap' + this.current;
			let query = uni.createSelectorQuery().in(this);
			query.select(element).boundingClientRect();
			query.exec(res => {
				console.log(res[0].height);
				if (res && res[0]) {
					_this.swipeHeight = res[0].height;
				}
			});
		}
//获取 内容区的高度，通过uni的api可以获取dom的信息
```

```
<swiper class="swiper-box" :style="{ height: swipeHeight+'px'}" ></swiper>
//动态生成swipe的高度
```

**！！！如果同一个页使用多个swipe来做滑动切换tabs，记得把获取内高度的盒子的标识改一下（class，id）**

# 下拉刷新mescroll使用

## mescroll-uni

局部区域滚动 (如嵌在弹窗,浮层中)就用**mescroll-uni**

```
<template>
	<view class="journalism">
		<view class="head">
			<view class="img"></view>
			<view class="abstract">
				<text class="fwb">摘要 |</text>
				<text class="fc-c ml-5">果业类新闻资讯</text>
			</view>
		</view>
		<view class="segmentation"></view>
		<view class="j-conten">
			<mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :fixed="false" :height="listHeight + '%'" :down="downOption" :up="upOption">
			<view class="c-items" v-for="item in list">
				<view class="text">
					<view class="tit">
						【<text class="tcolor">#专题#</text>】多功能履带式旋耕机，多用途配套
					</view>
					<view class="up">
						<view class="author">
							老默我想吃鱼了
						</view>
						<text>02-22</text>
					</view>
				</view>
				<view class="img">
					
				</view>
			</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin],
	data() {
		return {
			list: 0,
			listHeight: 100
		};
	},
	methods: {
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback(page) {
			//联网加载数据 模拟请求
			try {
				setTimeout(() => {
					if (page.num > 1) {
						this.list = this.list + 10;
					}
					this.mescroll.endByPage(10, 3); //必传参数(当前页的数据个数, 总页数)
				}, 1000);
				//设置列表数据
				if (page.num == 1) {
					this.list = 10; //如果是第一页需手动 初始化数据
				}
				console.log('upCallback', page.num);
			} catch {
				this.mescroll.endErr();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.journalism {
	.head {
		padding: 0 30rpx;
		.img {
			height: 270rpx;
			border-radius: 20rpx;
			width: 100%;
			border: 1px solid #ccc;
			background-color: #5ae192;
		}
		.abstract {
			height: 70rpx;
			line-height: 70rpx;
			margin-top: 20rpx;
		}
	}
	.segmentation {
		width: 100%;
		height: 10rpx;
		background-color: #f1f1f1;
	}
	.j-conten{
		padding: 0 10rpx;
		.c-items{
			display: flex;
			justify-content: center;
			// align-items: center;
			min-height: 120rpx;
			padding:30rpx 0;
			border-bottom: 1px solid #ccc;
			.text{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				flex-grow: 1;
				.tit{
					font-weight: bold;
					.tcolor{
						color: #5f6e8f;
					}
				}
			
				.up{
					display: flex;
					justify-content: space-between;
					color: #a3a3a3;
				}
			}
			.img{
				margin-left: 30rpx;
				border-radius: 20rpx;
				border: 1px solid #ccc;
				height: 170rpx;
				width: 170rpx;
			}
		}
		.bottom{
			text-align: center;
			height: 100rpx;
			line-height: 100rpx;
		}
	}
}
</style>

```

## mescroll-body

全屏滚动，内嵌原生组件的推荐使用**mescroll-body** 有点问题不用你了

```
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
```

## 自定义配置

# ThorUI组件库(yyds)

# 路由传参

一、在方法中

```
	uni.navigateTo({
				url:`/pages/detail/detail?data=${999})}`,
})
```

二、在模板中

```
:url="`/pages/home/video/type/type?data=${JSON.stringify(item)}`"
```

获取在跳转去到的页面中：

```
onLoad(option){
			console.log(option);
}
```

# 拓展icon

https://uniapp.dcloud.net.cn/component/uniui/uni-icons.html

# 请求封装

### 对uni请求二次封装

```js
const baseUrl = 'http://127.0.0.1:8099';
const request = (option) => {
	return new Promise((resolve, reject) => {
		let header = {
			'content-type': 'application/x-www-form-urlencoded'，
			Authorization: uni.getStorageSync('token') //带token 
	
		}
		uni.request({
			method: option.method,
			url: baseUrl + option.url,
			data: option.data,
			header: header,
			dataType: 'json',
		}).then((response) => {
			setTimeout(function() {
				uni.hideLoading();
			}, 200);
			let [error, res] = response;
			resolve(res.data);
		}).catch(error => {
			let [err, res] = error;
			reject(err)
		})
	});
}
export default request
```

### 统一api

```js
import request from './request.js'
export const register =(data)=>{
	return request({
		method: 'GET',
		url: '/test',
		data
	})
}
```

### 调用接口

```js
	async onShow() {
		let res = await register({ a: 1 });
		console.log(res);
	},
```

# 登录拦截器

使用Api。uni.addInterceptor（）

创建router/index.js

```js
// 页面黑名单，拦截
const whiteList = [
	'/pages/mutual/mutual',
]
function hasPermission (url) {
	let islogin = sessionStorage.getItem("isLogin");//在这可以使用token、vuex
	islogin = Boolean(Number(islogin));//返回布尔值
    // 在白名单中或有登录判断条件可以直接跳转
    if(whiteList.indexOf(url) == -1 || islogin) {
        return true
    }
    return false
}
uni.addInterceptor('navigateTo', {
    // 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转
    invoke (e) {
        if(!hasPermission(e.url)){
			//只要是未登录状态，想要跳转到名单内的路径时，直接跳到登录页
            uni.reLaunch({
                url: '/pages/login/login'
            })
			console.log(1);
            return false
        }
        return true
    },
    success (e) {
    }
})
```

在main.js中引用

```
import './router/index';
```

# 登录

## 基本账号密码登录



# 云！！

## 一键登录

## 获取授权

# 滚动导航

# 跳到小程序

# 切换页面的动画
