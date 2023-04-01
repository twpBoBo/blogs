# TypeScript 教程

## 编程语言分类(了解)

强类型语言: C, JAVA  声明一个整数变量, 这个变量就只能存放整数

弱类型: js(布兰登·艾奇) 声明一个变量, 可以存放任意类型的数据

另一种分类方法

静态语言: 在编写代码时就会去检查代码 java

动态语言: 在运行的时侯才去检查代码 js

 

## 文档资料

ts入门教程: https://ts.xcatliu.com/

**为什么要用TypeScript(JavaScript的超集)**

1. JavaScript和TypeScript的主要区别为：TypeScript是静态类型，js是动态类型（强类型、弱类型、静态类型、动态类型的区别）。
2. 但这不意味着两者差距多大，只是类型检查的时机不同而已，TS和js根本上的差别就这一点，然而其意义却举足轻重。
3. 静态类型检查可以做到early fail，即你编写的代码即使没有被执行到，一旦你编写代码时发生类型不匹配，语言在编译阶段（解释执行也一样，可以在运行前）即可发现，同时IDE也能提供大量便捷支持。对小型项目而言也许发挥不出多大优势，然而当项目规模膨胀，运行前的类型检查就大放异彩了——首先，大型项目测试调试分支覆盖困难，很多代码并不一定能够在所有条件下执行到，运行前的类型检查是减少bug的一大手段；其次，静态类型对阅读代码是友好的，在团队合作、代码维护和交接中意义不言自明；最后，IDE提供的大量便捷支持和TS本身的语法检查和代码提示自动补全让开发者提高效率，方便重构（维护过大型web项目中各种乱七八糟的js文件就能发现静态类型多美好）。

**准备工作**

1. 安装

   ```shell
   npm install -g typescript
   ```

2. 新建文件夹, 初始化项目

   ```shell
   tsc --init
   ```

3. 设置js输出路径, 将tsconfig.json中的 `"outDir": "./"` 注释打开，也可以换成你想要编译后存放的目录,比如 './dist'

4. 自动编译ts文件, 打开一个终端，运行

   ```shell
   tsc -w
   ```

5. 新建demo.ts, 输入

   ```
   var count:number = 100;
   console.log(count);
   ```

6. 运行demo.js

   ```
   node ./dist/demo.js
   ```

 

## 01 hello world

```
var msg:string = 'hello world';
console.log(msg);
```

## 02 常用类型

例1. 常用类型举例

```
// (1)布尔
let isDone: boolean = false;
// (2)数字
let num: number = 6;
// (3)字符串
let name: string = "bob";
name = "smith";
// (4)数字或字符串(联合类型)
let money:number|string = 100;
// (5)any 任意类型
let aa:any = xxx;


// (6)数组
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3]; 
let list: Array<any> = [1, true, 3]; 
// 对象(一般不这样干)
let obj:Object = {a:2, b:3}
// 对象类型
type Cat = {
    name:string,
    age:number,
    addr?:string
}
// cat变量的类型是Cat
let cat:Cat = {
    name: '小花',
    age: 3,
    addr: '深圳'
}
```

例2. 类型推断

```
// username会自动推断为字符串, age的类型为number
let person = {
    username: 'zhangsan',
    age: 100
}
person.username = 222; // 会报错
```

 

## 03 元组 tuple

   元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比 

   如，你可以定义一对值分别为 string 和 number 类型的元组。 

```
let x: [string, number];  
x = ['hello', 10];  
x = [10, 'hello']; // 会报错
```

## 04 联合类型

```
var val:string|number 
val = 12 
console.log("数字为 "+ val) 
val = "test" 
console.log("字符串为 " + val)
```

## 05 接口

   (1) IPerson是接口, 定义employee时指定了它的类型是IPerson

   (2)加了?代表是可选属性

   (3) 可以理解为给一个类设定规则, 有什么属性和有什么方法

   (4) 应用场景: : vue路由配置可以使用到(后面会给出代码)

