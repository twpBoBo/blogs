# 脚手架安装项目

# 不要再同一目录下创建 react 文件会生成副本报错

node 版本 14+

```bash
npx create-react-app my-app
cd my-app
npm start
```

初始化项目

npm i react-router-dom

npm i redux react-redux

npm i axios -D

npm i node-sass -D

jsconfig.json

```
{    "compilerOptions": {      "baseUrl": "src"    },    "include": ["src"]  }
```

# jsx 语法

可以在 js 中写 html

html 结构注意点：

需要最外层标签

不需要“ ”号

里面使用{}变量赋值

### 属性展开

如果你已经有了一个 props 对象，你可以使用展开运算符 `...` 来在 JSX 中传递整个 props 对象。以下两个组件是等价的：

```jsx
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = { firstName: 'Ben', lastName: 'Hector' };
  return <Greeting {...props} />;
}
```

# 了解项目结构

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。

# 动态数据

现将将函数组件转换成 class 组件：

1. 创建一个同名的 [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes)，并且继承于 `React.Component`。
2. 添加一个空的 `render()` 方法。
3. 将函数体移动到 `render()` 方法之中。
4. 在 `render()` 方法中使用 `this.props` 替换 `props`。
5. 删除剩余的空函数声明

State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。

**不要直接修改 State**

动态数据需要保存在 state 中

改变时需要使用 setState 来实现动态数据改变

**对象式**

# 动态 class

```
 this.setState({
      num: this.state.num + 1,
    });
```

**函数式**

```
 this.setState((state) => ({
      num: state.num + 1,
    }));
```

**使用 es6 这里使用了 ES6 [计算属性名称](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names)的语法更新给定输入名称对应的 state 值：**

用于处理多个输入来判断那个输入变化

```jsx
//state
this.state = {
  a: 1,
  b: 2
};
//setState
let name = a;

this.setState({
  [name]: 3
});
//这相当于
this.state[a] = 3;
```

**State 的更新可能是异步的**

出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用。

**因为 `this.props` 和 `this.state` 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。**

例如，此代码可能会无法更新计数器：

```
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

**要解决这个问题，可以让 `setState()` 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：**

```
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

State 的更新会被合并

**当你调用 `setState()` 的时候，React 会把你提供的对象合并到当前的 state。**

组件 dom：

类组件也叫有状态组件

```js
export default class Dchiden extends React.Component {
  constructor(props) {
    super(props);
    this.state = { num: 0 };
  }
  chang() {
    this.setState({
      num: this.state.num + 1
    });
  }
  render() {
    return (
      <div>
        <div className="box">
          <div className="box_name">{this.props.obj.name}</div>
          <div className="box_age">{this.props.obj.age}</div>
          <div className="box_sex">{this.props.obj.sex}</div>
          <div className="box_num">{this.state.num}</div>
          <div className="box_btn" onClick={() => this.chang()}>
            点我
          </div>
        </div>
      </div>
    );
  }
}
```

# 事件

阻止默认事件

e.preventDefault();

```
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }
```

**重点**

事件的 this 问题

```js
	<div className="box_btn" onClick={this.chang}>
 	1.// 为了在回调中使用 `this`，这个绑定是必不可少的
    this.chang = this.chang.bind(this);
   	2.//不然会报错 但也可以直接给一个函数(不推荐)
    <div className="box_btn" onClick={()=>{this.chang()}}>
    3.使用箭头函数去声明方法和函数（推荐	）
    chang = () => {
    this.setState((state) => ({
      num: state.num + 1,
    }));
  };
```

**传参**

```js
onClick={this.chang.bind(this, 1)}

onClick={() => this.chang(22)}
```

仔细想他们的 this 指向

# 条件渲染

### 使用 if 判断条件来进行条件渲染

```
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

完整的 js 条件渲染组件

```js
import './chiden.scss';
import React from 'react';
// export default class Dchiden extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { num: 0 };
//     // this.chang = this.chang.bind(this);
//   }
//   chang = (data) => {
//     console.log(data);
//     // this.setState((state) => ({
//     //   num: state.num + 1,
//     // }))
//   };
//   render() {
//     return (
//       <div>
//         <div className="box">
//           <div className="box_name">{this.props.obj.name}</div>
//           <div className="box_age">{this.props.obj.age}</div>
//           <div className="box_sex">{this.props.obj.sex}</div>
//           <div className="box_num">{this.state.num}</div>
//           <div className="box_btn" onClick={() => this.chang(22)}>
//             点我
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
function LoginButton(props) {
  return <button onClick={props.onClick}>Login</button>;
}

function LogoutButton(props) {
  return <button onClick={props.onClick}>Logout</button>;
}
export default class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  handleLoginClick = () => {
    this.setState({ isLoggedIn: true });
  };

  handleLogoutClick = () => {
    this.setState({ isLoggedIn: false });
  };

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }
    return button;
  }
}
```

### 通过花括号包裹代码，你可以 JSX 中。它可以很方便地进行元素的条件渲染

```js
{
  unreadMessages.length > 0 && (
    <h2>You have {unreadMessages.length} unread messages.</h2>
  );
}
```

之所以能这样做，是因为在 JavaScript 中，true && expression 总是会返回 expression, 而 false && expression 总是会返回 false。

因此，**如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。**

### 三目运算符

```jsx
  The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
```

**同样的，它也可以用于较为复杂的表达式中，虽然看起来不是很直观：**

```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />
      }
    </div>
  );
}
```

### 阻止组件渲染

在极少数情况下，你可能希望能隐藏组件，即使它已经被其他组件渲染。若要完成此操作，你可以让 `render` 方法直接返回 `null`，而不进行任何渲染。

```jsx
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return <div className="warning">Warning!</div>;
}
```

**在组件的 `render` 方法中返回 `null` 并不会影响组件的生命周期。例如，上面这个示例中，`componentDidUpdate` 依然会被调用。**

### 渲染多个组件

你可以通过使用 `{}` 在 JSX 内构建一个[元素集合](https://react.docschina.org/docs/introducing-jsx.html#embedding-expressions-in-jsx)。

面，我们使用 Javascript 中的 [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 方法来遍历 `numbers` 数组。将数组中的每个元素变成 `<li>` 标签，最后我们将得到的数组赋值给 `listItems`

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => <li>{number}</li>);
//我们把整个 listItems 插入到 <ul> 元素中，然后渲染进 DOM：

ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

#### key

当我们运行上面这段代码，将会看到一个警告 `a key should be provided for list items`，意思是当你创建一个元素时，必须包括一个特殊的 `key` 属性

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map(
    (
      number //如果你写的不是简写记得加return
    ) => <li key={number.toString()}>{number}</li>
  );
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

#### 在 JSX 中嵌入 map()

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) => (
        <ListItem key={number.toString()} value={number} />
      ))}
    </ul>
  );
}
```

