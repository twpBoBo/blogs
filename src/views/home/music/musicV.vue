<!-- ? 模块 -->
<template>
  <div class="music">
    <transition
      enter-active-class="animate__animated animate__lightSpeedInRight"
      leave-active-class="animate__animated animate__lightSpeedOutRight"
    >
      <!-- <component v-show="isShowBox" :is="isShowBox ? musicBox : ''"></component> -->
      <music-box v-show="isShowBox"></music-box>
    </transition>
    <transition
      enter-active-class="animate__animated animate__lightSpeedInRight"
      leave-active-class="animate__animated animate__lightSpeedOutRight"
    >
      <mv-boxs v-show="isShowBoxMV"></mv-boxs>
    </transition>
    <div class="music_btn" @click="isShowBoxBtn">
      {{ isShowBox ? 'unMUSIC' : 'MUSIC' }}
    </div>
    <div class="music_btnMV" @click="isShowBoxMVBtn">
      {{ isShowBoxMV ? 'unMV' : 'MV' }}
    </div>
    <div class="mucpalybox" v-if="musicStore.isShow">
      <muc-play-box></muc-play-box>
    </div>
  </div>
</template>
<script setup>
import { onUnmounted, ref } from 'vue';
import musicBox from './musicBox/musicBox.vue';
import mvBoxs from './mvBoxs/mvBox.vue';
import { debounce } from '@/utils/tool';
// pinia管理音乐播放盒子
import MucPlayBox from '@/components/music/MucPlay.vue';
import useMusic from '@/stores/music';
const musicStore = useMusic();
// 切换音乐和MV盒子的显示和隐藏
const isShowBox = ref(false);
const isShowBoxMV = ref(false);
const isShowBoxBtn = debounce(
  () => {
    if (isShowBoxMV.value) {
      return;
    }
    isShowBox.value = !isShowBox.value;
  },
  500,
  true
);
const isShowBoxMVBtn = debounce(
  () => {
    if (isShowBox.value) {
      return;
    }
    isShowBoxMV.value = !isShowBoxMV.value;
  },
  500,
  true
);
onUnmounted(() => {
  musicStore.isShow = false;
});
</script>

<style lang="scss" scoped>
.music {
  height: 100%;
  height: 100vh;
  overflow: hidden;
  background: url('@/assets/img/bg_music.jpg') no-repeat;
  background-size: 100% 100%;
  background-position: 100% 100%;
  position: relative;
  &_btn {
    position: fixed;
    top: 0;
    left: 10px;
    top: 100px;
    width: 80px;
    height: 80px;
    border: 1px solid;
    border-radius: 50%;
    text-align: center;
    line-height: 80px;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
  &_btnMV {
    position: fixed;
    top: 0;
    left: 10px;
    top: 200px;
    width: 80px;
    height: 80px;
    border: 1px solid;
    border-radius: 50%;
    text-align: center;
    line-height: 80px;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
