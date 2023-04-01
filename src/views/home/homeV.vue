<!-- ? 模块 -->
<template>
  <div class="home">
    <router-link to="/login">
      <div class="home_login" v-if="!userStore.token">登录</div>
    </router-link>
    <router-view v-slot="{ Component }">
      <transition
        enter-active-class="animate__animated animate__lightSpeedInRight"
        leave-active-class="animate__animated animate__lightSpeedOutRight"
      >
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script setup>
import useUser from '@/stores/user';
const userStore = useUser();
</script>
<style lang="scss" scoped>
.home {
  min-width: 1200px;
  position: relative;
  &_login {
    position: absolute;
    width: 100px;
    height: 50px;
    right: 30px;
    top: 10px;
    z-index: 9999999;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
    color: white;
    border: 1px solid skyblue;
    cursor: pointer;
  }
}
</style>
