# vue 使用的组合式 aip

你要什么就引入什么 减小项目体积 ，提升打包速度

# 异步组件

[`defineAsyncComponent`](https://cn.vuejs.org/api/general.html#defineasynccomponent) 方法来实现此功能

```
import { defineAsyncComponent } from 'vue'
const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

注册

```js
与普通组件一样，异步组件可以使用 app.component() 全局注册：
app.component('MyComponent', defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
))

你也可以在局部注册组件时使用 defineAsyncComponent：
<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    AdminPage: defineAsyncComponent(() =>
      import('./components/AdminPageComponent.vue')
    )
  }
}
</script>

<template>
  <AdminPage />
</template>
```

# 动态数据

响应性基础 API

不是使用 data 函数

# setup 语法

使用 setup 语法糖后，**不用写 setup 函数；组件只需要引入不需要注册；属性和方法也不需要再返回，可以直接在 template 模板中使用**。
**<script setup> 是在单文件组件 (SFC) 中使用组合式 API 的编译时语法糖。当同时使用 SFC 与组合式 API 时该语法是默认推荐。相比于普通的 <script> 语法，它具有更多优势：**

更少的样板内容，更简洁的代码。

能够使用纯 TypeScript 声明 props 和自定义事件。

更好的运行时性能 (其模板会被编译成同一作用域内的渲染函数，避免了渲染上下文代理对象)。

更好的 IDE 类型推导性能 (减少了语言服务器从代码中抽取类型的工作)

## 基本例子

```js
<script setup>
import { ref, onMounted } from 'vue'

// 响应式状态
const count = ref(0)

// 更改状态、触发更新的函数
function increment() {
  count.value++
}

// 生命周期钩子
onMounted(() => {
  console.log(`计数器初始值为 ${count.value}。`)
})
</script>

<template>
  <button @click="increment">点击了：{{ count }} 次</button>
</template>
```

# pinan（vuex 升级版）

## 基础示例

下面就是 pinia API 的基本用法 (为继续阅读本简介请确保你已阅读过了[开始](https://pinia.vuejs.org/zh/getting-started.html)章节)。你可以先创建一个 Store：

```js
// stores/counter.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 };
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++;
    }
  }
});
```

**然后你就可以在一个组件中使用该 store 了：**

```js
<script setup>
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()
counter.count++
// with autocompletion ✨
counter.$patch({ count: counter.count + 1 })
// or using an action instead
counter.increment()
</script>
<template>
  <!-- Access the state directly from the store -->
  <div>Current Count: {{ counter.count }}</div>
</template>
```

为实现更多高级用法，你甚至可以使用一个函数 (与组件 setup() 类似) 来定义一个 Store：

```js
js;
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  function increment() {
    count.value++;
  }

  return { count, increment };
});
```

# toRef 和 toRefs

### toRefs 将对象数据类型解构且让他是响应式

```js
<template>
  <div class="">
    {{ name }}
    {{ twp }}
    {{ hah }}
  </div>
</template>

<script setup lang="ts">
import { toRefs, reactive, toRef } from 'vue'
// import { ref } from 'vue'
let obj = reactive({
  twp: 'twp',
  name: 'name',
  hah: 'hah'
})
const { name, twp, hah } = toRefs(obj)
setTimeout(() => {
  name.value = 'name2'
}, 1000)
```

### toRef 将对象数据类型解构且让他是响应式(单个)

```js
<!-- ? 模块 -->
<template>
  <div class="">
    {{ name }}
  </div>
</template>

<script setup lang="ts">
import { reactive, toRef } from 'vue'
// import { ref } from 'vue'
let obj = reactive({
  twp: 'twp',
  name: 'name',
  hah: 'hah'
})
const name = toRef(obj, 'name')
setTimeout(() => {
  name.value = 'name2'
}, 1000)
</script>

<style lang="scss" scoped></style>

```

# 小知识

## 透传 Attributes

Attributes **继承**

**在我们子组件 的样式在我们父组件有的时候使用 不用复写**

```js
<!-- <MyButton> 的模板 -->
<button>click me</button>

一个父组件使用了这个组件，并且传入了 class：
<MyButton class="large" />
最后渲染出的 DOM 结果是：