# 生命周期

将生命周期方法添加到 Class 中

**在具有许多组件的应用程序中，当组件被销毁时释放所占用的资源是非常重要的。**

**componentDidMount() =====> 常用 一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息**

**componentWillUnmount() =====> 常用。 一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息**

### 组件代码实例解释生命周期

### 挂载卸载过程

**class 组件特有**

#### 1.1.constructor()

constructor()中完成了 React 数据的初始化，它接受两个参数：props 和 context，当想在函数内部使用这两个参数时，需使用 super()传入这两个参数。
注意：只要使用了 constructor()就必须写 super(),否则会导致 this 指向错误。

#### 1.2.componentWillMount()

componentWillMount()一般用的比较少，它更多的是在服务端渲染时使用。它代表的过程是组件已经经历了 constructor()初始化数据后，但是还未渲染 DOM 时。

#### 1.3.componentDidMount()

组件第一次渲染完成，此时 dom 节点已经生成，可以在这里调用 ajax 请求，返回数据 setState 后组件会重新渲染

#### 1.4.componentWillUnmount ()

在此处完成组件的卸载和数据的销毁。

1. clear 你在组建中所有的 setTimeout,setInterval
2. 移除所有组建中的监听 removeEventListener
3. 有时候我们会碰到这个 warning:

```csharp
Can only update a mounted or mounting component. This usually      means you called setState() on an unmounted component. This is a   no-op. Please check the code for the undefined component.
```

原因：因为你在组件中的 ajax 请求返回 setState,而你组件销毁的时候，请求还未完成，因此会报 warning
解决方法：

```kotlin
componentDidMount() {
    this.isMount === true
    axios.post().then((res) => {
    this.isMount && this.setState({   // 增加条件ismount为true时
      aaa:res
    })
})
}
componentWillUnmount() {
    this.isMount === false
}
```

### 更新过程

#### componentWillReceiveProps (nextProps)

1. 在接受父组件改变后的 props 需要重新渲染组件时用到的比较多
2. 接受一个参数 nextProps
3. 通过对比 nextProps 和 this.props，将 nextProps 的 state 为当前组件的 state，从而重新渲染组件

```kotlin
  componentWillReceiveProps (nextProps) {
    nextProps.openNotice !== this.props.openNotice&&this.setState({
        openNotice:nextProps.openNotice
    }，() => {
      console.log(this.state.openNotice:nextProps)
      //将state更新为nextProps,在setState的第二个参数（回调）可以打         印出新的state
  })
}
```

#### shouldComponentUpdate(nextProps,nextState)

1. 主要用于性能优化(部分更新)
2. 唯一用于控制组件重新渲染的生命周期，由于在 react 中，setState 以后，state 发生变化，组件会进入重新渲染的流程，在这里 return false 可以阻止组件的更新
3. 因为 react 父组件的重新渲染会导致其所有子组件的重新渲染，这个时候其实我们是不需要所有子组件都跟着重新渲染的，因此需要在子组件的该生命周期中做判断

#### componentWillUpdate (nextProps,nextState)

shouldComponentUpdate 返回 true 以后，组件进入重新渲染的流程，进入 componentWillUpdate,这里同样可以拿到 nextProps 和 nextState。

#### componentDidUpdate(prevProps,prevState)

组件更新完毕后，react 只会在第一次初始化成功会进入 componentDidmount,之后每次重新渲染后都会进入这个生命周期，这里可以拿到 prevProps 和 prevState，即更新前的 props 和 state。

#### render()

render 函数会插入 jsx 生成的 dom 结构，react 会生成一份虚拟 dom 树，在每一次组件更新时，在此 react 会通过其 diff 算法比较更新前后的新旧 DOM 树，比较以后，找到最小的有差异的 DOM 节点，并重新渲染。

# 新的生命周期

#### getDerivedStateFromProps(nextProps, prevState)

代替 componentWillReceiveProps()。
老版本中的 componentWillReceiveProps()方法判断前后两个 props 是否相同，如果不同再将新的 props 更新到相应的 state 上去。这样做一来会破坏 state 数据的单一数据源，导致组件状态变得不可预测，另一方面也会增加组件的重绘次数。
举个例子:

```kotlin
// before
componentWillReceiveProps(nextProps) {
  if (nextProps.isLogin !== this.props.isLogin) {
    this.setState({
      isLogin: nextProps.isLogin,
    });
  }
  if (nextProps.isLogin) {
    this.handleClose();
  }
}

// after
static getDerivedStateFromProps(nextProps, prevState) {
  if (nextProps.isLogin !== prevState.isLogin) {
    return {
      isLogin: nextProps.isLogin,
    };
  }
  return null;
}

componentDidUpdate(prevProps, prevState) {
  if (!prevState.isLogin && this.props.isLogin) {
    this.handleClose();
  }
}
```

这两者最大的不同就是:
在 componentWillReceiveProps 中，我们一般会做以下两件事，一是根据 props 来更新 state，二是触发一些回调，如动画或页面跳转等。

1. 在老版本的 React 中，这两件事我们都需要在 componentWillReceiveProps 中去做。
2. 而在新版本中，官方将更新 state 与触发回调重新分配到了 getDerivedStateFromProps 与 componentDidUpdate 中，使得组件整体的更新逻辑更为清晰。而且在 getDerivedStateFromProps 中还禁止了组件去访问 this.props，强制让开发者去比较 nextProps 与 prevState 中的值，以确保当开发者用到 getDerivedStateFromProps 这个生命周期函数时，就是在根据当前的 props 来更新组件的 state，而不是去做其他一些让组件自身状态变得更加不可预测的事情。

#### getSnapshotBeforeUpdate(prevProps, prevState)

代替 componentWillUpdate。
常见的 componentWillUpdate 的用例是在组件更新前，读取当前某个 DOM 元素的状态，并在 componentDidUpdate 中进行相应的处理。
这两者的区别在于：

1. 在 React 开启异步渲染模式后，在 render 阶段读取到的 DOM 元素状态并不总是和 commit 阶段相同，这就导致在
   componentDidUpdate 中使用 componentWillUpdate 中读取到的 DOM 元素状态是不安全的，因为这时的值很有可能已经失效了。
2. getSnapshotBeforeUpdate 会在最终的 render 之前被调用，也就是说在 getSnapshotBeforeUpdate 中读取到的 DOM 元素状态是可以保证与 componentDidUpdate 中一致的。
   此生命周期返回的任何值都将作为参数传递给 componentDidUpdate（）。

