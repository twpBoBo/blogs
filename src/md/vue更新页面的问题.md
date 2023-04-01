# vue路由参数改变 重新刷新页面 解决方法

解决方法来源：
How to Re-render a Vue Route When Path Parameters Change

## 方法一：

1.  	**在当前路由改变，但是该组件被复用时调用**
2. ​     举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
3. ​     由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
4. ​     可以访问组件实例 `this

```javascript
  beforeRouteUpdate(to, from, next) {
    console.log(to, from, next);
    if (to.fullPath != from.fullPath) {
      next();
      this.getSearchList();
    }
  },
```

## 方法二：

```javascript
<router-view :key="$route.fullPath" />
```

#### 同一个路由下改变参数实现更新组件数据

**网易云音乐项目**

解决：搜索进入到歌曲详情页在详情页在搜索其他歌曲点击不刷新问题

## 方法三：

在页面里监听路由变化

```javascript
wathch:{$route:function(newVal,oldVal){}
}
```

## 方法四：

window 的hashchange事件

```javascript
window.addEventListner("hashchange",()=>{})
```

# 页面更新回到顶部

在你需要的时候使用（跳转到单前页，分页操作）还可修改大小来跳到指定位置

 // chrome

  document.body.scrollTop = 0;

  // firefox

  document.documentElement.scrollTop = 0;

  // safari

  window.pageYOffset = 0;

# VUE使用请求来的数据（多层数据警告）

**定义一个开关 v-if   在请求数据成功后再打开开关**