# 验证码倒计时问题

# 验证码登录

### 请求登录接口

```js
import request from '@/request'

// 获取手机验证码
export const CodeAPI = data => {
  return request({
    method: 'post',
    url: '/user/getSmsCode',
    data
  })
}

// 获取登录接口
export const LoginAPI = data => {
  return request({
    method: 'post',
    url: '/user/login',
    data
  })
}

```

### 获取验证码

验证码请求流程

客户端——>服务器——>第三方服务器（收到请求生成验证码，发给手机和在返回给自己的服务器，服务器在返回给客户端）——>手机

简单的模拟请求：

```js
   // 获取登录验证码
    getCode() {
      let Format = phoneverification(this.phone)
      console.log(Format)
      if (Format) {
        CodeAPI({ phone: this.phone }).then(res => {
          if (res.code == 666) {
            this.Hint(res.msg + '验证码为：' + res.smsCode, true)
            this.code = res.smsCode
            console.log(res)
            this.countDown()
          } else {
            this.Hint(res.msg, false)
          }
        })
      } else {
        this.Hint('手机格式不对', false)
      }
    },
```

### 登录判断（账号登录就去掉验证码操作）

```js
   // 登录判断接口
    Login() {
      let reg = /^\d{4}$/
      if (this.smsCode == '' || this.phone == '') {
        this.Hint('请输入验证码或手机号', false)
      } else if (!reg.test(this.smsCode)) {
        this.Hint('请输入验证格式不对', false)
      } else if (this.smsCode != this.code) {
        this.Hint('验证码错误', false)
      } else if (!this.status) {
        this.Hint('验证码过期', false)
      } else {
        LoginAPI({
          phone: this.phone,
          smsCode: this.smsCode
        }).then(res => {
          if (res.code == 666) {
            console.log(res)
            this.$store.commit('setLoginStatus')
            this.$store.commit('setLoginPhone', res.result.phone)
            this.$router.push('/')
          } else {
            this.Hint(res.msg, false)
          }
        })
      }
    }
```

# vuex加localstorage存储登录状态（token和信息）	

localstorage存对象要先装换成字符串 JSON.stringify()

拿回来用在转回来JSON.parse()

**首先，需要先弄明白一个问题，为什么不能单独使用vuex或者单独使用localstorage（sessionstorage一样的道理）？**

**1.为什么不能单独使用vuex？因为vuex刷新页面会丢失。**

**为什么会丢失？vue是单页面应用SinglePage Web Application。什么叫单页面应用？每次刷新页面相当于重新生成，或者说加载（初始化）页面，每次都是一个新的，当然会丢失。**

**2.为什么不单独使用localstorage？其实非要这么用，是完全可以的。但是为什么不这么用呢？因为storage存储的是文件，而vuex是缓存，当然缓存速度快，所以要二者一起使用。**

## 登录成功设置vuex

```js
this.$store.commit('setInfo', { phone: res.result.phone })
this.$store.commit('setToken', res.result.token)
this.$store.commit('setLogin', true)
```

## 配置vuex

```js
state: {
    isLogin: localStorage.getItem('isLogin') || '',
    info: JSON.parse(localStorage.getItem('info')) || {},
    token: localStorage.getItem('token') || ''
  },
  // 组件使用就用getters里面
  getters: {
    getInfo: state => state.info.phone,
    isLogin: state => state.isLogin
  },
  mutations: {
    setInfo(state, value) {
      state.info = value
      localStorage.setItem('info', JSON.stringify(value))
    },
    delInfo(state) {
      state.info = ''
      localStorage.removeItem('info')
    },
    setLogin(state, value) {
      state.isLogin = value
      localStorage.setItem('isLogin', value)
    },
    // token
    setToken(state, value) {
      state.token = value
      localStorage.setItem('token', value)
    },
    delToken(state) {
      state.token = ''
      localStorage.removeItem('token')
    }
  },
```

## 组件使用登录成功显示电话不显示登录按钮

```html
  <router-link to="/login" v-if="!$store.getters.isLogin">
          登录
        </router-link>
        <p v-if="$store.getters.isLogin">{{ $store.getters.getInfo }}</p>
```

# 设置token拦截器

#### 在请求拦截器设置请求token

 判断是否存在token,如果存在将每个页面header添加token,（带着token去请求服务器，服务器就返回需要token才能请求的数据）

 不存在就直接请求（返回请求不需要token的数据了）

  是否需要token这是后端的事(那些需要token才能请求到的数据)

```js
   if (store.state.User.token) {
      config.headers.Authorization = `Bearer ${store.state.User.token}`
    }
```

# 未登录不能访问 设置路由守卫

### 配置全局路由守卫

```
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 需要权限
      //判断当前是否拥有权限
      if (getUserInfo().user_sub) {
          next();
      } else {  // 无权，跳转登录
        mgr.signinRedirect();
      }
  } else {  // 不需要权限，直接访问
      next();
  }

})
```

### 路由配置是否需要权限

![image-20230215102015369](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230215102015369.png)