![img](https://upload-images.jianshu.io/upload_images/16775500-8d325f8093591c76.jpg?imageMogr2/auto-orient/strip|imageView2/2/format/webp)

# 表单

#### 双向绑定的一个实例

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```

#### 处理多个输入框的 onChang

```
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.name === 'isGoing' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value    });
  }

  render() {
    return (
      <form>
        <label>
          参与:
          <input
            name="isGoing"            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          来宾人数:
          <input
            name="numberOfGuests"            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

# 状态提升（子传父）自定义事件

通常，多个组件需要反映相同的变化数据，这时我们建议将共享状态提升到最近的共同父组件中去。让我们看看它是如何运作的。

**子改变父亲也改变**

在 React 中，这个问题通常是通过使用“受控组件”来解决的。与 DOM 中的 `<input>` 接受 `value` 和 `onChange` 一样，自定义的 `TemperatureInput` 组件接受 `temperature` 和 `onTemperatureChange` 这两个来自父组件 `Calculator` 的 props。

现在，当 `TemperatureInput` 组件想更新温度时，需调用 **`this.props.onTemperatureChange`** 来更新它：

**自定义组件中的 `temperature` 和 `onTemperatureChange` 这两个 prop 的命名没有任何特殊含义。我们可以给它们取其它任意的名字，例如，把它们命名为 `value` 和 `onChange` 就是一种习惯。**

实例

就是 uni 中的 syn

**父**

```jsx
import React from 'react';
// import Test from "../../component/test/test";
import Test2 from '../../component/test/test2';
function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
export default class InputDome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: '',
      scale: 'c'
    };
  }
  handleCelsiusChange = (temperature) => {
    this.setState({ scale: 'c', temperature });
  };

  handleFahrenheitChange = (temperature) => {
    this.setState({ scale: 'f', temperature });
  };
  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius =
      scale === 'f'
        ? tryConvert(temperature, toCelsius)
        : temperature;
    const fahrenheit =
      scale === 'c'
        ? tryConvert(temperature, toFahrenheit)
        : temperature;

    return (
      <div>
        <Test2
          scale="c"
          temperature={celsius}
          onChangeProps={this.handleCelsiusChange}
        ></Test2>
        <Test2
          scale="f"
          temperature={fahrenheit}
          onChangeProps={this.handleFahrenheitChange}
        ></Test2>
        <BoilingVerdict
          celsius={parseFloat(celsius)}
        ></BoilingVerdict>
      </div>
    );
  }
}
```

**子**

```

import React from "react";

const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit",
};
export default class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onChangeProps(e.target.value);
  }
  render() {
    const temperature = this.props.temperature;
    console.log(temperature);
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

```

# 组合 vs 继承

### 组合

**React 有十分强大的组合模式。我们推荐使用组合而非继承来实现组件间的代码重用。**

#### 包含关系

有些组件无法提前知晓它们子组件的具体内容。在 `Sidebar`（侧边栏）和 `Dialog`（对话框）等展现通用容器（box）的组件中特别容易遇到这种情况。

**我们建议这些组件使用一个特殊的 `children` prop 来将他们的子组件传递到渲染结果中**

简单来说就是使我们 vue slot（插槽）

只是我获取方式使用 props.children

```jsx
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
这使得别的组件可以通过 JSX 嵌套，将任意组件作为子组件传递给它们。
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

少数情况下，你可能需要在一个组件中预留出几个“洞”。这种情况下，我们可以不使用 `children`，而是自行约定：将所需内容传入 props，并使用相应的 prop。

**简单来说就是我们的 props 可以传递一个 jsx 的对象（组件），来实现我们的组合组件**

```jsx
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">{props.left}</div>
      <div className="SplitPane-right">{props.right}</div>
    </div>
  );
}

function App() {
  return <SplitPane left={<Contacts />} right={<Chat />} />;
}
```

### 继承

**狗都不用**

**点赞**

在 Facebook，我们在成百上千个组件中使用 React。我们并没有发现需要使用继承来构建组件层次的情况。

Props 和组合为你提供了清晰而安全地定制组件外观和行为的灵活方式。注意：组件可以接受任意 props，包括基本数据类型，React 元素以及函数。

如果你想要在组件间复用非 UI 的功能，我们建议将其提取为一个单独的 JavaScript 模块，如函数、对象或者类。组件可以直接引入（import）而无需通过 extend 继承它们。

# 组件相关知识

## 创建

函数式(无状态，不能使用 state)

```jsx
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
```

class 方式

```jsx
export default class InputDome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: '',
      scale: 'c'
    };
  }
  handleCelsiusChange = (temperature) => {
    this.setState({ scale: 'c', temperature });
  };

  handleFahrenheitChange = (temperature) => {
    this.setState({ scale: 'f', temperature });
  };
  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius =
      scale === 'f'
        ? tryConvert(temperature, toCelsius)
        : temperature;
    const fahrenheit =
      scale === 'c'
        ? tryConvert(temperature, toFahrenheit)
        : temperature;

    return (
      <div>
        <Test2
          scale="c"
          temperature={celsius}
          onChangeProps={this.handleCelsiusChange}
        ></Test2>
        <Test2
          scale="f"
          temperature={fahrenheit}
          onChangeProps={this.handleFahrenheitChange}
        ></Test2>
        <BoilingVerdict
          celsius={parseFloat(celsius)}
        ></BoilingVerdict>
      </div>
    );
  }
}
```

## 使用

**在同一文件下使用**

在 render 中直接 retrun 。使用组件（方法）的名称做标签， 注意使用时使用大驼峰式的命名如：

```jsx
return (
  <div>
    <Test2
      scale="c"
      temperature={celsius}
      onChangeProps={this.handleCelsiusChange}
    ></Test2> //组件一
    <Test2
      scale="f"
      temperature={fahrenheit}
      onChangeProps={this.handleFahrenheitChange}
    ></Test2> //不同状态的 组件一
    <BoilingVerdict celsius={parseFloat(celsius)}></BoilingVerdict>//组件二
  </div>
);
```

**外部文件**

使用 es6 模块化 导出 export 导入 import 然后直接在页面中去挂载 或者 在 render 使用和上面一样

```jsx
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<InputDome></InputDome>);
```

## 命名导出（Named Exports）

`React.lazy` 目前只支持默认导出（default exports）。如果你想被引入的模块使用命名导出（named exports），你可以创建一个中间模块，来重新导出为默认模块。这能保证 tree shaking 不会出错，并且不必引入不需要的组件。

```js
// ManyComponents.js
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;
// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js";
// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));
```

## 使用懒加载组件

**`React.lazy` 函数能让你像渲染常规组件一样处理动态引入（的组件）。**

**使用之前：**

```js
import OtherComponent from './OtherComponent';
```

**使用之后：**

```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```

**然后应在 `Suspense` 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级（如 loading 指示器等）。**

```jsx
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

