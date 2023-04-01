<!-- ? 模块 -->
<template>
  <div class="musicBox">
    <search-box></search-box>
    <ul class="musicBox_musicList">
      <li
        class="item"
        v-for="item in songLlist"
        :key="item.id"
        :style="{ backgroundImage: `url(${item.al.picUrl})` }"
      >
        <div class="msk">
          <p class="songname">
            {{ item.name }}
          </p>
          <p class="singer mt-5">{{ item.ar[0].name }}</p>
          <p class="play" @click="play(item)">播放</p>
          <p class="time">{{ songTimeChang(item.dt) }}</p>
        </div>
      </li>
    </ul>
    <ul class="musicBox_pages">
      <li class="item" @click="pre">
        <i class="iconfont icon-xiangzuo f26"></i>
      </li>
      <li class="item" @click="next">
        <i class="iconfont icon-xiangyou f26"></i>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { songAPI, songUrlAPI, songLyricAPI } from '@/service/api';
import searchBox from './searchBox.vue';
import { songTimeChang } from '@/utils/tool';
import useMessage from '@/stores/Message';
import useMusic from '@/stores/music';
import { ref } from 'vue';
const msgStore = useMessage();
// 加载
msgStore.isShowLoding = true;
// 渲染数据
let songLlist = ref([]);
const musicStore = useMusic();
// 分页数据
const pages = ref(1);
let totol = '';
let limit = 21;
// 请求 初始化
function getSong(page = { page: 1 }) {
  songAPI({ page })
    .then((res) => {
      songLlist.value = res.data;
      totol = res.totlo;
      msgStore.isShowLoding = false;
    })
    .catch((err) => {
      console.log(1);
      console.log(err);
      msgStore.isShowLoding = false;
      msgStore.setMsgstate({
        msg: '服务器出错了',
        type: '#ffb417',
        isShow: true
      });
    });
}
getSong();

// 分页
const next = () => {
  msgStore.isShowLoding = true;
  pages.value++;
  if (pages.value > Math.ceil(totol / limit)) {
    pages.value = Math.ceil(totol / limit);
    msgStore.isShowLoding = false;
    return;
  } else {
    getSong({ page: pages.value });
  }
};
const pre = () => {
  msgStore.isShowLoding = true;
  pages.value--;
  if (pages.value < 1) {
    msgStore.isShowLoding = false;
    pages.value = 1;
    return;
  } else {
    getSong({ page: pages.value });
  }
};
// 播放音乐
const play = (item) => {
  songUrlAPI({ id: item.id }).then((res) => {
    console.log(res.data[0].url);
    console.log(musicStore.url);
    musicStore.url = res.data[0].url;
    musicStore.songName = item.name;
    musicStore.singerName = item.ar[0].name;
    musicStore.isShow = true;
  });
  songLyricAPI({ id: item.id }).then((res) => {
    musicStore.Lyric = res.data.lrc.lyric;
  });
};
</script>
<style lang="scss" scoped>
.musicBox {
  width: 1200px;
  height: 700px;
  margin: 30px auto 0;
  background-color: rgba($color: #fbeeee, $alpha: 0.2);
  position: relative;
  padding: 30px 30px 10px;
  &_musicList {
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 150px;
      height: 150px;
      border-radius: 30px;
      margin-bottom: 35px;
      margin-left: 20px;
      padding: 10px;
      -webkit-user-select: none; /*谷歌 /Chrome*/
      user-select: none;
      background-size: 100% 100%;
      box-sizing: border-box;
      &:hover .msk {
        display: block;
      }
      .msk {
        width: 150px;
        height: 150px;
        border-radius: 30px;
        margin-bottom: 25px;
        margin-left: 20px;
        padding: 10px;
        -webkit-user-select: none; /*谷歌 /Chrome*/
        user-select: none;
        background-size: 100% 100%;
        box-sizing: border-box;
        display: none;
        color: white;
        background: rgba($color: #000000, $alpha: 0.5);
        position: relative;
        .time {
          position: absolute;
          right: 10px;
          bottom: 10px;
          color: #8a6666;
        }
        .play {
          position: absolute;
          left: 10px;
          bottom: 10px;
        }
        .songname,
        .singer {
          color: yellow;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .singer {
          color: #fbeeee;
        }
        .play {
          cursor: pointer;
          color: rgb(118, 213, 23);
        }
      }
    }
  }
  &_pages {
    display: flex;
    justify-content: space-between;
    .item {
      cursor: pointer;
      color: greenyellow;
    }
  }
}
</style>
