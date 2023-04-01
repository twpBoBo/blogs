## **this.$set**

当发现我们给**对象**加了一个属性，在控制台能打印出来，但是却没有更新到视图上时，也许这个时候就需要用到

```js
 data () {
  return {
   items: [
        { message: "one", id: "1" },
        { message: "two", id: "2" },
        { message: "three", id: "3" }
      ]
  }
 },
 //添加
 mounted () {
   this.items[0] = { message:'first',id:'4'} //此时对象的值更改了，但是视图没有更新
  // let art = {message:'first',id:"4"}
  // this.$set(this.items,0,art) //$set 可以触发更新视图
 },
     
  //改变 
  methods: {
  handClick(){
   let change = this.items[0]
   change.message="shen"
   this.$set(this.items,0,change)
  }
 }

```