## 动态加载 js 文件 import

**使用之前：**

```js
import { add } from './math';

console.log(add(16, 26));
```

**使用之后：**

```js
import('./math').then((math) => {
  console.log(math.add(16, 26));
});
```

## 组件通信

#### 父传子：

Props 的只读性:组件无论是使用[函数声明还是通过 class 声明](https://react.docschina.org/docs/components-and-props.html#function-and-class-components)，都决不能修改自身的 props

#### 子传父：

状态提升（自定义事件）

# 高阶组件

## 高阶组件和高阶函数它们非常相似的

高阶函数英文叫 Higher-order function。[JavaScript](https://so.csdn.net/so/search?q=JavaScript&spm=1001.2101.3001.7020)的函数其实都指向某个变量。既然变量可以指向函数，函数的参数能接收变量，那么一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数。

**高阶函数的定义, 至少满足以下条件之一:**

> 接受一个或多个函数作为参数;
>
> 返回一个新的函数;

## 什么是高阶组件

高阶组件的英文是 Higher-Order Components，简称为 HOC;

官方的定义: 高阶组件是一个`参数为组件`，并且`返回值为新组件`的`函数`;

# 哲学

**教你怎么写组件**

https://react.docschina.org/docs/thinking-in-react.html

# 高级指引

# Fragments

React 中的一个常见模式是一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点

**就是一个无状态的组件的最外层**

```jsx
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```

# 短语法

你可以使用一种新的，且更简短的语法来声明 Fragments。它看起来像空标签：

```jsx
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}
```

你可以像使用任何其他元素一样使用 `<> </>`，除了它不支持 key 或属性。

**带 key**

`key` 是唯一可以传递给 `Fragment` 的属性。未来我们可能会添加对其他属性的支持，例如事件

```jsx
function Glossary(props) {
  return (
    <dl>
      {props.items.map((item) => (
        // 没有`key`，React 会发出一个关键警告
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```

# ref

**获取 dom 实例**

```jsx
import React, { createRef } from 'react';
export default class InputDome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { valeu: 0 };
    this.domref = createRef();
  }
  chang = () => {
    console.log(this.domref);
  };
  render() {
    return (
      <>
        <div className="okok" ref={this.domref}>
          ssssss
        </div>
        <div onClick={this.chang}>dianwo </div>
      </>
    );
  }
}
```

## 一个案例点击外面关闭弹出窗

通常实现这个功能的方法是在 `window` 对象中附上一个 `click` 事件以关闭弹窗

但使用键盘 tab 切换焦点它不会消失

```jsx
class OuterClickExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.toggleContainer = React.createRef();

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickOutsideHandler =
      this.onClickOutsideHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler);
  }

  onClickHandler() {
    this.setState((currentState) => ({
      isOpen: !currentState.isOpen
    }));
  }

  onClickOutsideHandler(event) {
    //判断我们ref绑定的dom是否包含我们触发事件的元素使用    contains方法 A元素 是否包含 B元素
    if (
      this.state.isOpen &&
      !this.toggleContainer.current.contains(event.target)
    ) {
      this.setState({ isOpen: false });
    }
  }

  render() {
    return (
      <div ref={this.toggleContainer}>
        <button onClick={this.onClickHandler}>
          Select an option
        </button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
    );
  }
}
```

**使用正确的事件触发器，比如 `onBlur` 和 `onFocus`，同样可以达成这项功能：**

修复上面的 bug

```jsx
class BlurExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.timeOutId = null;

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
  }

  onClickHandler() {
    this.setState((currentState) => ({
      isOpen: !currentState.isOpen
    }));
  }

  // 我们在下一个时间点使用 setTimeout 关闭弹窗。
  // 这是必要的，因为失去焦点事件会在新的焦点事件前被触发，
  // 我们需要通过这个步骤确认这个元素的一个子节点
  // 是否得到了焦点。
  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      });
    });
  }

  // 如果一个子节点获得了焦点，不要关闭弹窗。
  onFocusHandler() {
    clearTimeout(this.timeOutId);
  }

  render() {
    // React 通过把失去焦点和获得焦点事件传输给父节点
    // 来帮助我们。
    return (
      <div onBlur={this.onBlurHandler} onFocus={this.onFocusHandler}>
        <button
          onClick={this.onClickHandler}
          aria-haspopup="true"
          aria-expanded={this.state.isOpen}
        >
          Select an option
        </button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
    );
  }
}
```

# Context

Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。

**Context 主要应用场景在于*很多*不同层级的组件需要访问同样一些的数据。请谨慎使用，因为这会使得组件的复用性变差。**

```jsx
import React, { createRef } from 'react';

const ThemeContext = React.createContext('light'); //light为默认值 必须写在最前面
class Comone extends React.Component {
  static contextType = ThemeContext;
  render() {
    return <div>可以的到了{this.context}</div>;
  }
}
function Comtwo(props) {
  return (
    <div>
      <Comone></Comone>
    </div>
  );
}
export default class InputDome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { valeu: 0 };
    this.domref = createRef();
  }
  chang = () => {
    console.log(this.domref);
  };
  render() {
    return (
      <>
        <div className="okok" ref={this.domref}>
          ssssss
        </div>
        <div onClick={this.chang}>dianwo</div>
        <ThemeContext.Provider value="s">
          {' '}
          //key必须是value
          <Comtwo></Comtwo>
        </ThemeContext.Provider>
      </>
    );
  }
}
```

**如果你只是想避免层层传递一些属性，[组件组合（component composition）](https://react.docschina.org/docs/composition-vs-inheritance.html)有时候是一个比 context 更好的解决方案。**

# Hoock

让函数组件实现了动态数据

## useState()

VUE3 中的 ref？？

**可以让你在函数组件中实现动态数据**

引入

```
import React, { useState } from 'react';
```

使用

### 基本数据

```jsx
function Modethere(props) {
  const [discounts, setDiscounts] = useState(0); //0：初始值  //定义动态数据和修改方法
  let totlo = null;
  props.table.forEach((item) => {
    totlo = totlo + item.num * item.pic;
  });
  function chang(e) {
    console.log(e.target.value * 1);
    console.log(totlo);
    setDiscounts(e.target.value * 1); //修改 基本类型数据直接传修改的值
  }
  return (
    <div className="box_select">
      <p>总价： {totlo}</p>
      <div>
        <select onChange={chang} defaultValue="0">
          <option value="0">不使用</option>
          <option value="90">满200减90</option>
          <option value="50">满100百减50</option>
          <option value="10">满50减10</option>
        </select>
      </div>
      <p>使用优惠：{discounts}</p> //jsx中使用
    </div>
  );
}
```

### 对象数据

我们修改的时候需要先扩张一下

因为我们的 setObj（) 他是（相当于替换） obj

```jsx

  let [obj, setObj] = useState({
    username: "张三",
    age: 18,

  const handleClick = (key, value) => {
    // 需要传入一个新的对象
    setObj({
      ...obj,
      [key]: value,
    });
  };
```

### 数组数据

因为数组是应用数据类型但我们改变的数组是他**会影响原数组**的

最后去更新的是就是用**被修改后的数组**去更新替换原来的数组

```jsx
unction Demo() {
  let [list, setList] = useState([
    { username: "张三", finished: 17 },
    { username: "李四", finished: 18 },
    { username: "王五", finished: 19 },
  ]);

  const update = (item)=> {
    item.finished = !item.finished;
    // 需要传入一个新的数组
    setList([...list]);
  }
  return (
    <ul>
      {list.map((item, index) => (
        <li key={index}>
          <span>{item.username} </span>
          {item.finished?'已完成':'未完成'}
          <button onClick={()=>{update(item)}}>修改状态</button>
        </li>
      ))}
    </ul>
  );
 }

```

## useEffect

### 基本认识

**中括号内的变量发生了改变, 就会触发回调函数**(监听效果)

请求后台接口可以放在 useEffect 的函数里执行, 中括号为空或者不要中括号

```jsx
let [keyword, setKeyword] = useState('');
useEffect(() => {
  console.log(2222);
  // 当keyword发生变化时,会触发回调函数
}, [keyword]);
```

**你可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。**

所以**每次更新**都会走一遍 useEffect

## useMemo

类似 vue 的 computed

四则运算 dom

```jsx
import { useMemo, useState } from 'react';
import './index.scss';
function My() {
  const [num1, setnum1] = useState(0);
  const [num2, setnum2] = useState(0);
  const [sate, setsate] = useState('+');
  const operation = (e) => {
    setsate(e);
  };
  let cunt = useMemo(() => {
    let res = 0;
    switch (sate) {
      case '+':
        res = num1 + num2;
        break;
      case '-':
        res = num1 - num2;
        break;
      case '*':
        res = num1 * num2;
        break;
      case '/':
        res = num1 / num2;
        break;
      default:
    }
    return res;
  }, [num1, num2, sate]);
  return (
    <div>
      四则运算：
      <div className="btn">
        <button
          className={sate === '+' ? 'active' : ''}
          onClick={() => operation('+')}
        >
          +
        </button>
        <button
          className={sate === '-' ? 'active' : ''}
          onClick={() => operation('-')}
        >
          -
        </button>
        <button
          className={sate === '*' ? 'active' : ''}
          onClick={() => operation('*')}
        >
          *
        </button>
        <button
          className={sate === '/' ? 'active' : ''}
          onClick={() => operation('/')}
        >
          /
        </button>
      </div>
      <div>
        <input
          type="text"
          value={num1}
          onChange={(e) => setnum1(e.target.value * 1)}
        />
      </div>
      <div>
        <input
          type="text"
          value={num2}
          onChange={(e) => setnum2(e.target.value * 1)}
        />
      </div>
      结果：{cunt}
    </div>
  );
}

export default My;
```

### 参数规矩

useEffect 和 useMemo 的参数

大致的意思就是如果你的副作用**没有使用任何依赖**，只是单纯的做没有赋值或者调用接口的操作，可以使用空数组，但是如果你的副作用直接或者间接使用了外部的变量，那么**你就需要给 useEffect 的第二个参数传入依赖值**，这样可以减少错误的发生，保证数据每次更新时都能获取到。

**就是用你用了外部变量要传给他**

## useNavigate 路由跳转

```js
import { useNavigate } from 'react-router-dom';

function Home() {
  const nav = useNavigate();
  function toURL() {
    nav('/my');
  }
  return (
    <div className="home">
      <button onClick={toURL}>我要跳转</button>
    </div>
  );
}
```

## useContext

**共享数据给多给子组件或者子子组件**

方法也能传，且可以给父传值 **升级版的 props**

同一个组件下的子组件和子子。。。。组件都能获取值

```js
import React, { useState, createContext, useContext } from 'react';
const CountContext = createContext(0);
const Example = () => {
  const [count, setCount] = useState(0);
  // 传给子组件或者子子组件的方法
  function add(data) {
    console.log(data);
  }
  return (
    <div>
      <p>父组件点击数量：{count}</p>
      <button onClick={() => setCount(count + 1)}>点击+1</button>
      <CountContext.Provider value={{ count, add }}>
        <Counter />
      </CountContext.Provider>
    </div>
  );
};
const Counter = () => {
  const count = useContext(CountContext);
  return (
    <div>
      {' '}
      <p>子组件获得的点击数量：{count.count}</p>
      <button
        onClick={() => {
          count.add('子组件获取到方法，给你的值');
        }}
      >
        子组件
      </button>
      <Counter2></Counter2>
    </div>
  );
};
const Counter2 = () => {
  const count = useContext(CountContext);
  return (
    <div>
      <p>子子组件获得的点击数量：{count.count}</p>;
      <button
        onClick={() => {
          count.add('子子组件获取到方法，给你的值');
        }}
      >
        子子组件
      </button>
    </div>
  );
};
export default Example;
```

# 路由

**`npm i react-router-dom` 安装路由插件**

## 基本使用

1. Router 最外层需要用 Router 进行包裹(只需一次)
2. Routes 路由组件包裹层
3. Route 用来配置路由,包括路由地址和路由组件
4. 重定向使用 Navigate

```jsx
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import Home from 'view/home';
import My from 'view/my';
import Footer from 'components/footer';
import Example from 'view/car';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/*重定向*/}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />}></Route>
          <Route path="/my" element={<My />}></Route>
          <Route path="/eample" element={<Example />}></Route>
        </Routes>
      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;
```

## 路由懒加载

以后再说吧

使用 ts 模仿 vue 路由！

## 子路由

```jsx
<Route path="/house" element={<Home />}>
  {/* 嵌套路由(子路由)配置 */}
  <Route path="detail" element={<Detail />} />
  {/*访问/home,默认显示list*/} 配置了index就默认访问
  <Route index element={<List />} />
</Route>
```

父组件需要一个容器（outlet）来存放我们的子路由的组件

```js
// home.jsx 父路由
import { Outlet } from 'react-router-dom';

function Index() {
  return (
    <div>
      <h3>父组件</h3>
      <hr />
      <Outlet />
    </div>
  );
}

export default Index;
```

## 使用 hook 跳转

```
import "./index.scss";
import { useNavigate } from "react-router-dom";
function Home() {
  const nav=useNavigate()

  function toURL(){
    nav('/my')
  }
  return (
    <div className="home">
      <button onClick={toURL}>我要跳转</button>
    </div>
  );
}

export default Home;
```

## 返回上一页

() => { nav(-1); }

## link 跳转

```js
<div className="nav">
  <Link to="/home">我去HOME</Link>
  <Link to="/my">我去我的</Link>
  <Link to="/eample">我去购物车</Link>
</div>
```

## 高亮跳转

使用 react-router6.0 版本的一个 NavLink 的用法

是因为 6.0 版本官方已经不再支持 activeClassName 这种写法，需要换成动态设置 className。

```jsx
<div className="nav">
  <NavLink
    className={({ isActive }) =>
      'list-group-item' + (isActive ? ' mactive' : '')
    }
    to="/home"
  >
    我去HOME
  </NavLink>
  <NavLink
    className={({ isActive }) =>
      'list-group-item' + (isActive ? ' mactive' : '')
    }
    to="/my"
  >
    我去我的
  </NavLink>
  <NavLink
    className={({ isActive }) =>
      'list-group-item' + (isActive ? ' mactive' : '')
    }
    to="/eample"
  >
    我去购物车
  </NavLink>
</div>
```

scss

```scss
.list-group-item {
  width: 100px;
  height: 40px;
  display: block;
  color: black;
  &:hover {
    text-decoration: none;
  }
}
.mactive {
  background-color: pink;
}
```

就能自定义高亮样式

## 路由传参

### 通过 state 传参

传递数据

```react
// 列表页面
import {useNavigate} from 'react-router-dom';

function House({ houseList}) {
  const navigate = useNavigate();
  // 跳转到详情
  const toDetail = (item) => {
    navigate('/home/detail',{
      // state里放要传递的参数
      state: {
        id: item.id
      }
    })
  }
```

接收参数

```react
// 详情页面
import {useLocation} from 'react-router-dom';
function List() {
    const location = useLocation();
    console.log(location);
    return ( <div>详情</div> );
}
export default List;
```

### 动态路由传参（ params）

配置动态路由(app.js)

```react
 <Route path="/demo2/:id" element={<Demo2 />} />
```

路由跳转并传参(demo.jsx);

```react
import React from "react";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router'

function Demo() {
  const navigate = useNavigate();
  return (
    <div>
      <Link to="/demo2/2222">去demo2</Link>
      <button onClick={()=>{navigate('/demo2/3333')}}>去demo2</button>
    </div>
  );
}

export default Demo;
```

接收参数

```react
import React from "react";
import {useParams} from 'react-router';
function Demo2() {
  const params = useParams();
  console.log(params);
  return (
    <div>
      <p>{params.id}</p>
    </div>
  );
}

export default Demo2;
```

1. #### query

```js
<Route path='/query' component={Query}/>
<Link to={{ path : ' /query' , query : { name : 'sunny' }}}>
this.props.history.push({pathname:"/query",query: { name : 'sunny' }});
读取参数用: this.props.location.query.name
```

### search 路由传参（query）

接收页数用 useLocation

```react
search传参
传递
	<NavLink to="/page1/son">去子路由</NavLink>
1
使用，在router5中，取search参数还需要通过querystring来帮助解析，而在router6中，search参数被封装成了一个map对象
	export default function Page1() {
	  return (
	    <div>
	      <div>
	        <NavLink to="/page1/son">去子路由</NavLink>
	      </div>
	      <div>
	        <Outlet />
	      </div>
	    </div>
	  );
	}
```

接收

```jsx
import {useNavigate,useSearchParams} from 'react-router'
unction Demo2() {

const [search,setSearch] = useSearchParams();
console.log(search.get('id'));
  return (
    <div>
      <p>{params.id}</p>
    </div>
  );
}

```

## 传统方法

```jsx
编程式导航
场景：点击登录按钮，登录成功后，通过代码跳转到后台首页，如何实现？
编程式导航：通过 JS 代码来实现页面跳转
history 是 React 路由提供的，用于获取浏览器历史记录的相关信息
push(path)：跳转到某个页面，参数 path 表示要跳转的路径
go(n)： 前进或后退到某个页面，参数 n 表示前进或后退页面数量（比如：-1 表示后退到上一页）
class Login extends Component {
handleLogin = () => {
// ...
this.props.history.push('/home')
}
render() {...省略其他代码}

```

## 传参方法比较

- 1、params 传参(刷新页面后参数不消失，参数会在地址栏显示)
- 2.query 传参(刷新页面后参数消失)
- 3.state 传参( 刷新页面后参数不消失，state 传的参数是加密的，比 query 传参好用)

## 切分路由

新建 router/index.js 文件

```js
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from 'view/home';
import My from 'view/my';
import Example from 'view/car';

function RouterView() {
  return (
    <div>
      <Routes>
        {/*重定向*/}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />}></Route>
        <Route path="/my" element={<My />}></Route>
        <Route path="/eample" element={<Example />}></Route>
      </Routes>
    </div>
  );
}

export default RouterView;
```

引入使用

import RouterView from './router'

<RouterView></RouterView>

但我们的最外层还是要

```jsx
import { HashRouter as Router } from 'react-router-dom';
<Router>
  <App />
</Router>;
```

## 路由拦截

路由在这个页面不显示一个组件！！！

使路由用 hooks

```jsx
import Footer from 'components/footer';
import RouterView from './router/index';
import { useLocation } from 'react-router-dom';
function App() {
  let location = useLocation();
  // 底部栏显示白名单
  let TabBarList = ['/home', '/my', '/discover', '/submit'];
  console.log(location.pathname);
  let showTabBar = TabBarList.some((item) => {
    return item === location.pathname;
  });
  console.log(showTabBar);
  return (
    <div className="App">
      {/* 路由组件 */}
      <RouterView></RouterView>
      {showTabBar ? <Footer></Footer> : ''}
    </div>
  );
}
<style></style>;
export default App;
```

## 路由跳转都要放在在<Router />中！

# 状态管理 redux

`ReactRedux`是一套 React 专用的全局状态管理工具，在大型项目中也非常常用。

**redux** 是一个专门用于做状态管理的 JS 库(不是 react 插件库)

## redux 使用情况

- 一个状态多个组件使用，多个组件可以随时拿到（共享）。
- 一个组件需要改变另一个组件的状态（通信）。
- 能不使用就不使用, 状态共享使用不方便时考虑使用。

## 三大核心

#### Action

可以省略创建。
把数据从应用传到 store 的有效载荷，Action 是 store 数据的唯一来源。
一般来说会通过 store.dispatch() 将 action 传到 store。
有两个属性
type ：标识属性, 值为字符串, 唯一, 必要属性。
data ：数据属性, 值类型任意, 可选属性

#### Store

用来维持应用所有的 state 树 的一个对象，改变 store 内 state 的惟一途径是对它 dispatch 一个 action。

Store 不是类，它只是有几个方法的对象。 要创建它，只需要把根部的 reducing 函数传递给 createStore。

#### Reducers

指定了应用状态的变化如何响应 actions 并发送到 store 。
Reduce r 函数会接收到两个参数，分别为：之前的状态、动作对象。
Reducer 有两个作用：初始化状态、加工状态。
Reducer 的第一次调用时，是 store 自动触发的，传递的 preState(之前的状态) 是 undefined

Store 方法

####

### store.getState()

返回应用当前的 state 树。
它与 store 的最后一个 reducer 返回值相同。

### store.dispatch(action)

分发 action。这是触发 state 变化的惟一途径。
会使用当前 getState() 的结果和传入的 action 以同步方式的调用 store 的 reduce 函数。返回值会被作为下一个 state。

####

### store.subscribe(() => { });

添加一个变化监听器。每当 dispatch action 的时候就会执行，state 树中的一部分可能已经变化。可以在回调函数里调用 getState() 来拿到当前 state。
状态改变后重新渲染，有两种方法：

### 1.安装

react-redux 是基于 redux 这个包的，所以我们需要在安装 react-redux 的时候，把 redux 一起安装

```
npm i redux react-redux 或者 yarn add redux react-redux
```

### 2.基本使用

创建 store 文件夹里面创建 index.js

```js
import { createStore } from 'redux';
// 1.state的初始值
const initState = {
  count: 2
};
// 2.声明action creator 并导出,payload是派发action时传进来的数据
export const updateCount = function (payload) {
  // 此函数返回一个action
  return {
    type: 'UPDATE_COUNT',
    payload
  };
};
// 3.声明reducer
const reducer = function (state = initState, action) {
  let { type, payload } = action;
  switch (type) {
    case 'UPDATE_COUNT':
      return {
        ...state,
        count: state.count + payload
      };
    default:
      return state;
  }
};
let store = createStore(reducer);
export default store;
```

#### 注册

在 index.js 注册

```js
import store from './store/store.js';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

#### hook 方式的获取修改

##### useSelector

1. react-redux 提供了 useSelector
2. useSelector 作用：从 store 中获取状态
3. selector 函数应该是应该纯函数

```jsx
import React from 'react';
import { useSelector } from 'react-redux';
const App = () => {
  const count = useSelector((state) => state);
  return (
    <div>
      <h3>{count}</h3>
    </div>
  );
};
export default App;
```

##### useDispatch

作用：得到 dispatch 来触发 action （触发 action 会执行 reducer，reducer 负责数据的修改，[react](https://so.csdn.net/so/search?q=react&spm=1001.2101.3001.7020)-redux 内部会监听数据的变化自动进行视图进行更新）

```jsx
// import {  useMemo, useState } from 'react';
import './index.scss';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCount } from 'store/index'; //引入action
function My() {
  const count = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(count);
  return (
    <div>
      <h3>{count.count}</h3>
      <button
        onClick={() => {
          dispatch(updateCount(1));
        }}
      ></button>
    </div>
  );
}

export default My;
```

#### 获取和修改的另一种方式

**狗都不用**

```jsx
import React from 'react';
// 1 导入action creator等相关东西
import { updateCount } from 'redux/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function Demo(props) {
  return (
    <div>
      {/* 5.获取count的值 */}
      <p>count的值: {props.count}</p>

      {/* 修改count的值 */}
      <button
        onClick={() => {
          props.updateCount(props.count + 1);
        }}
      >
        修改count
      </button>
    </div>
  );
}

