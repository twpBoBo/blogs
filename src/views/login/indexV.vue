<!-- ? 模块 -->
<template>
  <div>
    <div class="login">
      <div id="con" @mousedown="loginBox($event)" ref="box">
        <div class="login">
          <login-c tit="账号密码登录"></login-c>
        </div>
        <div class="login2"></div>
        <div class="register">
          <register-c
            tit="账号密码注册"
            @setBoxR="setBoxR"
            @sonClick="sonClick"
          ></register-c>
        </div>
        <div class="register2"></div>

        <div class="login3"></div>
        <div class="login4"></div>
      </div>
    </div>
    <transition
      enter-active-class="animate__animated animate__backInDown"
      leave-active-class="animate__animated animate__backOutUp"
    >
      <div class="informText" v-if="isShowinform">
        本注册不会向你获取如何个人信息，注册后你可以的看到我的秘密哦
        <div class="close" @click="isShowinform = false">关闭</div>
      </div>
    </transition>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import loginC from './loginC.vue';
import registerC from './registerC.vue';
const box = ref(null);
const isShowinform = ref(false);
let moveXdefault = 0;
const sonClick = (value) => {
  isShowinform.value = value;
};
// 注册跳转过来重置我们转动的角度
const setBoxR = () => {
  box.value.style.transform = 'rotateY(0deg) translateZ(250px)';
  moveXdefault = 0;
};
const loginBox = (e) => {
  box.value.style.animation = 'none';
  var diffx = e.clientX / 2;
  if (typeof box.value.setCapture !== 'undefined') {
    box.value.setCapture();
  }
  //  鼠标移动
  document.onmousemove = function (e) {
    let moveX = (e.clientX / 2 - diffx) * 1 + moveXdefault;
    box.value.style.transform = 'rotateY(' + moveX + 'deg)';
    // 鼠标抬起
    document.onmouseup = function () {
      this.onmousemove = null;
      this.onmouseup = null;
      moveXdefault = moveX;
      // console.log('保存的值' + moveXdefault);
      if (typeof box.value.releaseCapture != 'undefined') {
        //修复低版本ie bug
        box.value.releaseCapture();
      }
    };
  };
  document.onmouseup = function () {
    this.onmousemove = null;
    this.onmouseup = null;
    if (typeof box.value.releaseCapture != 'undefined') {
      //修复低版本ie bug
      box.value.releaseCapture();
    }
  };
};
</script>
<style lang="scss" scoped>
.informText {
  position: absolute;
  width: 350px;
  height: 350px;
  padding: 30px;
  border-radius: 50%;
  background-color: rgba($color: #f6f4e6, $alpha: 0.1);
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  .close {
    position: absolute;
    top: 60px;
    right: 60px;
    color: red;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
.login {
  height: 100vh;
  -webkit-user-select: none; /*谷歌 /Chrome*/
  user-select: none;
  position: relative;
  background: url('@/assets/img/bg4.jpg') no-repeat;
  background-size: 100% 100%;
  #con {
    width: 500px;
    height: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -250px;
    margin-top: -250px;
    animation: move 20s linear infinite;
    transform-style: preserve-3d;
    // transition: all 0.1s linear;
  }
  /* 动画 */
  @keyframes move {
    from {
      transform: rotateX(0deg) rotateY(0deg);
    }
    to {
      transform: rotateX(360deg) rotateY(360deg);
    }
  }
  #con div {
    position: absolute;
  }
  .login {
    transform: rotateY(0deg) translateZ(250px);
    background: url('@/assets/img/loginbox1.jpg') no-repeat;
    background-size: 100% 100%;
    width: 500px;
    height: 500px;
    color: white;
  }
  .login2 {
    width: 500px;
    height: 500px;
    transform: rotateY(180deg) translateZ(250px);
    background: url('@/assets/img/loginbox1.jpg') no-repeat;
    background-size: 100% 100%;
    color: white;
  }
  .register2 {
    transform: rotateY(-90deg) translateZ(250px);
    background: url('@/assets/img/loginbox3.jpg') no-repeat;
    width: 500px;
    height: 500px;
    background-size: 100% 100%;
    color: white;
  }
  .register {
    transform: rotateY(90deg) translateZ(250px);
    width: 500px;
    height: 500px;
    background: url('@/assets/img/loginbox3.jpg') no-repeat;
    background-size: 100% 100%;
    color: skyblue;
  }
  .login3 {
    transform: rotateX(90deg) translateZ(250px);
    width: 500px;
    height: 500px;
    background: url('@/assets/img/loginbox3.jpg') no-repeat;
    background-size: 100% 100%;
  }
  .login4 {
    transform: rotateX(-90deg) translateZ(250px);
    width: 500px;
    height: 500px;
    background: url('@/assets/img/loginbox2.jpg') no-repeat;
    background-size: 100% 100%;
  }
}
</style>
