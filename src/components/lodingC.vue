<!-- ? 模块 -->
<template>
  <div class="loding">
    <h2>加载中.......</h2>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.loding {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: inherit;
  background: rgba($color: #f9eded, $alpha: 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
