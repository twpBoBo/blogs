# 弹窗框禁止页面滚动

在全局组件定义方法

```js
  methods: {
    stopScroll() {
      var mo = function (e) {
        e.preventDefault();
      };
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", mo, false); //禁止页面滑动
    },
    canScroll() {
      var mo = function (e) {
        e.preventDefault();
      };
      document.body.style.overflow = ""; //出现滚动条
      document.removeEventListener("touchmove", mo, false);
    },
  },
```

用vuex管理弹窗状态

在全局组件监听弹窗状态判断是否禁止滚动

```js
    "$store.state.showLogin": function (value) {
      if (value) {
        this.stopScroll();
      } else {
        this.canScroll();
      }
    },
```

