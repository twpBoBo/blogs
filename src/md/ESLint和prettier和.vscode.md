# vue项目中配置eslint和prettier



## .vscode

你可以在任意的项目根目录创建一个 .vscode/settings.json 文件，这个 json 文件可以配置 VSCode 中 settings.json 同样的配置。例如下面这样。

```json
{
  "editor.formatOnSave": true
}
```

这项配置使 VSCode 在保存时自动格式化代码。在 VSCode 内部的配置文件 settings.json，同样可以配置这条选项。.vscode/settings.json 会覆盖 VSCode 内部配置文件 settings.json 中的配置，这是合理的。

那么这么做的好处是什么呢？当一个项目需要多人协作时，可以通过配置项目根目录下的 .vscode/settings.json 达到共享配置的目的。

我们可以将 VSCode 扩展的配置放到 .vscode/settings.json 中与他人共享扩展配置吗？当然是可以的。不要忘了 .vscode/settings.json 可以配置 vscode 内部的 settings.json，VSCode 扩展的配置也写在 VSCode 内部的 settings.json 中。常常不必这么做。像 Prettier 和 ESLint 为我们提供了单独的配置文件放在项目根目录下，VSCode 能够自动读取其配置并生效（前提是 VSCode 安装了对应的扩展），这在上文已经验证了。

**记住一点即可：.vscode/settings.json 仅作用于 VSCode 内部的 settings.json。*****



### VUE配置.vscode

```json
{
  // css转rem配置
  "cssrem.rootFontSize": 37.5,
  "window.zoomLevel": 1,//屏幕放大倍数
  "[vue]": {//设置vue文件采用prettier进行格式化
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.formatOnSave": true,//保存代码时候自动触发格式化
}
```

### 如何解决冲突

#####  解决方式主要采用了官方提供的两款插件：

eslint-config-prettier：这个工具其实就是禁用掉了一些不必要的以及和 Prettier 相冲突的 ESLint 规则；

eslint-plugin-prettier：这个插件的主要作用就是将 prettier 作为 ESLint 的规则来使用，相当于代码不符合 Prettier 的标准时，会报一个 ESLint 错误，同时也可以通过 eslint --fix 来进行格式化；这样就相当于将 Prettier 整合进了 ESLint 中；

### VUE配置ESLint和Prettiervue中采用eslint和prettier规范代码

##### VUE帮我们安装了解决冲突的两个插件我们直接用就好了

##### 如果有什么特殊的规范我们可以在配置文件eslintrc.js和.prettierrc.js

##### 自己添加

###  创建项目时候手动选择格式化规范

![img](https://img-blog.csdnimg.cn/7d2ccb6a391f41ab894d3d97879160b5.png)

###  项目中与规范校验相关的依赖

![img](https://img-blog.csdnimg.cn/c163bd8499524b899414a432471a1949.png)

### **eslintrc.js中有关配置**

![img](https://img-blog.csdnimg.cn/9a5710f7c4484ae1a9bef8429c8c49a1.png)

### 自定义prettier规则

**在项目根目录下创建.prettierrc.js文件（也支持.prettierrc.json格式）***

**注意注意注意：修改.prettierrc.js后一定要重新启动vscode，不然eslint不会生效**

```js
// .prettierrc.js
module.exports = {
  // 最大长度80个字符
  printWidth: 80,
  // 行末分号
  semi: false,
  // 单引号
  singleQuote: true,
  // JSX双引号
  jsxSingleQuote: false,
  // 尽可能使用尾随逗号（包括函数参数）
  trailingComma: "none",
  // 在对象文字中打印括号之间的空格。
  bracketSpacing: true,
  // > 标签放在最后一行的末尾，而不是单独放在下一行
  jsxBracketSameLine: false,
  // 箭头圆括号
  arrowParens: "avoid",
  // 在文件顶部插入一个特殊的 @format 标记，指定文件格式需要被格式化。
  insertPragma: false,
  // 缩进
  tabWidth: 2,
  // 使用tab还是空格
  useTabs: false,
  // 行尾换行格式
  endOfLine: "auto",
  HTMLWhitespaceSensitivity: "ignore",
};
```

### 4.5 配置eslint忽略文件

在项目根目录下新建.eslintignore文件

```json
// .eslintignore
build/*.js
src/assets
public
dist
```

### 4.6 重启vscode后，运行package.json中的lint指令，即可格式化所有的文件 

### npm run lint

![img](https://img-blog.csdnimg.cn/de3a67a9aa2447e18e8934eb3c34a4fd.png)

### 项目配置文档

可以在项目根目录下新建.vscode文件夹，新建settings.json文件，对项目的配置进行统一处理，测试时候的settings.json内容为：

```json
{
  // css转rem配置
  "cssrem.rootFontSize": 37.5,
  "window.zoomLevel": 1,//屏幕放大倍数
  "[vue]": {//设置vue文件采用prettier进行格式化
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.formatOnSave": true,//保存代码时候自动触发格式化
}
```

