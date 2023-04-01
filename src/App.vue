<script setup>
import { RouterView } from 'vue-router';
import ElMessage from './components/ElMessage.vue';
import lodingC from './components/lodingC.vue';
import useMessage from '@/stores/Message';
import router from './router';
import { ref } from 'vue';
const msgStore = useMessage();
const showHome = ref(true);

router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    if (localStorage.getItem('token')) {
      next();
    } else {
      msgStore.setMsgstate({
        msg: '请登录',
        type: '#ffb417',
        isShow: true
      });
      return;
    }
  } else {
    next();
  }
});
router.afterEach((to) => {
  // console.log(to.name);
  let routes = ['mDown', 'resumes'];
  let flge = routes.includes(to.name);
  console.log(flge);
  if (flge) {
    showHome.value = false;
  } else {
    showHome.value = true;
  }
});
</script>
<template>
  <div>
    <transition
      enter-active-class="animate__animated animate__backInDown"
      leave-active-class="animate__animated animate__backOutUp"
    >
      <ElMessage v-if="msgStore.isShow"></ElMessage>
    </transition>
    <router-link to="/home" v-if="showHome">
      <div
        class="home_btn animate__animated animate__pulse animate__infinite"
      ></div>
    </router-link>
    <RouterView />
    <loding-c v-if="msgStore.isShowLoding"></loding-c>
  </div>
</template>
<style scoped>
.home_btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: url('@/assets/img/1.jpg') no-repeat;
  background-size: 100%;
  position: fixed;
  left: 10px;
  z-index: 99999999;
}
</style>