html
<button class="large">click me</button>
```

对 `class` 和 `style` 的**合并**

```js
<!-- <MyButton> 的模板 -->
<button class="btn">click me</button>

一个父组件使用了这个组件，并且传入了 class：
<MyButton class="large" />

则最后渲染出的 DOM 结果会变成：
<button class="btn large">click me</button>
```

`v-on` 监听器继承 **事件**也能传递

## 多层级传参 (setup 写法看 api)

解决 prop 多级组件传参麻烦的问题**有机会一定要用一下**

### Provide (提供)[#](https://cn.vuejs.org/guide/components/provide-inject.html#provide)

要**为组件后代提供数据**，需要使用到 [`provide`](https://cn.vuejs.org/api/options-composition.html#provide) 选项：

```js
export default {
  provide: {
    message: 'hello!'
  }
};
//setup
import { onMounted, provide, ref } from 'vue';
// 提供
provide('cunt', 1111);
```

如果我们需要提供**依赖当前组件实例的状态** (比如那些由 `data()` 定义的数据属性)，那么可以以函数形式使用 `provide`：

```js
export default {
  data() {
    return {
      message: 'hello!'
    }
  },
  provide() {
    // 使用函数的形式，可以访问到 `this`
    return {
      message: this.message
    }
  }
}
//setup
<!-- ? 模块 -->
<template>
  <div>{{ cunt }}</div>
</template>
<script setup lang="ts">
import { inject } from 'vue'
const cunt = inject('cunt')
console.log(cunt)
</script>

```

**然而，请注意这不会使注入保持响应性。**

### 应用层 Provide(全局注册？？) 看文档把

### Inject (注入)

```js
export default {
  inject: ['message'],
  created() {
    console.log(this.message); // injected value
  }
};
```

**这样就能穿透多级传值了**

### 响应式的 Provide 和 Inject

为保证注入方和供给方之间的响应性链接，我们需要使用 [computed()](https://cn.vuejs.org/api/reactivity-core.html#computed) 函数提供一个计算属性：

```js
import { computed } from 'vue'; //组合式api

export default {
  data() {
    return {
      message: 'hello!'
    };
  },
  provide() {
    return {
      // 显式提供一个计算属性
      message: computed(() => this.message)
    };
  }
};
```

# 自定义指令

**自动获取聚焦**

```js
//一个自定义指令由一个包含类似组件生命周期钩子的对象来定义。钩子函数会接收到指令所绑定元素作为其参数。下面是一个自定义指令的例子，当一个 input 元素被 Vue 插入到 DOM 中后，它会被自动聚焦：
const focus = {
  mounted: (el) => el.focus()
}
export default {
  directives: {
    // 在模板中启用 v-focus
    focus
  }
}
template
<input v-focus />
```

**将一个自定义指令全局注册到应用层级也是一种常见的做法：**

```
const app = createApp({})

// 使 v-focus 在所有组件中都可用
app.directive('focus', {
  /* ... */
})
vue3
createApp(App)
.directive('focus', {
  /* ... */
})
.xxx
```

# 自定义插件和指令

## Eslint Ts any 类型警告问题

解决在**eslintrc.js 文件**加入

```js
 '@typescript-eslint/no-explicit-any': ['off'] //加入这一行
```

## 类型“ComponentInternalInstance | null”上不存在属性“proxy”。ts(2339)

```js
const { proxy } = getCurrentInstance()   ;
修改为：

const { proxy } = getCurrentInstance()  as any ;
```

## 开始

创建插件

```ts
import myplug from '@/components/myplugC.vue';
export default {
  install: (app: any, options?: object) => {
    // 组件（利用这个可以注册全局组件）
    app.component('my-plug', myplug);
    // 指令
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.directive(
      'font-size',
      (el: any, binding: any, vnode?: any) => {
        let size = 16;
        switch (binding.arg) {
          case 'small':
            size = 16;
            break;
          case 'large':
            size = 32;
            break;
          default:
            size = 48;
            break;
        }
        el.style.fontSize = size + 'px';
      }
    );
    // 注入
    const clickMe: any = () => {
      console.log(options, '==========clickMe=========');
    };
    app.provide('clickMe', clickMe);
  }
};
```

## 注册

```ts
import { createApp } from 'vue';
import App from './App.vue';

