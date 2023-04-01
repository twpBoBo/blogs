# 动画库animat使用

```js
import animate from "animate.css";
```

main.js 引入

```js
import animate from "animate.css";

Vue.use(animate);
```

给标签添加类名后便有动画效果

```html
<div class="animate__animated animate__fadeIn">内容部分</div>
```

## 把[router-view](https://so.csdn.net/so/search?q=router-view&spm=1001.2101.3001.7020)包装起来，当路由跳转展示出来的页面就会有动画效果，显得不会太生硬

```html
  <transition
      enter-active-class="animate__animated animate__lightSpeedInRight"
      leave-active-class="animate__animated animate__lightSpeedOutRight"
    >
      <router-view />
</transition>

```

## 官方警告解决办法

```js

    <router-view v-slot="{ Component }">
      <transition
        enter-active-class="animate__animated animate__lightSpeedInRight"
        leave-active-class="animate__animated animate__lightSpeedOutRight"
      >
        <component :is="Component" />
      </transition>
    </router-view>
```



## vue使用都要配合transition使用

就可以通过v-show和v-if 来使用动画隐藏和显示了

```js
<template>
  <div>
    <div>关于我们</div>
    <nav>
      <a href="javaScript:;" @click="show">出来</a>
    </nav>
    <transition
      enter-active-class="animate__animated animate__backInLeft"
      leave-active-class="animate__animated animate__backOutLeft"
    >
      <div class="my" v-if="isShow"></div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    show() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style>
.my {
  width: 500px;
  height: 500px;
  background-color: red;
  margin: 0 auto;
}
</style>

```

类名效果：

animate__infinite  循环播放

animate__delay-3s  延迟播放3秒 只能1~5秒

#  动画效果不能滥用，否则会本末倒置