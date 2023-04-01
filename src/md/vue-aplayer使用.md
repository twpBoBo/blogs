# vue-aplayer 使用

[官方文档]: https://aplayer.netlify.app/docs/

```bash
npm install vue-aplayer --save //安装

```

模板中使用

```html
<div class="">
    <a-player :music="audio" :lrcType="1" :showlrc="true" v-if="isShow" />
  </div>
```



```js
import APlayer from "vue-aplayer";

export default {

 components: { APlayer },

 data() {

  return {

   // 音频列表

   audio: {}, 
   //audio可以是数组,数组表示这是一个歌单列表  模板中就:music="audio[0]"来展示第一首歌
   // audio基本结构 文档都有对应的配置
      audio: {
        name: '东西（Cover：林俊呈）',
        artist: '纳豆',
        url: 'https://cdn.moefe.org/music/mp3/thing.mp3',
        lrc: 'https://cdn.moefe.org/music/lrc/thing.lrc',
      },
   

  };

 },


```

## 动态点击切换歌曲

在榜单页请求的到数据存到  vuex 中

在组件中使用

```js
 watch: {
	//vuex中的值变化我们就改变我们audio中的数据
  "$store.state.audio": function (value) {

   this.audio = value;

  },
```

### bug

点击播放音乐只用第一次是自动播放的

后面的就处于暂停状态

一个很2的解决办法

   

给组件添加一个  v-if="isShow"  

v-if  它是会销毁Dom，然后在我们数据改变先销毁在重新创建

它一直处于第一次播放的这种状态

```js
  "$store.state.audio": function (value) {
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
      }, 500);
      this.audio = value;
      // console.log(value.lrc);
   },
```

 

### 总结 

vue-aplayer 是一个很简单的一个音乐组件，照着文档就能实现

 
