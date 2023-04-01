# State

> 提供唯一的公共数据源，所有共享的数据统一放到store的state进行储存，相似与data

```js
import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)
 
export default new Vuex.Store({
  //数据，相当于data
  state: {
    name:"张三",
    age:12,
    count:0
  },
})
```

 调用：

### 方法一：

在标签中直接使用

```html
 <p>{{ $store.state.name }}</p>
 <p>{{ $store.state.age }}</p>
 <p>{{ $store.state.count }}</p>
```

###  方法二：

this.$store.state.全局数据名称

### 方法三：

从vuex中按需导入mapstate函数

```js
import { mapState } from "vuex";

computed: {

  ...mapState(['name', 'age', 'count'])

 },
```

方法中使用 this.xxxx

注意：当前组件需要的全局数据，映射为当前组件computed属性

```html
 <p>{{ name+age+cont}}</p>
```

# Mutation:

**更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的事件类型 (type)和一个回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：**

###  在vuex中定义:

**其中参数state参数是必须的，也可以自己传递一个参数，如下代码，进行计数器的加减操作，加法操作时可以根据所传递参数大小进行相加，减法操作没有传参每次减一**

![image-20230215091333112](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230215091333112.png)

### 在组件中使用：

 定义两个按钮进行加减操作



![image-20230215091356440](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230215091356440.png)

###  触发

#### 方法一：

#### 注意：使用commit触发Mutation操作

```js
methods:{
//加法
btn(){
this.$store.commit("addcount",10)     //每次加十
}
//减法
btn1(){
this.$store.commit("reduce") 
}
}
```

#### 方法二：

使用辅助函数进行操作，具体方法同上

```js
 methods: {
    ...mapMutations(['addcount', 'reduce']),
    btn() {
      this.addcount(10)
    },
    btn1() {
      this.reduce()
    }
  }
```

#  Action ——进行异步操作

**Action和Mutation相似，一般不用Mutation 异步操作，若要进行异步操作，使用Action**

**原因：为了方便devtools打个快照存下来，方便管理维护。所以说这个只是规范，而不是逻辑的不允许，只是为了让这个工具能够追踪数据变化而已**

### 在vuex中定义：

将上面的减法操作改为异步操作

![image-20230215092435083](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230215092435083.png)

 在组件中使用：

方法一：

直接使用  dispatch触发Action函数

```js
this.$store.dispatch("asynAdd")
```

方法二：

使用辅助函数

```js
methods: {
    ...mapActions(['asyncAdd']),
    btn() {
      this.asyncAdd()
    },
  }
```

##  Getter

**类似于vue中的computed，进行缓存，对于Store中的数据进行加工处理形成新的数据**

```js
//简写 
getters: {
    getInfo: state => state.info.phone,
    isLogin: state => state.isLogin
  },
//完整
  getters:{
      getInfo(state){
          return state.info.phone (也可以对数据进行操作)
      }
  }
```

**使用和state一样**

# vuex模块化

#### 注意：被模块化的store须要开启命名空间

暴露模块

```js
export default {
 namespaced: true,*//开启命名空间*
 } 
```

#### 在主文件引入和使用

```js
import moduleB from './b.js'
import moduleA from './a.js'
modules: {//模块化
    moduleA,
    moduleB
  }
```

#### 使用

##### 访问state数据：

```js
第一种方式：this.$store.state.moduleA.sum
第二种方式：
 import {mapState} from 'vuex'
 computed:{
 	...mapState('moduleA',['sum','number'])
 }
```

##### 修改state数据：

```js
第一种方式：this.$store.commit('moduleA/ADD_NUM',10)
第二种方式：
 import {mapMutations} from 'vuex'
 methods:{
	...mapMutations('moduleA',['ADD_NUM']),
 }
```

# 访问getters数据

```
store.getters['User/getInfo']
```

