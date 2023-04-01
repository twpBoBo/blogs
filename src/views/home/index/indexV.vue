<!-- ? 模块 -->
<template>
  <div class="index">
    <ul class="index_list">
      <li
        class="index_list_item"
        v-for="(item, index) in infoNav"
        :key="item.tit"
        @mouseenter="ShowFloat(index)"
        @mouseleave="OutFloat"
        :style="{ backgroundImage: `url(${item.img})` }"
      >
        <div class="floating" v-show="index == floatIndex">
          <div class="floating_interiors">
            {{ item.value }}
          </div>
        </div>
      </li>
    </ul>
    <div class="index_bar">
      <ul class="index_bar_list">
        <router-link to="/home/music">
          <li class="index_bar_list_item">
            <img src="@/assets/img/music.jpg" alt="" />
          </li>
        </router-link>
        <router-link to="/home/resumes">
          <li class="index_bar_list_item">
            <img src="@/assets/img/resumes.jpg" alt="" />
          </li>
        </router-link>
        <router-link to="/home/my">
          <li class="index_bar_list_item">
            <img src="@/assets/img/fengxiang.png" alt="" />
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const floatIndex = ref(null);
const ShowFloat = (index) => {
  console.log(index);
  floatIndex.value = index;
};
const OutFloat = () => {
  floatIndex.value = null;
};
const infoNav = [
  {
    tit: 'QQ',
    value: '2079972876',
    img: './src/assets/img/qq.jpg'
  },
  {
    tit: '微信',
    value: '2079972876',
    img: './src/assets/img/weixin.jpg'
  },
  {
    tit: 'GitHub',
    value: 'https://animate.style/',
    img: './src/assets/img/githbu.jpeg'
  }
];
</script>
<style lang="scss" scoped>
.index {
  min-height: 100vh;
  overflow: hidden;
  background: url('@/assets/img/bg_1.png') no-repeat;
  background-size: 100% 100%;
  background-position: 100% 100%;
  &_list {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 200px;
    display: flex;
    align-items: center;
    &_item {
      position: relative;
      margin: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: black;
      box-shadow: 10px 10px 10px rgb(102, 95, 95);
      color: white;
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center;
      .floating {
        width: 180px;
        height: 100px;
        position: absolute;
        top: -75px;
        transform: rotateZ(-15deg);
        &_interiors {
          position: absolute;
          left: 30px;
          padding: 0 25px;
          height: 50px;
          background-color: aqua;
          z-index: 999;
          line-height: 50px;
          text-align: center;
          border-top-left-radius: 50%;
          border-bottom-right-radius: 50%;
        }
      }
    }
  }
  &_bar {
    width: 60%;
    height: 100px;
    position: absolute;
    left: 50%;
    bottom: 30px;
    transform: translateX(-50%);
    border-radius: 30px;
    border: 1px solid #ccc;
    background: linear-gradient(
      120deg,
      rgba(167, 154, 154, 0.5),
      rgba(116, 91, 91, 0.5)
    );
    // opacity: 0.5;
    &_list {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;

      &_item {
        width: 80px;
        border-radius: 10px;
        height: 80px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
