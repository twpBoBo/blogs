<!-- ? 模块 -->
<template>
  <div class="register_submi">
    <div class="register_submi_tit">
      {{ tit }}
    </div>
    <div class="register_submi_subm">
      <div class="item">
        <p>账号</p>
        <input type="text" v-model.trim="account" />
      </div>
      <div class="item">
        <p>密码</p>
        <input type="password" v-model.trim="pawd" />
      </div>
      <div class="inform">
        <input type="checkbox" name="infor" v-model="isChek" />
        <p class="mi ml-5" @click="$emit('sonClick', true)">
          隐私政策
        </p>
      </div>
      <div class="btn" @click="register">
        <p>注册</p>
      </div>
    </div>
  </div>
  <!-- // 等着 -->
  <!-- <transition
    enter-active-class="animate__animated animate__lightSpeedInRight"
    leave-active-class="animate__animated animate__lightSpeedOutRight"
  >
    <div class="setinfo" v-if="isShowSet">
      <set-userinfo @ShowSet="ShowSet"></set-userinfo>
    </div>
  </transition> -->
</template>
<script setup>
import { defineProps, onUnmounted, ref } from 'vue';
import { registerAPI } from '@/service/api';
import useMessage from '@/stores/Message';
import { debounce } from '@/utils/tool';
// 等着
// import setUserinfo from './setUserinfo.vue';
// 在你的 setup 方法中
defineProps({
  tit: {
    type: String,
    default: ''
  },
  box: {
    type: Object
  }
});
const isChek = ref(false);
let account = ref('');
let pawd = ref('');
// 设置信息 等着
// const isShowSet = ref(false);
// const ShowSet = (value) => {
//   isShowSet.value = value;
// };
let emit = defineEmits(['setBoxR']);
const msgStore = useMessage();
let time = ref('');
onUnmounted(() => {
  clearTimeout(time);
});
const register = debounce(
  () => {
    let reg = /^[a-zA-Z]/;
    let isPawd = reg.test(pawd.value);
    if (account.value == '' || pawd.value == '') {
      msgStore.setMsgstate({
        msg: '账号或密码不能为空',
        type: 'red',
        isShow: true
      });
    } else if (account.value.length <= 5) {
      // eslint-disable-next-line no-undef

      msgStore.setMsgstate({
        msg: '账号长度必须大于5',
        type: 'red',
        isShow: true
      });
    } else if (!isPawd) {
      msgStore.setMsgstate({
        msg: '密码必须已字母开头',
        type: 'red',
        isShow: true
      });
    } else if (!isChek.value) {
      msgStore.setMsgstate({
        msg: '请勾选',
        type: '#ffb417',
        isShow: true
      });
    } else {
      registerAPI({ zhanghao: account, paswd: pawd }).then((res) => {
        console.log(res);
        // 成功跳转登录
        if (res.status == 0) {
          time.value = setTimeout(() => {
            emit('setBoxR');
            account.value = '';
            pawd.value = '';
          }, 1000);
        }
        msgStore.setMsgstate({
          msg: res.msg,
          type: res.type,
          isShow: true
        });
      });
    }
  },
  1000,
  true
);
</script>
<style lang="scss" scoped>
.register_submi {
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
    .inform {
      width: 100%;
      display: flex;
      width: 330px;
      align-items: center;
      margin-top: 10px;
      margin-left: 90px;
      .mi {
        text-decoration: underline;
        cursor: pointer;
      }
    }
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
        color: green;
        padding: 0 10px;
      }
    }
    .btn {
      font-size: 30px;
      font-weight: bold;
      letter-spacing: 4px;
      margin-top: 10px;
    }
  }
}
.setinfo {
  width: 800px;
  height: 700px;
  background-color: rgba($color: #000000, $alpha: 0.7);
  position: absolute;
  top: -100px;
  left: -150px;
  z-index: 99999999;
  transform: translateZ(30px);
}
</style>