import plug from '@/pluging/mypluging';
createApp(App)
  .use(plug, { small: 16, large: 32, default: 48 }) //在app实例上注册插件把app作为第一个参数，第二参数根据需求设置。
  .mount('#app');
```

## 使用

因为我们在 app 实例上注册的再**任何组件都能使用**

```ts
<template>
  <my-plug v-font-size:large></my-plug>
  <div @click="cMe">点我</div>
  <router-view />
</template>
<script lang="ts" setup>
import { inject } from 'vue';
const clickMe = inject('clickMe');
const cMe = () => {
  clickMe();
  console.log(clickMe);

  console.log(11);
};
</script>
<style></style>
```

感谢大哥https://www.51cto.com/article/715316.html

# 全局注册(方法)

## 方法一使用注入

```js
const globalFunc = () => {
  console.log('要挂载在全局的方法');
};
// 挂载全局方法
app.provide('globalFunc', globalFunc);

//组件使用

const globalFunc: any = inject('globalFunc');
globalFunc();
```

## app.config.globalProperties（不推荐）

main.js 中：通过 app.config.globalProperties 将组件或者方法、变量挂载在全局

```
function fun(){
	return 888
}
//挂载到全局方法
app.config.globalProperties.func = fun


```

**组件使用**

```vue
<template>
  <div @click="globalProperties">全局方法</div>
  <div>{{ proxy.sayHi() }}</div>
  <router-view />
</template>
<script lang="ts" setup>
import { getCurrentInstance } from 'vue';

// 使用globalProperties方法
const { proxy } = getCurrentInstance() as any; //解决类型报错使用as any
function globalProperties() {
  console.log(proxy.sayHi());
}
</script>
<style></style>
```

# vue3+vite+pinia+setup

node 16+

vue-cli 最新

vite 最新

npm install -g @vue/cli

npm install vite -g

创建项目

npm init vue@latest

scss 安装配置

npm install sass

![image-20230313162950000](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230313162950000.png)

![image-20230313163031611](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230313163031611.png)

## 配置 jsconfig.json

**能让 代码提示 变得更加友好**

```js
{
  "compilerOptions": {
    // "target": "es5",
    "module": "esnext",
    "baseUrl": "./",
    "moduleResolution": "node",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "vueCompilerOptions": {
    "experimentalDisableTemplateSupport": true
  }
}
```

**配置看团队代码风格**（这就是一个美化代码的插件工具）

```
{
    "printWidth": 120,
    "singleQuote": true,
    "bracketSpacing": true,
    "jsxBracketSameLine": false,
    "htmlWhitespaceSensitivity": "ignore",
    "useTabs": false,
    "tabWidth": 2,
    "endOfLine": "lf",
    "trailingComma": "none",
    "semi": true,
    "eslintIntegration": true
}
```

# 项目结构

**除了基本目录**

**hooks**：存放 => 公共常用的 hook （需要使用框架中的 api 的文件）类似（就是）react 中 hook

**mock**：存放 => 模拟接口数据

**service**：存放 => 接口请求 **把 api 换成 service**

**utils**：存放 =>工具函数（一般用于数据处理，时间处理，防抖，节流等 ）

**config**：存放 => 插件、第三方插件

# 样式重置

## 方法一

使用 normalize.css

npm i normalize.css

// 在 main.js 中引入
import 'normalize.css';

## 方法二

传统的 reset.css

网上一大堆

```css
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
font,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
caption {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
}

table,
tbody,
tfoot,
thead,
tr,
th,
td {
  margin: 0;
  padding: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
}

button,
input,
textarea {
  margin: 0;
  padding: 0;
}

/* form elements 表单元素 */

body,
button,
input,
select,
textarea {
  font: normal 12px/1.5 '\5FAE\8F6F\96C5\9ED1', tahoma, arial;
}

/* 设置的字体，行高 */
h1,
h2,
h3,
h4,
h5,
h6,
th {
  font-size: 100%;
  font-weight: normal;
}

/*重置标题*/

address,
cite,
dfn,
var {
  font-style: normal;
}

/* 将斜体扶正 */

code,
kbd,
pre,
samp {
  font-family: 'courier new', courier, monospace;
}

/* 统一等宽字体 */

small {
  font-size: 12px;
}

/* 小于 12px 的中文很难阅读，让 small 正常化 */

ul,
ol {
  list-style: none;
}

/* 重置列表元素 */

button,
input[type='submit'],
input[type='button'] {
  cursor: pointer;
}

input[type='radio'],
input[type='checkbox'],
input[type='submit'],
input[type='reset'] {
  vertical-align: middle;
  cursor: pointer;
  border: none;
}

/** 重置文本格式元素 **/

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

a:focus {
  outline: 0;
}

sup {
  vertical-align: text-top;
}

/* 重置，减少对行高的影响 */

sub {
  vertical-align: text-bottom;
}

/** 重置表单元素 **/

legend {
  color: #000;
}

/* for ie6 */

fieldset,
img {
  border: 0;
}

/* img 搭车：让链接里的 img 无边框 */

button,
input,
select,
textarea {
  background: transparent;
  font-size: 100%;
  outline: 0;
}

/* 使得表单元素在 ie 下能继承字体大小 */

/* 注：optgroup 无法扶正 */

table {
  border-collapse: collapse;
  border-spacing: 0;
}

td,
th {
  vertical-align: middle;
}

/** 重置表格元素 **/

/* 重置 HTML5 元素 */

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section,
summary,
time,
mark,
audio,
video {
  display: block;
  margin: 0;
  padding: 0;
}

/*回复标签重置*/

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  display: none;
}
```

// 在 main.js 中引入
import './assets/css/reset.css';

## common.css

一些公共样式

```css
/* 公共样式 */
/* body的背景颜色 */
body {
  background-color: #f5f5f5;
}

