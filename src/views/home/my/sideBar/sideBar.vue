<!-- ? 模块 -->
<template>
  <div class="sideB">
    <ul class="sideB_list">
      <li
        class="item"
        v-for="(item, index) in NavList"
        :key="index"
        @click="$emit('changType', index)"
      >
        {{ item.tit }}
        <svg class="icon icon_btn ml-10">
          <use :xlink:href="item.log"></use>
        </svg>
      </li>
    </ul>
  </div>
</template>
<script setup>
let NavList = [
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
</script>
<style lang="scss" scoped>
.icon {
  width: 19px;
  height: 19px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.sideB {
  width: 1300px;
  height: 80px;
  background-color: rgb(0, 0, 0);
  position: fixed;
  margin-left: 281px;
  top: 0;
  z-index: 99999;
  &__Box {
    margin: 0 auto;
  }
  &_list {
    display: flex;
    align-items: center;
    height: 100%;
    .item {
      cursor: pointer;
      padding: 20px;
      background-color: rgb(240, 238, 238);
      display: flex;
      margin: 0 10px;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: rgb(55, 45, 45);
    }
  }
}
</style>
