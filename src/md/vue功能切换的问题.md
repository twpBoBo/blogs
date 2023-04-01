# vue2 导航栏切换样式变换(页面切换)

使用router-link 配置 active-class="active"

 active是自己定义选中时的样式

```html
 <router-link :to="item.path" active-class="active" exact>
​ {{ item.tit }}
  </router-link>
```

首页的选中样式不消失 可能是你的路由是  '/'

解决方法：

在router-link 配置exact属性

在路由  linkActiveClass: "active",

```js
const router = new VueRouter({

 linkActiveClass: "active",

 mode: "history",

 base: process.env.BASE_URL,

 routes,

});
```

# 路由标题变化

路由配置meta属性

如：meta: { title: '购物车' },

设置全局路由守卫

```js
router.afterEach(to => {
  document.title = to.meta.title
  console.log(to)
})
```

# 在当前页切换

选中样式绑定路由参数上的值

在当前页切换改变参数（因为query参数会保存到路由刷新不会变）

刷新没次多会执行created（）

```js
  created() {
    this.Active = this.$route.query.type;
  },
```

在单前页改变路由参数

```js
  this.$router.push({
        query: {
          type: index,
        },
      });
```

# 在一个组件中切换导航（没有子组件和路由）

已name的方式绑定导航切换的状态

保存数据到两个列表（一个总列表，一个展示列表）

使用watch监听name的变化改变需要渲染的列表（根据数据中的一些条件）

使用插件演示（不用也一样）：

```js
//保存数据到两个列表（默认展示全部） 
  data() {
    return {
      page: 1,
      orderList: [],
      showList: [],
      active: '全部'  //导航栏默认样式默认 在模板中 :class="{active:item.name==active}"
    }
  },
 //请求数据
orderListAPI({
      currPage: this.page,
      token: localStorage.getItem('token')
    }).then(res => {
      this.orderList = res.list
      this.showList = res.list
    })

//页面渲染
v-for="item in showList"

```

监听改变

```js
 watch: {
    active(value) {
      switch (value) {
        case '已取消':
          this.showList = this.orderList.filter(
            item => item.orderStatus === '00'
          )
          break
        case '待付款':
          this.showList = this.orderList.filter(
            item => item.orderStatus === '01'
          )
          break
        case '待发货':
          this.showList = this.orderList.filter(
            item => item.orderStatus === '02'
          )
          break
        default:
          this.showList = this.orderList
      }
    }
  },
```

无敌!
