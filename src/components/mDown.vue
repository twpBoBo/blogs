<!-- ? 模块 -->
<template>
  <!-- md -->
  <div class="md">
    <!-- 返回 -->
    <div class="header">
      <i
        class="iconfont back icon-xiangzuo"
        @click="router.back(-1)"
      ></i>
    </div>
    <!-- md导航栏 -->
    <div class="left">
      <div
        v-for="(item, index) in titles"
        :key="index"
        class="nav"
        :style="{
          padding: `10px 0 10px ${item.indent * 20}px`,
          fontWeight: item.indent == 0 ? 'bold' : ''
        }"
        @click="handleAnchorClick(item)"
      >
        <a style="cursor: pointer">{{ item.title }}</a>
      </div>
    </div>
    <!-- md内容 -->
    <div class="right">
      <v-md-preview :text="Mdtext" ref="preview"></v-md-preview>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onActivated } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// 获取路由参数
const route = useRoute();
const router = useRouter();
// md
const titles = ref([]);
const preview = ref('');
const Mdtext = ref('');
// 获取我们的导航标签字段
onActivated(() => {
  // 动态获取md文章
  import(`@/md/${route.params.tit}.md?raw`).then((res) => {
    // default就表示你里面所有(默认)内容
    Mdtext.value = res.default;
    // 需要使用nextTick这个钩子等dom渲染完成之后在去获取dom，不然获取不到dom
    nextTick(() => {
      // 获取我们标题对象（数组）
      let Element = preview.value.$el.querySelectorAll(
        'h1,h2,h3,h4,h5,h6'
      );
      // 标题字段去空格,转数组
      let title = Array.from(Element).filter(
        (title) => !!title.innerText.trim()
      );
      // 如果没有标题字段就返回
      if (!title.length) {
        titles.value = [];
        return;
      }
      // 标题分级
      const hTags = Array.from(
        new Set(title.map((title) => title.tagName))
      ).sort();
      // 赋值给导航列表
      titles.value = title.map((el) => ({
        title: el.innerText, //标题
        lineIndex: el.getAttribute('data-v-md-line'), //用于锚点
        indent: hTags.indexOf(el.tagName) //用于标签分级
      }));
    });
  });
});
// 点击导航
function handleAnchorClick(item) {
  console.log(1);
  const { lineIndex } = item;
  const heading = preview.value.$el.querySelector(
    `[data-v-md-line="${lineIndex}"]`
  );
  // console.log(item);
  // console.log(heading);
  if (heading) {
    console.log(1);
    preview.value.scrollToTarget({
      target: heading,
      scrollContainer: window
    });
  }
}
</script>
<style lang="scss" scoped>
.md {
  display: flex;
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 275px;
    height: 50px;
    background-color: white;
    z-index: 999999;
    .back {
      font-size: 40px;
      color: aqua;
    }
  }

  .left {
    position: fixed;
    top: 0;
    height: 100vh;
    width: 275px;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 50px 10px 0;
    z-index: 9999;
    padding-bottom: 50px;
    // box-sizing: border-box;
    .nav {
      width: 275px;
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .right {
    min-width: 1000px;
    margin-left: 275px;
  }
}
/* // 自定义滚动条样式
// ::-webkit-scrollbar-track  滚动条中长度的样式
// ::-webkit-scrollbar-thumb 滚动当前的样式
// 滚动条的长宽 */
::-webkit-scrollbar {
  width: 15px;
  height: 15px;
}
/* // 滚动条的边框 */
::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
  border-radius: 999px;
  border: 5px solid transparent;
}

/* // 滚动条内部阴影 */
::-webkit-scrollbar-track {
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2) inset;
}
/* // 滚动条当前位置条的样式 */
::-webkit-scrollbar-thumb {
  min-height: 20px;
  background-clip: content-box;
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2) inset;
}

::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