// 2.把store里state转变成props来使用,后面访问state时就使用props.xxx来进行访问
// @params state store里面所有状态
function mapStateToProps(state) {
  return {
    // 组件使用props.count来访问count状态
    count: state.count
  };
}
// 3.把dispatch转变成props来使用
function mapDispatchToProps(dispatch) {
  return {
    // bindActionCreators的作用:把action creator和dispatch绑定起来
    updateCount: bindActionCreators(updateCount, dispatch)
  };
}

// 4.connect方法的作用: 把普通组件Demo变高阶组件
export default connect(mapStateToProps, mapDispatchToProps)(Demo);
```

## 模块化就是将文件拆分

创建 user 和 car 两个模块

user/index.js

```js
// user模块
// 1.usermok的初始化状态
const initState = {
  phone: '',
  token: '',
  msg: 'twp'
};

// 2.相关action creator
export const updatePhone = function (payload) {
  // 返回一个action
  return {
    type: 'UPDATE_PHONE',
    payload
  };
};
export const updateToken = function (payload) {
  return {
    type: 'UPDATE_TOKEN',
    payload
  };
};

export const updateMsg = function (payload) {
  return {
    type: 'UPDATE_U_MSG',
    payload
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initState, action) {
  let { type, payload } = action;
  switch (type) {
    case 'UPDATE_PHONE':
      return {
        ...state,
        phone: payload
      };
    case 'UPDATE_TOKEN':
      return {
        ...state,
        token: payload
      };
    case 'UPDATE_U_MSG':
      return {
        ...state,
        msg: payload
      };
    default:
      return state;
  }
}
```

car/index.js

```js
// demo模块
// 1.state的初始值
const initState = {
  count: 20,
  msg: '小明好棒'
};
// 2.声明action creator 并导出,payload是派发action时传进来的数据
export const updateCount = function (payload) {
  // 此函数返回一个action
  return {
    type: 'UPDATE_COUNT',
    payload
  };
};
export const updateMsg = function (payload) {
  // 此函数返回一个action
  return {
    type: 'UPDATE_D_MSG',
    payload
  };
};
// 3.声明reducer
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initState, action) {
  let { type, payload } = action;
  switch (type) {
    case 'UPDATE_COUNT':
      return {
        ...state,
        count: payload
      };
    case 'UPDATE_D_MSG':
      return {
        ...state,
        msg: payload
      };
    default:
      return state;
  }
}
```

在 store 中合并

```js
// 合并reducer, /src/redux/index.js
import { createStore } from 'redux';
import demoReducer from './car';
import userReducer from './user';

