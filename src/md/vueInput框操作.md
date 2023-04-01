# vue使用input 复选框

#### 使用v-modlu 绑定

```html
  <input type="checkbox" name="goods" :value="item" v-model="selectGods" />

 <input type="checkbox" name="all" v-model="checkAllselect" />  //全选
```

```js
  selectGods: [],
  checkAllselect: false
```

#### 绑定的值为数组时 每次选中复选框会在 数组中添加 input框的value值

#### 监听这两个值来判断全选

```js
selectGods(value) {
      // console.log(value)
    //如果选中数组和我们的原来数据数组长度一样（全选中了）
      if (this.carList.length == value.length) {
         //让全选 选中状态
        this.checkAllselect = true
      } else {
         //让全选 为选中状态 
        this.checkAllselect = false
      }
    },
    checkAllselect(value) {
        //如果全选 的状态为选中
      if (value) {
         //先清空（要清空再添加，可能是数组需要用一些方法才能被检测到吧）
        this.selectGods.splice(0, this.selectGods.length)
        this.carList.forEach(item => {
          this.selectGods.push(item)
        })
      } else {
         //如果是全选了，才清空
        if (this.carList.length == this.selectGods.length) {
          this.selectGods.splice(0, this.selectGods.length)
        }
      }
    }
```

# 多看几遍就懂了



# Vue input的blur事件影响下拉框中点击事件的解决方案

#### **在blur事件方法内部根据自身逻辑加个延迟(setTimeout)处理。**

#### **将click换成优先级更高的mousedown，mousedown优先于blur执行（mousedown > mouseup > click）**

#### 三个事件的触发时机

**mousedown**
**当鼠标指针移动到元素上方，并按下鼠标按键（左、右键均可）时，会触发 mousedown 事件。**
**与 click 事件不同，mousedown 事件仅需要按键被按下，而不需要松开即可发生。**

**mouseup**
**当在元素上松开鼠标按键（左、右键均可）时，会触发 mouseup 事件。**
**与 click 事件不同，mouseup 事件仅需要松开按钮。当鼠标指针位于元素上方时，放松鼠标按钮就会触发该事件。**

**click**
**当鼠标指针停留在元素上方，然后按下并松开鼠标左键时，就会触发一次 click 事件。**