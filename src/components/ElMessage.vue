<!-- ? 模块 -->
<template>
  <div
    class="ElMessage"
    :style="{
      color: msgStore.type
    }"
  >
    {{ msgStore.msg }}
  </div>
</template>
<script setup>
// import { ref } from 'vue';
import useMessage from '@/stores/Message';
const msgStore = useMessage();
</script>

<style lang="scss" scoped>
.ElMessage {
  position: absolute;
  left: 50%;
  padding: 0 30px;
  height: 50px;
  line-height: 50px;
  top: 20px;
  z-index: 999999999;
  background-color: white;
  border-top-right-radius: 20%;
  border-top-left-radius: 30%;
  border-bottom-right-radius: 40%;
  border-bottom-left-radius: 90%;
}
</style>