/* 盒子模型 */
.bx-s {
  box-sizing: border-box;
}

/* 文本居中 */
.tac {
  text-align: center;
}

/* 相对定位 */
.rel {
  position: relative;
}

/* 绝对定位 */
.abs {
  position: absolute;
}

/* 固定定位 */
.fixed {
  position: fixed;
}

/* 隐藏 */
.dsn {
  display: none;
}

/* 浮动 */
.fl {
  float: left;
}

.fr {
  float: right;
}

.fx::after {
  display: block;
  content: '';
  clear: both;
}

/* 宽度100% */
.w100p {
  width: 100%;
}

.h100p {
  height: 100%;
}

/* 弹性盒子 */
.flex {
  display: flex;
}

.jc-c {
  justify-content: center;
}

.jc-sb {
  justify-content: space-between;
}

.jc-sa {
  justify-content: space-around;
}

.aic {
  align-items: center;
}

/* 盒子排成一列 */
.fldc {
  flex-direction: column;
}

/* 剩余空间分配 */
.flg1 {
  flex-grow: 1;
}

/* 换行 */
.flw {
  flex-wrap: wrap;
}

/* 文字溢出省略号 单行*/
.fell {
  display: block;
  max-width: 100%;
  white-space: nowrap;
  /*2.溢出部分隐藏起来*/
  overflow: hidden;
  /*3.文字溢出的时候用省略号来显示*/
  text-overflow: ellipsis;
}

