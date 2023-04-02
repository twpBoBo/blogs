<!-- ? 模块 -->
<template>
  <div class="MucPlay">
    <audio
      class="audio"
      :src="url"
      autoplay
      ref="audio"
      @play="play"
      @pause="pause"
      @timeupdate="timeupdate"
      @ended="ended"
      @error="error"
      @loadedmetadata="loadedmetadata"
    ></audio>
    <div class="MucPlay_console">
      <div class="Lyric" @click="showLyricBtn">词</div>
      <!-- 歌曲信息 -->
      <div class="songinfo flex aic">
        <p class="songName">{{ songName }}</p>
        <p class="ml-10 singerName">--{{ singerName }}</p>
      </div>
      <!-- 播放按钮 -->
      <div
        @click="play_btn"
        class="iconfont play_btn"
        :class="playState ? 'icon-zanting' : 'icon-bofang'"
      ></div>
      <!-- 进度条 -->
      <div
        class="progress_barWarp"
        ref="proBar"
        @mousedown.stop="proBarChang($event)"
      >
        <div class="progress_bar" ref="proBarChild"></div>
      </div>
      <!-- 时间 -->
      <div class="songTime flex aic">
        <div class="now_time mr-5">{{ nowlTime }}</div>
        /
        <div class="total_time ml-5">
          {{ transTime(totalTime) }}
        </div>
      </div>
      <!-- 音量 -->
      <!-- 播放倍数 -->
    </div>
    <ul class="MucPlay_Lyric" v-show="showLyric">
      <li
        class="item"
        v-for="(item, index) in Lyricshow"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import useMusic from '@/stores/music';
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
// 设置播放地址（通过pinia获取）
const { url, songName, singerName, Lyric } = storeToRefs(useMusic());
console.log(Lyric.value);
// 歌词处理
const Lyricshow = computed(() => {
  return Lyric.value
    .replace(/(\d{2}:|.\d{3}|\d{2}|\.)/g, '')
    .split('[]');
});

// 获取音乐组件的实例
const audio = ref(null);
// 获取拖拽进度条的实例
const proBar = ref(null);
const proBarChild = ref(null);
// 基本的一些状态
const playState = ref(true);
const totalTime = ref('');
const nowlTime = ref('');
const showLyric = ref(false);
// 播放按钮
const play_btn = () => {
  if (playState.value) {
    audio.value.pause();
    playState.value = false;
  } else {
    audio.value.play();
    playState.value = true;
  }
};
// 拖拽进度条
const proBarChang = (e) => {
  // 操作进度条时停止播放
  audio.value.pause();
  let offsetX = e.offsetX;
  // 更新进度条
  let value = (offsetX / 800) * 100;
  changProBar(value);
  // 更新当前时间
  audio.value.currentTime = (value * totalTime.value) / 100;
  //  鼠标移动
  document.onmousemove = function (e) {
    let offsetX = e.offsetX;
    // 超出盒子也移除鼠标事件
    if (offsetX >= 800) {
      console.log('你大爷');
      offsetX = 800;
      this.onmousemove = null;
      this.onmouseup = null;
    }
    if (offsetX <= 0) {
      console.log('你大爷');
      offsetX = 0;
      this.onmousemove = null;
      this.onmouseup = null;
    }
    // 更新子进度条的样式
    let value = (offsetX / 800) * 100;
    changProBar(value);
    // 更新当前时间
    audio.value.currentTime = (value * totalTime.value) / 100;
  };
  // 鼠标抬起
  document.onmouseup = function () {
    // 抬起鼠标再播放
    audio.value.play();
    playState.value = true;
    // 清空鼠标事件
    this.onmousemove = null;
    this.onmouseup = null;
    if (typeof proBar.value.releaseCapture != 'undefined') {
      //修复低版本ie bug
      proBar.value.releaseCapture();
    }
  };
};
// 歌词
function showLyricBtn() {
  showLyric.value = !showLyric.value;
}

// 工具函数
// 时间格式化
function transTime(cuntime) {
  let minut = parseInt(cuntime / 60);
  let mid = ':';
  let sec = parseInt(cuntime % 60) + '';
  if (minut == 0) {
    minut = '00';
  } else if (minut < 10) {
    minut = '0' + minut;
  }
  if (sec.length == 1) {
    sec = '0' + sec;
  }
  let time = minut + mid + sec;
  return time;
}
// 操作进度条样式
function changProBar(value) {
  proBarChild.value.style.width = value + '%';
  // console.log((value * totalTime.value) / 100);
}
// 下面为类似音乐组件的生命周期把
// 视频初始化（视频url加载完成获取总时长......）
function loadedmetadata() {
  console.log('我加载好了');
  // console.log(audio.value.autoplay());
  // 获取总时长
  totalTime.value = audio.value.duration;
}
// 视频播放
function play(e) {
  playState.value = true;
  console.log(e);
  console.log('我在播放');
}
// 视频暂停
function pause() {
  console.log('我暂停了');
}
// 视频播放结束
function ended() {
  console.log('我结束了');
}
// 视频播放出错
function error() {
  console.log('我出错了');
}
// 视频时间更新
function timeupdate() {
  nowlTime.value = transTime(audio.value.currentTime);
  // console.log(audio.value.currentTime);
  // 去更新进度条样式
  let value = (audio.value.currentTime / totalTime.value) * 100;
  changProBar(value);
}
</script>
<style lang="scss" scoped>
.MucPlay {
  &_Lyric {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    width: 1200px;
    height: 700px;
    background-color: rgba(43, 169, 169, 0.8);
    margin: 0 auto;
    color: white;
    font-size: 25px;
    padding: 30px 30px 15px;
    line-height: 200%;
    overflow-y: auto;
  }
  &_console {
    background-color: rgb(48, 102, 102);
    -webkit-user-select: none; /*谷歌 /Chrome*/
    user-select: none;
    min-width: 100%;
    height: 50px;
    box-sizing: border-box;
    display: flex;
    position: absolute;
    width: 100%;
    align-items: center;
    justify-content: end;
    bottom: 0;
    left: 0;
    .Lyric {
      color: rgb(150, 239, 15);
      margin-right: 100px;
    }
    .songinfo {
      margin-right: 50px;
      .songName {
        color: rgb(150, 239, 15);
      }
      .singerName {
        color: rgb(135, 174, 76);
      }
    }
    .play_btn {
      font-size: 30px;
      color: rgb(135, 174, 76);
      margin-right: 50px;
      cursor: pointer;
    }
    .songTime {
      margin-right: 50px;
      color: #f1eaea;
    }
    .progress_barWarp {
      margin-right: 50px;

      width: 800px;
      height: 20px;
      background-color: rgba($color: #ffffff, $alpha: 0.4);
      position: relative;
      .progress_bar {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 0;
        background-color: pink;
        transition: all 0.1s linear;
      }
    }
  }
}
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
