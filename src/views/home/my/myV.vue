<!-- ? 模块 -->
<template>
  <div class="my">
    <transition
      enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <side-bar v-if="isShow" @changType="changType"></side-bar>
    </transition>
    <div class="my_btn">
      <svg class="icon icon_btn" @click="ShowSbBtn">
        <use :xlink:href="TypeList[isShowArt].log"></use>
      </svg>
    </div>
    <!-- md文章导航 -->
    <div class="my_md">
      <div class="mdNavWarp" v-for="(item, index) in NavList" :key="index">
        <ul class="mdNav" v-if="item.type == TypeList[isShowArt].tit">
          <li
            class="item"
            v-for="(item2, index2) in item.list"
            :key="index2"
            @click="toDetail(item2, item.type)"
          >
            {{ item2 }}
          </li>
        </ul>
      </div>
      <div class="mdCon">
        <svg class="icons mb-30">
          <use :xlink:href="TypeList[isShowArt].log"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import sideBar from './sideBar/sideBar.vue';
import { debounce } from '@/utils/tool';
// md文章标题
import NavList from '@/md/nav';
import { useRouter } from 'vue-router';
const router = useRouter();
let TypeList = [
  {
    tit: 'VUE',
    log: '#icon-Vue'
  },
  {
    tit: 'React',
    log: ' #icon-React'
  },
  {
    tit: 'Node',
    log: '#icon-Nodejs'
  },
  {
    tit: 'App',
    log: '#icon-xiaochengxu1'
  },
  {
    tit: 'Other',
    log: '#icon-qita1'
  }
];
// 内容侧边栏显示
const isShowArt = ref(0);
const isShow = ref(false);
const ShowSbBtn = debounce(
  () => {
    isShow.value = !isShow.value;
  },
  500,
  true
);
// console.log(isShowArt.value);
// 切换内容
function changType(value) {
  // console.log(value);
  isShowArt.value = value;
  isShow.value = false;
}
// 去详情页
function toDetail(tit) {
  console.log(tit);
  router.push({
    name: 'mDown',
    params: {
      tit
    }
  });
}
</script>
<style lang="scss" scoped>
.icon {
  width: 50px;
  height: 50px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.icons {
  width: 400px;
  height: 400px;
}
.my {
  &_btn {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    width: 275px;
    height: 50px;
    box-sizing: border-box;
    background-color: white;
    .icon_btn {
      position: absolute;
      left: 80px;
      width: 35px;
      height: 40px;
      padding: 3px;
    }
  }
  &_md {
    display: flex;
    .mdCon {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-left: 275px;
      width: 100%;
      height: 100vh;
      font-size: 40px;
      font-weight: bold;
      color: rgb(246, 246, 244);
      background-color: rgba($color: #98eee7, $alpha: 0.4);
    }
    .mdNav {
      position: absolute;
      top: 0;
      left: 0;
      height: 100vh;
      overflow: auto;
      width: 275px;
      background-color: #6e8187;
      box-sizing: border-box;
      padding: 50px 10px 0;
      .item {
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        font-weight: bold;
        color: #ffffff;
        font-size: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:hover {
          text-decoration: underline;
        }
      }
    }
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