/* 文字溢出省略号 两行*/
.fells {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* 使用两边对其和平均对其时造成的布局错乱 添加几个代该类的元素 */
.fix {
  height: 0;
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
}

/* 其他的 */

.hover-u:hover {
  text-decoration: underline;
}

/* 鼠标样式 */
.cup {
  cursor: pointer;
}

/* 字体加粗 */
.fwb {
  font-weight: bold;
}

/* 字体不加粗 */
.fwn {
  font-weight: normal;
}

/* 行内块元素 */
.dib {
  display: inline-block;
}

/* 颜色 */
.fff {
  color: #fff;
}

.bg-fff {
  background-color: #fff;
}

/* 字体颜色 */
.fc-r {
  color: red;
}

.fc-w {
  color: white;
}

.fc-c {
  color: #797d82;
}

.fc-b {
  color: skyblue;
}

/* 主题色 */
.base {
  color: #c03131;
}

.bg-base {
  background-color: #f03d37;
}

/* 字体 */
.f10 {
  font-size: 10px;
}

.f12 {
  font-size: 12px;
}

.f14 {
  font-size: 14px;
}

.f16 {
  font-size: 16px;
}

.f18 {
  font-size: 18px;
}

.f20 {
  font-size: 20px;
}

.f22 {
  font-size: 22px;
}

.f24 {
  font-size: 24px;
}

.f26 {
  font-size: 26px;
}

.f28 {
  font-size: 28px;
}

.f30 {
  font-size: 30px;
}

.f32 {
  font-size: 32px;
}

.f34 {
  font-size: 34px;
}

.f36 {
  font-size: 36px;
}

/* margin */
.mt-5 {
  margin-top: 5px;
}

.mt-10 {
  margin-top: 10px;
}

.mt-15 {
  margin-top: 15px;
}

.mt-20 {
  margin-top: 20px;
}

.mt-25 {
  margin-top: 25px;
}

.mt-30 {
  margin-top: 30px;
}

.mt-40 {
  margin-top: 40px;
}

.ml-5 {
  margin-left: 5px;
}

.ml-10 {
  margin-left: 10px;
}

.ml-15 {
  margin-left: 15px;
}

.ml-20 {
  margin-left: 20px;
}

.ml-25 {
  margin-left: 25px;
}

.ml-30 {
  margin-left: 30px;
}

.mr-5 {
  margin-right: 5px;
}

.mr-10 {
  margin-right: 10px;
}

.mr-15 {
  margin-right: 15px;
}

.mr-20 {
  margin-right: 20px;
}

.mr-25 {
  margin-right: 25px;
}

.mr-30 {
  margin-right: 30px;
}

.mb-5 {
  margin-bottom: 5px;
}

.mb-10 {
  margin-bottom: 10px;
}

.mb-15 {
  margin-bottom: 15px;
}

.mb-20 {
  margin-bottom: 20px;
}

.mb-25 {
  margin-bottom: 25px;
}

.mb-30 {
  margin-bottom: 30px;
}

/* padding */
.pt-5 {
  padding-top: 5px;
}

.pt-10 {
  padding-top: 10px;
}

.pt-15 {
  padding-top: 15px;
}

.pt-20 {
  padding-top: 20px;
}

.pt-25 {
  padding-top: 25px;
}

.pt-30 {
  padding-top: 30px;
}

.pl-5 {
  padding-left: 5px;
}

.pl-10 {
  padding-left: 10px;
}

.pl-15 {
  padding-left: 15px;
}

.pl-20 {
  padding-left: 20px;
}

.pl-25 {
  padding-left: 25px;
}

.pl-30 {
  padding-left: 30px;
}

.pr-5 {
  padding-right: 5px;
}

.pr-10 {
  padding-right: 10px;
}

.pr-15 {
  padding-right: 15px;
}

.pr-20 {
  padding-right: 20px;
}

.pr-25 {
  padding-right: 25px;
}

.pr-30 {
  padding-right: 30px;
}

.pb-5 {
  padding-bottom: 5px;
}

.pb-10 {
  padding-bottom: 10px;
}

.pb-15 {
  padding-bottom: 15px;
}

.pb-20 {
  padding-bottom: 20px;
}

.pb-25 {
  padding-bottom: 25px;
}

.pb-30 {
  padding-bottom: 30px;
}
```

1. // 在 main.js 中引入
2. import './assets/css/common.css';

# ref

# pinia 基本使用

## 引入

在 main.js 中

```
import { createPinia } from 'pinia';
app.use(createPinia());

```

## 创建

**基本方式**

```js
//定义关于counter的store
import { defineStore } from 'pinia';

/*defineStore 是需要传参数的，其中第一个参数是id，就是一个唯一的值，
简单点说就可以理解成是一个命名空间.
第二个参数就是一个对象，里面有三个模块需要处理，第一个是 state，
第二个是 getters，第三个是 actions。
*/
const useCounter = defineStore('counter', {
  state: () => ({
    count: 66
  }),

  getters: {},

  actions: {}
});

//暴露这个useCounter模块
export default useCounter;
```

## 使用

```
<script setup>
import { RouterView } from 'vue-router';
import useCounter from '@/stores/counter';
const counterStore = useCounter();
</script>
<template>
  <div>
    <RouterView />
    1111
    {{ counterStore.count }}
  </div>
</template>
<style scoped></style>

```

### 注意 Store 获取到后不能解构，否则失去响应式

```js
<template>
  <div>展示pinia的counter的count值：{{counterStore.count}}</div>
  <div>展示解构出来的pinia的counter的count值：{{count}}</div>
  <button @click="addCount">count+1</button>
</template>

<script setup>
	import useCounter from '../stores/counter'

	const counterStore = useCounter()

	const {count} = counterStore

	function addCount(){
	  //这里可以直接操作count，这就是pinia好处，在vuex还要commit在mutaitions修改数据
	  counterStore.count++
	}
<script/>

```

### 我们可以直接修改 pinia 中的值 不像 vuex 那样

解决方案：
**pinia 提供了一个函数 storeToRefs 解决**。引用官方 API storeToRef 作用就是把结构的数据使用 ref 做代理

```js
import { storeToRefs } from 'pinia';
const counterStore = useCounter();

const { count } = storeToRefs(counterStore);

就是直接赋值;
```

## 修改方式

除了直接赋值

还有

```js
const store = appStore();
// 第二种修改方式：使用$patch改变数据 $patch 可以同时修改多个值
function changeDataByPatch() {
  /*
      $patch也有两种的调用方式
      第一种写法的在修改数组时，假如我只想要把 ipList 的中第2项改成‘192.168.10.222’，
      但是也需要传入整个包括所有元素的数组，这无疑增加了书写成本和风险，显然是不合理的，所以一般都推荐使用第二种传入一个函数的写法
      * */
  // 第一种 $patch方法
  // store.$patch({
  //   baseUrl: 'https://www.jd.com/',
  //   ipList: ['192.168.10.777', '192.168.10.222', '192.168.10.888']
  // })

  // 第二种 $patch方法
  store.$patch((state) => {
    state.baseUrl = 'https://www.jd.com/';
    state.ipList[0] = '192.168.10.222';
  });
}
```

使用 action

```js
	定义一个action
  state: () => ({
    msg: '222',
    type: 'pink',
    isShow: true
  }),
     actions: {
    setMsgstate(opint) {
      this.msg = opint.msg;
      this.type = opint.type;
      this.isShow = opint.isShow;
    }
  }

import useMessage from '@/stores/Message';

const msgStore = useMessage();

const register = debounce(
  () => {
    msgStore.setMsgstate({
      msg: '账号或密码不能为空',
      type: 'red',
      isShow: true
    });
```

# setup 方式

创建

```js
import { reactive, toRefs } from 'vue';
import { defineStore } from 'pinia';
export const useCounterStore = defineStore('counter', () => {
  const hint = reactive({
    isShow: false,
    tit: '你好',
    fn: () => {}
  });
  function increment() {
    hint.isShow = true;
  }
  return { ...toRefs(hint), increment };
});
```

使用

```js
<template>
  <div class="hint" v-show="isShow">
    <div class="hint_tit">{{ tit }}</div>
    <div class="hint_btn">
      <div class="Close">主页</div>
      <div class="Anew">重来</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'
// const hintStore = useCounterStore()
const { isShow, tit } = storeToRefs(useCounterStore()) //使用storeToRefs不然不能响应式
</script>
<style lang="scss" scoped>
.hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999999999;
  width: 200px;
  height: 200px;
  background-color: rgb(79, 81, 76);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  &_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    .Close,
    .Anew {
      width: 50px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      background-color: white;
      cursor: pointer;
    }
    .Anew {
      margin-left: 10px;
    }
  }
}
</style>

```

修改

```js
import { useCounterStore } from '@/stores/counter';
// const hintStore = useCounterStore()
const hintStore = useCounterStore();
hintStore.increment('zzz');

//方式2
hintStore.$patch({
  isShow: true,
  tit: '你失败了'
});
```

# 父子传参

## 父传子

传

```
    <submit-c tit="登录"></submit-c>
```

收

```
const props = defineProps({
  tit: {
    type: String,
    default: ''
  },
  box: {
    type: Object
  }
});
console.log(props.tit);
```

## 子传父

传

```vue
父组件
<son :msg="msg" @sonClick="sonClick"></son>
子组件
<el-button @click="handleGetMsg">子按钮{{msg}}</el-button>

const emit = defineEmits(['sonClick', 'delete']) function
handleGetMsg() { emit("sonClick", "子组件向父组件传送的信息"); }
```

收

```vue
父组件 function sonClick(val) { myname.value = val }
```

# 生命周期使用

**setup 取代 beforeCreate 和 created**

**vue3 的组合式 api 中，setup 中的函数执行相当于在选项 api 中的 beforeCreate 和 created 中执行**

## 组合式 api 的生命周期需引入使用

除了 beforeCreate 和 created 外，**其他生命周期的使用都需要提前引入（轻量化）**

和选项式 api 的生命周期不同的地方是在 生命周期前加**on**

```
import { onMounted} from 'vue';
onMounted(() => {
  console.log(2);
});
```

# 路由使用

传参和 vue2 一样

跳转页面可以直引入路由器，获取是不能这样

```js
import router from '@/router';
// 去详情页
function toDetail(item2) {
  console.log(item2);
  router.push({
    name: 'mDown',
    params: {
      tit: item2
    }
  });
}
```

组合式 api（函数式）

```js
//跳转
import { useRouter } from 'vue-router';
const router = useRouter();
function toDetail(item2) {
  console.log(item2);
  router.push({
    name: 'mDown',
    params: {
      tit: item2
    }
  });
}
//接收
import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route.params.tit);
```

# 动态加载文件

```js
// 动态获取md文章
async function getMd() {
  let text = await import(`@/md/${route.params.tit}.md?raw`);
  console.log(text);
  // default就表示你里面所有(默认)内容
  Mdtext.value = text.default;
}
getMd();
```

# 判断首为是字母的正则

```vue
let pawd = ref(''); let reg = /^[a-zA-Z]/; let isPawd =
reg.test(pawd.value);
```

# watch

watch- 默认情况是**惰性的**(不立即执行)，也就是说仅在侦听的源数据变更时才执行回调。

watch- 更明确哪些状态的改变会触发侦听器重新运行副作用；

watch- 获取到侦听状态变化前后的值。

## 参数说明

> source: 可以支持 string,Object,Function,Array; 用于指定要侦听的响应式变量
>
> callback: 执行的回调函数
>
> options：支持 deep、immediate 和 flush 选项。

## **监听单个数据**

ref

```JS
const count= ref(0);
setTimeout(() => {
  count.value++;
}, 1000);