// combineReducers()是用于合并模块的方法
import { combineReducers } from 'redux';

// 合并reducer
let reducers = combineReducers({
  // 对模块的state内容进行扩展
  car: demoReducer,
  user: userReducer
});

export default createStore(reducers);
```

### 使用！

```js
// import {  useMemo, useState } from 'react';
import './index.scss';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePhone } from 'store/user';
function My() {
  增加一个模块就得了;
  const count = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(count);
  return (
    <div>
      <h3>{count.phone}</h3>
      <button
        onClick={() => {
          dispatch(updatePhone('99999999999999999999'));
        }}
      >
        {' '}
        模块化改变rudex
      </button>
    </div>
  );
}
export default My;
```

## 另一种模块化这里就可以用我们全新的一整写法了

## 数据持久化（就是利用浏览器缓存机制， localStorage， sessionStorage）进行储存

npm i redux-persist --save

store/index.js

```js
// 合并reducer, /src/redux/index.js
import { createStore } from 'redux';
import demoReducer from './car';
import userReducer from './user';
// combineReducers()是用于合并模块的方法
import { combineReducers } from 'redux';

// 1.导入相关插件
// persistStore持久化store, 持久化reducer
import { persistStore, persistReducer } from 'redux-persist';
// storageSession缓存
import storageSession from 'redux-persist/lib/storage/session';
// 2.store持久化设置
const storageConfig = {
  key: 'root', // 必须有的
  storage: storageSession, // 缓存机制
  blacklist: ['user'] // reducer 里不持久化的数据,除此外均为持久化数据 名称=模块名称
};

