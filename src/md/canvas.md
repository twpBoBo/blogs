## **Canvas:**

  <canvas></canvas>是[**HTML5**](http://lib.csdn.net/base/html5)出现的新标签，像所有的dom对象一样它有自己本身的属性、方法和事件，其中就有绘图的方法，js能够调用它来进行绘图。



## 基本知识：

 

1. context:

   context是一个封装了很多绘图功能的对象，获取这个对象的方法是 

   ```js
   var context = canvas.getContext("2d");
   ```

​    也许这个2d勾起了大家的无限遐想，但是很遗憾的告诉你html5还只是个少女，不提供3d服务。

  

2.  canvas元素绘制图像的时候有两种方法，分别是
   1. context.fill()			//填充
   2. context.stroke()	//绘制边框

  在canvas中填充对象与描边对象方法是两个独立成形的对象来的。也就说是我们可以一边使用填充做一个东西出来，也可以用描边做另一个东西出来，它们之是完全独立的。

  

3. style:在进行图形绘制前，要设置好绘图的样式
   1. context.fillStyle 			//填充的样式
   2.  context.strokeStyle		//边框样式

  

4.  context.lineWidth         //图形边框宽度

  

5. 颜色的表示方式:

​     直接用颜色名称:"red" "green" "blue"

​     十六进制颜色值: "#EEEEFF"

​     rgb(1-255,1-255,1-255)

​     rgba(1-255,1-255,1-255,透明度)

> 在对 canvas标签进行设置时，直接给他的CSS样式，只能进行等比缩放。如果想要修改Canvas的画布的大小，只能修改标签性属的width,height。





## 2、**绘制矩形 context.fillRect(x,y,width,height) strokeRect(x,y,width,height)**

*x:矩形起点横坐标（坐标原点为canvas的左上角，当然确切的来说是原始原点，后面写到变形的时候你就懂了，现在暂时不用关系）*

   *y:矩形起点纵坐标*

   *width:矩形长度*

   *height:矩形高度*

 

**直接使用就会直接生成了，不需要再调用。使用一次就生成一个。**

***\*无论什么时候使用上面的方法，都会使用在使用方法之前的设置。**

```js
let canvas = document.getElementById("can"); // 从页面中获取对应的画布元素
let context = canvas.getContext("2d"); // 把画布元素设置为一个2D的图形对象

// // 设置填充的样式
// context.fillStyle = 'rgba(255,0,0,.9)';		// 填充色为红色

// // 设置边框样式
// context.strokeStyle = 'blue';	// 描边色为蓝色

// // 设置填充的矩形参数
// context.fillRect(10, 30, 80, 350);		// 填充出一个矩形

// // 设置边框参数
// context.strokeRect(10,30,80,350);

// // 一次可以渲染多个图形，但在使用过程，如果不修改样式下都会使用上一个样式
// context.fillStyle = 'rgba(0,255,0,.9)';		// 填充色为红色
// context.fillRect(100, 100, 50, 50);		// 填充出一个矩形

// // context.fill() 使用填充的样式与参数进行填充
// context.fill();
// context.stroke();

// 棋盘的边框
for (let j = 0; j < 10; j++) {
    color1 = j % 2 == 0 ? "#000" : "#fff";
    color2 = j % 2 == 0 ? "#fff" : "#000";
    for (let i = 0; i < 10; i += 2) {
        context.fillStyle = color1;
        context.fillRect(i * 100, j * 100, 100, 100);
        context.fillStyle = color2;
        context.fillRect((i + 1) * 100, j * 100, 100, 100);
    }
}


context.strokeStyle = "#000";
context.strokeRect(0, 0, 1000, 1000);
```

