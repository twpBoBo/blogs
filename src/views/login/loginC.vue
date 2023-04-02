<!-- ? 模块 -->
<template>
  <div class="login_submi">
    <div class="login_submi_tit">
      {{ tit }}
    </div>
    <div class="login_submi_subm">
      <div class="item">
        <p>账号</p>
        <input type="text" v-model="account" />
      </div>
      <div class="item">
        <p>密码</p>
        <input type="password" v-model="pawd" />
      </div>
      <div class="btn">
        <p @click="Login">登录</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onUnmounted, ref } from 'vue';
import { debounce } from '@/utils/tool';
import { loginAPI } from '@/service/api';
import router from '@/router';
import useMessage from '@/stores/Message';
import useUser from '@/stores/user';
const msgStore = useMessage();
const userStore = useUser();
let account = ref('');
let pawd = ref('');
const time = ref('');
onUnmounted(() => {
  clearTimeout(time);
});
defineProps({
  tit: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  }
});
const Login = debounce(
  () => {
    // eslint-disable-next-line no-undef
    if (account.value == '' || pawd.value == '') {
      msgStore.setMsgstate({
        msg: '账号或密码不能为空',
        type: 'red',
        isShow: true
      });
    } else {
      loginAPI({ account: account.value, password: pawd.value }).then(
        (res) => {
          if (res.status === 0) {
            console.log(res.status);
            console.log(res);
            localStorage.setItem('token', res.token);
            userStore.token = res.token;
            time.value = setTimeout(() => {
              router.push({ path: '/home' });
            }, 500);
          }
          msgStore.setMsgstate({
            msg: res.msg,
            type: res.type,
            isShow: true
          });
        }
      );
    }
  },
  1000,
  true
);
</script>

<style lang="scss" scoped>
.login_submi {
  width: 500px;
  height: 500px;
  &_tit {
    width: 100%;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    margin-top: 20px;
  }
  &_subm {
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      width: 330px;
      margin-top: 30px;
      input {
        outline: noen;
        height: 100%;
        width: 80%;
        border: 1px solid white;
        margin-left: 10px;
        border-radius: 20px;
        color: white;
        padding: 0 10px;
      }
    }
    .btn {
      font-size: 30px;
      font-weight: bold;
      letter-spacing: 4px;
    }
  }
}
</style>
