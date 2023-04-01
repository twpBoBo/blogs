# 传参

## params(显示参数)

```js
//路由参数配置
const router = new VueRouter({
  routes: [{
    path: '/about/:id', !!!不想显示参数就不要写  /:id
    component: User
  }]
})

```

###### 声明式导航使用

```html
<router-link to="/about/12">跳转</router-link>
```

###### 编程式

```js
this.$router.push({
    path:'/child/${id}',
})

this.$router.push({
    name:'Child',
    params:{
    id:123
    }
})
```

###### 获取参数

this.$route.params.xxx

## query传参

###### 路由配置正常

###### 声明式导航使用

```html

<router-link :to="{ name: 'user1', query: { id: 123 }}"></router-link>
//使用path
<router-link :to="{ path: '/about', query: { id: 123 } }"></router-link>

```

###### 编程式使用



```js
//name方式
this.$router.push({
    name:'Child',
    query:{
    id:1
}
})
//path方式
this.$router.push({
    path:'/child',
    query:{
    id:1
}
})

```

###### query的获取方式

this.$route.query.xxx

## 需要注意的点

如果使用params传参,且参数是以对象的形式，跳转路径只能使用name形式而不能用path.

如果想要params参数想传参也可以不传参需要在占位符后面加?。

```javascript

```

##### 使用query方式URL地址栏是这样的

![image-20230212095650479](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230212095650479.png)

##### 使用params方式URL地址栏是这样的(不想显示就不显示)

/song/19229888354



# 传参底部acive失效问题

## 使用params传参!!!!

```JS
putClick(row){
        this.$router.push({
          name:'路由名字',
          path:'路由路径',
		//这里query是以key:value的形式 也可以使用params,params和query的区别就是使用query会在地址栏上显示传递的参数，params则不会，但是使用params必须加上路由的name 
          query:{key:value,key:value}})
      },

```

# 路由守卫

https://www.yuque.com/cessstudy/kak11d/ewsw8n#97643be1

# 多次点击同一个路由报错

![image-20230217111423086](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230217111423086.png)

#### 语法检查的key这样

```js
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
  return routerPush.call(this, location).catch(err => {
    err = ""
    console.log(err)
  })
}
```



# Vue页面跳转后当前位置不在顶部

```js
// 跳转后返回顶部
 router.afterEach((to,from,next) => {
      window.scrollTo(0,0);
 })
//或者
router.beforeEach((to, from, next) => {    
    // chrome
    document.body.scrollTop = 0
    // firefox
    document.documentElement.scrollTop = 0
    // safari
    window.pageYOffset = 0
    next()
})
```

# 当路由传参是一个对象或者数组时

JSON.stringify(carts)

 JSON.parse(this.$route.params.goodsinfo)



