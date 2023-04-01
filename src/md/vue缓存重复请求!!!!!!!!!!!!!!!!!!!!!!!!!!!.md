# keep-alive vue组件缓存

### 参数(Props):

- include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
- exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
- max - 数字。最多可以缓存多少组件实例

### 用法：

```html
<keep-alive :include="routerName"><router-view /> </keep-alive>
其他参数一样
```

**keep-alive包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 <transition> 相似，<keep-alive> 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在组件的父组件链中。当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。**

**被包含在 keep-alive 中创建的组件，会多出两个生命周期的钩子: activated 与 deactivated。**

**activated：在 keep-alive 组件激活时调用，该钩子函数在服务器端渲染期间不被调用。**

**deactivated：在 keep-alive 组件停用时调用，该钩子在服务器端渲染期间不被调用。**

**使用 keep-alive 会将数据保留在内存中，如果要在每次进入页面的时候获取最新的数据，需要在 activated 阶段获取数据，承担原来 created 钩子函数中获取数据的任务。**

# 在想要缓存的组件中 定义该名字 （一定要写）！！！



# 生命周期的变化

**正常生命周期：beforeRouteEnter --> created --> mounted --> updated -->destroyed**

**使用keepAlive后生命周期：**
**首次进入缓存页面：beforeRouteEnter --> created --> mounted --> activated --> deactivated**
**再次进入缓存页面：beforeRouteEnter --> activated --> deactivated**

# **这里的activated非常有用，因为页面被缓存时，created,mounted等生命周期均失效，你若想进行一些操作，那么可以在activated内完成**！！！

**activated   keep-alive组件激活时调用，该钩子在服务器端渲染期间不被调用。** 
**deactivated   keep-alive组件停用时调用，该钩子在服务端渲染期间不被调用。**

**注意： 只有组件被 keep-alive 包裹时，这两个生命周期函数才会被调用，如果作为正常组件使用，是不会被调用的，以及在 2.1.0 版本之后，使用 exclude 排除之后，就算被包裹在 keep-alive 中，这两个钩子函数依然不会被调用！另外，在服务端渲染时，此钩子函数也不会被调用。**

# 结合Router使用

可以防止重复请求，（被缓存了就不需要再去请求）

#### 配置 需要被缓存的路由

在路由meta属性配置 keepAlive: true

```
  {
    path: '/classify',
    name: 'classify',
    meta: { title: '分类', keepAlive: true },
    component: () => import('@/views/classify/ClassIfy.vue')
  }
```

#### 配置 全局组件App.vue

```html

	<keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
```

**在keep-alive缓存设置了meta.keepAlive的路由组件**

**没设置的组件就正常显示**