// 合并reducer
let reducers = combineReducers({
  // 对模块的state内容进行扩展
  car: demoReducer,
  user: userReducer
});
// 4.给reducer应用持久化配置
const newReducers = persistReducer(storageConfig, reducers);
// 5.创建store
const store = createStore(newReducers);
// 6.对store进行持久化并导出
export const persistor = persistStore(store);
// 7.导出store
export default store;
```

## index.js 挂载持久化

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// 样式重置
import './static/style/reset.css';
// 路由
import { HashRouter as Router } from 'react-router-dom';

// redux 和数据持久化
import { Provider } from 'react-redux';
import store, { persistor } from './store/index.js';
import { PersistGate } from 'redux-persist/lib/integration/react';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>
);
```

## 异步 action,使用 redux-thunk 实现

1. 安装 redux-thunk :npm i redux-thunk
2. 改造/store/index.js

```js
//1.applyMiddleware 加载中间件
import { createStore, applyMiddleware } from 'redux';
//2.导入异步中间件thunk
import thunk from 'redux-thunk';
const store = createStore(newReducers, applyMiddleware(thunk));
```

模拟异步

```js
export const updateCount = (payload) => {
  // 异步action, 允许返回一个函数,使用dispatch派发action!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1!!!!11
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: 'UPDATE_COUNT',
        payload
      });
    }, 1000);
  };
};
```