```
interface IPerson { 
  firstName:string, 
  lastName?:string, 
  sayHi: ()=>string 
} 

var employee:IPerson = { 
  firstName:"Jim",
  // lastName:"Blakes", 
  sayHi: ():string =>{return "Hello!!!"} 
} 

console.log(employee.firstName) 
console.log(employee.lastName)
```

## 06 函数和函数返回值

```
// 指定返回值为number
function add(x: number, y: number): number {
    return x + y;
}
// 指定myADD为函数,且返回的是数字
let myAdd: (x:number, y:number)=>number 
function(x: number, y: number): number { return x+y; };

// 返回值为void(空)
function add(x: number, y: number): void {
    let sum = x+y;
    console.log(sum);
}

// lastName为可选参数
function buildName(firstName: string, lastName?: string) :voild{
    console.log(firstName,lastName)
}

buildName('hu'); // hu,undefined
```

## 07 泛型

- TS中泛型的实现使我们能够创建可重用的组件，一个组件可以支持多种类型的数据，为代码添加额外的抽象层和可重用性。泛型可以应用于TS中的函数、接口和类。

  ```
  // 代码的意思传入一个叫做arg的参数,它是数字类型, 然后返回类型也是数字类型
  ```

  ```
  function test(arg: number): number {
  ```

  ```
      return arg;
  ```

  ```
  }
  ```

- 泛型可以理解为变量的类型, 它会自动判断传入的参数, 然后确定其类型

- <>表示使用了泛型

- arg:T 表示arg参数的类型是T

  ```
  function test<T>(arg: T): T {
  ```

  ```
      return arg;
  ```

  ```
  }
  ```

- 调用

  ```
  let output = test<string>("myString"); 
  ```

  ```
  let output = test("myString");   // 也可以这么写
  ```

## 08 类和继承

```
class Animal {
    name: string;
    constructor(name: string) { this.name = name; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
class Snake extends Animal {
    constructor(name: string) { 
        super(name); 
    }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}
class Horse extends Animal {
    constructor(name: string) { 
        super(name); 
    }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}
let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");
sam.move();
tom.move(34);
```

   

## 09 模块导入导出(和Es6一样)

   **(1) 导出**  m.ts

```
// 导出方式1
export let a = 20;
export let b = 50;
// 导出方式2
let a = 20;
let b = 50;
export {
    a,
    b
}
// 导出方式3
export default {
    a:2,
    b:3
}
```

   **(2) 导入** index.ts

```
// 导入方式1, 对应导出方式1和2
import {a} from './m'
import * as obj from './m'

// 导入方式2, 对应导出方式3
import obj from './m'
```

## 10 混入

```
// 混入对象1
class Bird {
    canFly: boolean;
    fly() {
        this.canFly = true;
        console.log('I can fly')
    }

}

// 混入对象2
class Fish {
    canSwim: boolean;
    swim() {
        this.canSwim = true;
        console.log('I can swim')
    } 
}
// 新对象
class FlyFish implements Bird, Fish {
    constructor() {
        
    }
    canFly:boolean= false;
    canSwim:boolean= false;
    fly: () => void;
    swim: () => void;
}

合并多个类到新对象中（继承多个类的实例到原型上）
function doMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
} 

doMixins(FlyFish, [Bird, Fish]);


let flyFish = new FlyFish();
console.log(flyFish.canFly);
flyFish.swim();
```

   

## 11 类型声明文件

```
const path = require('path'); // 报错:找不到名称 "require"。是否需要为节点安装类型定义? 请尝试使用 `npm i --save-dev @types/node`。ts(2580)
```

需要运行以下命令来安装nodejs的声明文件

```
npm i --save-dev @types/node
```

有的需要安装声明文件，有的则不需要，为什么会有这种事情发生呢？

​		其实这是个历史遗留原因，比如新一点的 axios 他们自己写了声明文件。像比较老的express是没有写的。微软呢为了解决这个问题，让你通过**declare**暴露出去，让你自己去写