watch(count, (newVal, oldVal) => {
  console.log("新值:", newVal, "老值:", oldVal);
});

```

reactive

```js
import { defineComponent, ref, reactive, toRefs, watch } from 'vue';
export default defineComponent({
  setup() {
    const state = reactive({ name: 'liu', count: 20 });
    setTimeout(() => {
      state.count++;
    }, 1000);
    // 修改count值时会触发 watch的回调
    watch(
      () => state.count,
      (curCount, preCount) => {
        console.log('新值:', curCount, '老值:', preCount);
      }
    );

    return {
      ...toRefs(state)
    };
  }
});
```

## **监听多个数据**

使用**数组**的传参的方式

```js
//监听的对象          		//callback
watch(
  [() => state.count, count],
  ([curCount, newVal], [preCount, oldVal]) => {
    console.log('新值:', curCount, '老值:', preCount);
    console.log('新值:', newVal, '老值:', oldVal);
  }
);
```

## 侦听复杂的嵌套对象

我们实际开发中，复杂数据随处可见， 比如：

```js
const state = reactive({
  message: {
    id: 7,
    attrs: {
      name: 'liu',
      count: '1'
    }
  }
});
watch(
  () => state.message,
  (newType, oldType) => {
    console.log('新值:', newType, '老值:', oldType);
  },
  { deep: true }
);
```

deep: true 表示开启深度监听。（如果不使用第三个参数 deep:true， 是无法监听到数据变化的） immediate: true 无论数据是否发生变化，数据默认执行一次（使 watch 不为惰性，立即执行回调函数）

## stop 停止监听

当 watch 在组件的 setup() 函数或生命周期钩子被调用时， 侦听器会被链接到该组件的生命周期，并在组件卸载时自动停止。

如果在组件销毁之前我们想要停止掉某个监听， 可以调用 watch()函数的返回值，操作如下：

```js
const stopWatch = watch(
  () => state.message,
  (newType, oldType) => {
    console.log('新值:', newType, '老值:', oldType);
  },
  { deep: true }
);

