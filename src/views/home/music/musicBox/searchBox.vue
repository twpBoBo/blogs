<!-- ? 模块 -->
<template>
  <div class="musicBox_seach">
    <input
      type="text"
      v-model="keyword"
      placeholder="输入你想填的歌"
      @keyup.enter="search"
    />
    <div class="button ml-5" @click="search">搜索</div>
  </div>
  <div class="seach_listWrap" v-show="showLlist">
    <div
      class="back iconfont icon-xiangzuo"
      @click="showListBtn"
    ></div>
    <ul class="seach_list">
      <li class="item" v-for="item in songLlist" :key="item.id">
        <p class="songname">
          {{ item.name }}
        </p>
        <p class="singer mt-5">{{ item.artists[0].name }}</p>
        <p class="play" @click="play(item)">播放</p>
        <p class="time">{{ songTimeChang(item.duration) }}</p>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { searchAPI, songUrlAPI, songLyricAPI } from '@/service/api';
import { songTimeChang } from '@/utils/tool';
import useMusic from '@/stores/music';
const musicStore = useMusic();
// 搜索
const keyword = ref('');
const songLlist = ref([]);
const showLlist = ref(false);
const search = () => {
  console.log(keyword.value);
  searchAPI({ keywords: keyword.value }).then((res) => {
    songLlist.value = res.result.songs;
    showLlist.value = true;
    console.log(res);
  });
};
// 搜索框的显示
function showListBtn() {
  showLlist.value = false;
}
// 播放音乐
const play = (item) => {
  songUrlAPI({ id: item.id }).then((res) => {
    // console.log(res.data[0].url);
    musicStore.url = res.data[0].url;
    musicStore.songName = item.name;
    musicStore.singerName = item.artists[0].name;
    musicStore.isShow = true;
  });
  songLyricAPI({ id: item.id }).then((res) => {
    musicStore.Lyric = res.data.lrc.lyric;
  });
};
</script>
<style lang="scss" scoped>
.musicBox_seach {
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    outline: none;
    width: 500px;
    height: 40px;
    border: 1px solid white;
    padding: 0 20px;
    box-sizing: border-box;
    border-radius: 30px;
    color: white;

    &::placeholder {
      color: rgb(191, 178, 178);
    }
  }
  .button {
    cursor: pointer;
    color: rgb(19, 15, 15);
    padding: 10px;
    border-radius: 30%;
    background-color: yellow;
    text-align: center;
    font-weight: bold;
    letter-spacing: 5px;
  }
}
.seach_listWrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90%;
  .back {
    position: sticky;
    top: 0px;
    font-size: 40px;
    padding-left: 10px;
    color: rgb(0, 0, 0);
    z-index: 9999999999999;
    background-color: rgb(241, 246, 246);
  }
  .seach_list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow: auto;
    padding: 10px 0 20px;
    height: 100%;
    background-color: rgb(241, 246, 246);

    .item {
      width: 200px;
      height: 150px;
      border-radius: 30px;
      margin-bottom: 25px;
      margin-left: 20px;
      padding: 20px;
      -webkit-user-select: none; /*谷歌 /Chrome*/
      user-select: none;
      background-size: 100% 100%;
      box-sizing: border-box;
      color: white;
      background: rgba($color: #000000, $alpha: 0.5);
      position: relative;

      .time {
        position: absolute;
        right: 20px;
        bottom: 10px;
        color: #f8f8f8;
      }
      .play {
        position: absolute;
        left: 20px;
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