# Mobx(用这个)

状态管理二

安装 npm install mobx mobx-react

## 创建 mobx/index.js

```react
import * as mobx from "mobx";
class Store {
  count = 990;

  constructor() {
    mobx.makeAutoObservable(this);
    this.add = this.add.bind(this);
    this.minus = this.minus.bind(this);
  }

  add() {
    this.count++;
  }
  minus() {
    this.count--;
  }

  get double() {
    return this.count * 2;
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new Store();

```

## 挂载

```js
import { Provider } from 'mobx-react';
import store from './mobx/index';

<Provider store={store}>
  <App />
</Provider>;
```

## 使用修改

```

import "./index.scss";
import { inject, observer } from "mobx-react";
function Home({store}) {
  return (
    <div className="home">
      <div>
        我是使用Mobx
        {store.count}
        <button onClick={()=>store.add()}>改变Mobx</button>
      </div>

      <div className="home_er">我是scss</div>
    </div>
  );
}

// export default Home;
export default inject("store")(observer(Home));
```

# 常用工具

## 配置 jsconfig.json

代码

```json
jsconfig.json
{
    "compilerOptions": {
      "baseUrl": "src"
    },
    "include": ["src"]
  }
```

```
import axios from "../../../utils/request";   // 以前的写法
// 配置jsconfig.json后
import axios from "utils/request";
```

## scss

npm i node-sass -D

index.js 中引入

```js
import './home.scss'; //不用加from
```

## 封装请求

npm i axios -D

```js
import axios from 'axios';
let isDev = process.env.NODE_ENV === 'development';
let baseURL;
if (isDev) {
  baseURL = 'http://localhost:3006';
} else {
  baseURL = 'http://huruqing.cn:3006';
}
const service = axios.create({
  baseURL,
  timeout: 10 * 60 * 1000
});

//4. 请求拦截
service.interceptors.request.use(
  (config) => {
    // 添加请求头
    config.headers['user-token'] = 'xxx';
    // 统一get和post请求参数
    if (config.method.toLowerCase() === 'get') {
      config.params = config.data;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  (res) => {
    const data = res.data;
    if (data.code !== 666) {
      return Promise.reject(data.msg);
    }
    return data;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export default service;
```

### 管理 api

```js
import request from './request';
export const test = (data) => {
  return request({
    method: 'get',
    url: '/city/list',
    data
  });
};
```

### 调用发请求

```js
import { test } from 'service/api';
import { useState, useEffect } from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';
function Home() {
  let [obj, setobj] = useState([]);
  const nav = useNavigate();
  const getsss = () => {
    test().then((res) => {
      setobj(res.data);
      console.log(res.data);
    });
  };
  useEffect(getsss, []); //请求必须加一个[]不然死循环
  function toURL() {
    nav('/my');
  }
  return (
    <div className="home">
      <button onClick={toURL}>我要跳转</button>
      我是Home页
      {obj.map((item) => {
        return <li key={item.id}>{item.id}</li>;
      })}
      <div className="home_er">我是scss</div>
    </div>
  );
}

export default Home;
```

## 性能优化

### 知识点

1. shouldComponentUpdate
2. PureComponent
3. useMemo

### (1) shouldComponentUpdate

类(class)组件性能 9 优化可以使用 shouldCompoentUpdate 进行优化 这**也是一个生命周期**

```
// nextProps下一个属性(新的属性),nextState下一个状态(新的状态)
shouldComponentUpdate(nextProps, nextState) {
    // 根据新的属性或者状态决定要不要更新页面
   if(xxx) {
       return true;
    } else {
       return false
   }
}
```

### (2) PureComponent

类(class)组件, 可以让其继承 React.PureComponent 来实现优化

```
import React from "react";
class Demo extends React.PureComponent {
  constructor(props){
    super(props);
  }

  render() {
    console.log(this.props);
    return (<div>性能优化</div>)
  }
}
export default Demo;
```

### (3) memo

**函数组件**可以使用 React.memo 进行包装以实现优化

**导出使用 React.memo(Scene)**

```
import React from "react";
function Scene(props) {
  return <div>{props.name}</div>;
}
export default React.memo(Scene);
```

https://www.jianshu.com/p/b3d07860b778

## 组件库

http://ant-design-mobile.antgroup.com/zh/guide/quick-start