setTimeout(() => {
  // 停止监听
  stopWatch();
}, 2000);
```

# watchEffect

watchEffect **不需要手动传入依赖(在里面使用了的数据多会被监听)**

watchEffect 会先执行一次用来自动收集依赖

watchEffect **无法获取到变化前的值**， 只能获取**变化后**的值

**停止监听和 watch 一样给一个名称 想停止是调用**

```js
watchEffect
（1）侦听多个数据源（ref，reactive）
import { defineComponent, ref, reactive, toRefs, watchEffect } from "vue";
export default defineComponent({
  setup() {
    const state = reactive({ name: "liu", count: 20 });
    let count= ref(0)
    watchEffect(() => {
        console.log(state.count);
        console.log(count.value);
      }
    );
    setInterval(() =>{
        state.count++
        count.value++
    },2000)
    return {
        ...toRefs(state)
    }
  },
});

```

# computed

## 基本使用

```js
// 第一种语法get方法 （没有set）
const 函数名 = computed(() => {
  return
})
// 第二种语法 get set 方法 带有set参数 可以设置
const 函数名 = computed(() => {
get() { return 结果 },
set( val ){  }
})
```

## 传参可以做数据过滤？

```js
<div>{{ selfAge(2025, '20k') }}</div>
<div>{{ selfAge(2027, '25k') }}</div>
<div>{{ selfAge(2030, '35k') }}</div>

