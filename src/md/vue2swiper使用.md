# swiper（看官方文档）

# 方式一

## loop失效在new Swiper 时 加个定时器让它处于异步(可以解决)

npm install swiper@5.4.5 -D

swiper:  5.4.5 版本

main.js引入

 // vue2使用的swiper的版本不能太高5.4.5

import "swiper/css/swiper.min.css"



<template>
      <div class="swiper-container" id="swiper-container">
        <div class="swiper-wrapper img">
          <div class="swiper-slide item"><img src="../../common/img/home/banner1.png" alt=""></div>
          <div class="swiper-slide item"><img src="../../common/img/home/banner2.png" alt=""></div>
          <div class="swiper-slide item"><img src="../../common/img/home/banner1.png" alt=""></div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination">
        </div>
      </div>
</template>
<script>
import Swiper from 'swiper';
export default {
name:'Ban',
    mounted(){
     new Swiper ('.swiper-container', {
    loop: true,
    // 如果需要分页器
    pagination:{
      el:".swiper-pagination",
      clickable:true
    } 
  })
  }
}
</script>
<style lang="less" scope>
.swiper-pagination{
    // 小点的样式
    .swiper-pagination-bullet{
            border-radius: 50%;
            width: 30px;
            height: 30px;
        background-color: white;
        // opacity: 0.5;
    }
    .swiper-pagination-bullet-active{
        background-color: #8094e5;
            } 
    }
</style>

#### 图片跟着背景图一起轮播(网易云音乐项目)

```html
        <img class="bck abs" :src="list[Bindex].bac" alt />

```

```dart
  on: {
        //当切换时触发的方法
        slideChange: function() {
          // this.activeIndex 当前轮播图下标
          if (this.activeIndex  > _this.list.length) {
            _this.Bindex = 0;
          } else {
            _this.Bindex = this.activeIndex  - 1;
          }
        }
    }
```

## 动态获取图片滑动失效等 问题

#### 实例化swiper时 加下面两个参数

  **observer: true, //修改swiper自己或子元素时，自动初始化swiper**

   **observeParents: true, //修改swiper的父元素时，自动初始化swiper**

# 方式二（解决动态数据loop失效）

### 两个需要同时安装

npm install swiper@6.8.4 -D

npm install vue-awesome-swiper@3.1.3 --save 建议使用安装指定版本

### 全局main.js

```js
import VueAwesomeSwiper from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'//这里注意具体看使用的版本是否需要引入样式，以及具体位置。
   Vue.use(VueAwesomeSwiper, /* { default global options } */)
```

## 按需（局部）

```js
 import 'swiper/swiper-bundle.css'这里注意具体看使用的版本是否需要引入样式，以及具体位置。
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
```

# 具体配置分页按钮可上网查

## template

```html
<template>
  <!-- 轮播图 -->
  <div class="banner">
    <swiper ref="mySwiper" :options="swiperOptions" v-if="banners.length">
      <swiper-slide v-for="(item, index) in banners" :key="index">
        <img :src="item" alt="首页轮播图" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
```

## data

```js
  data() {
    return {
      swiperOptions: {
        watchSlidesVisibility: true /*避免出现bug*/,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        // 显示分页
        pagination: {
          el: '.swiper-pagination',
          clickable: true, //允许分页点击跳转
          type: 'bullets'
        },
        loop: true
      },
      banners: []
    }
  },
```