const selfAge = computed(() => {
  return function(a, b) {
    return a + '年我' + age.value + '希望月薪' + b
  }
})
```

# 过滤器

vue3 已经不在使用过滤器 fliter

**可以使用工具函数对数据处理**

# 防抖节流的适用

```js
import { debounce } from '@/utils/tool';
const isShowBoxBtn = debounce(
  () => {
    if (isShowBoxMV.value) {
      return;
    }
    isShowBox.value = !isShowBox.value;
  },
  500,
  true
);
const isShowBoxMVBtn = debounce(
  () => {
    if (isShowBox.value) {
      return;
    }
    isShowBoxMV.value = !isShowBoxMV.value;
  },
  500,
  true
);
```

# Element-plus

安装配置看文档

https://element-plus.org/zh-CN/

**按需自动引入配置完之后，在组件中可直接使用，不需要引用和注册**

### 消息提示组件样式错乱

**如果使用时提示组件未定义(Eslint)给他手动解决**

mian.js

加入

```
// element plus
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-message-box.css';
```

# therejs 简单的使用

## 安装

```
npm install three
```

# 来个 HOOKS(能重复的功能代码)

用的好可以减轻代码量，提高工作效率，用的不好就是一坨屎

创建 hooks 文件下创建 index.js

```ts
import { ref } from 'vue';
export const firstHooks = () => {
  const count = ref(0);
  const syaHello = () => {
    console.log('nihao');
    console.log(count.value);
  };
  return { count, syaHello };
};
```

使用

```vue
<!-- ? 模块 -->
<template>
  <div class="">{{ count }}</div>
  <button @click="add">加1</button>
</template>

<script setup lang="ts">
import { firstHooks } from '@/hooks/index';
const { count, syaHello } = firstHooks();
syaHello();
const add = () => {
  count.value++;
};
</script>

<style lang="scss" scoped></style>
```

上面是不是很像我们的组合式 api 所以说**组合式 api 和 hook 有着一样的工能**

# 代码文件规则

**一个逻辑代码的文件代码尽量控制在 200 行把**（对自己的要求）

# 组件

## 立方体登录注册组件

## 展示 md 文章

## 音乐播放器
