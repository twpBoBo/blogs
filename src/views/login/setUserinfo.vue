<!-- ? 模块 -->
<template>
  <div class="userinfo">
    <div class="userinfo_setName">
      <input type="text" placeholder="输入你的名称" v-model="name" />
    </div>
    <div class="userinfo_setHead">
      <el-upload
        class="avatar-uploader"
        action="http://127.0.0.1:8999/head"
        data="test"
        method="get"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="imageUrl" src="@/assets/img/1.jpg" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </div>
    <div class="userinfo_sumbi">提交</div>
    <div class="userinfo_colos" @click="ShowSet">关闭</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const name = ref('');
const imageUrl = ref('true');
const emit = defineEmits(['ShowSet']);
const ShowSet = () => {
  emit('ShowSet', false);
};
const handleAvatarSuccess = (res) => {
  console.log(res);
};
</script>

<style lang="scss" scoped>
.userinfo {
  color: #fdf81f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  &_setName {
    width: 100%;
    display: flex;
    height: 50px;
    justify-content: center;
    input {
      outline: noen;
      border: none;
      border-bottom: 1px solid #fdf81f;
      color: #fdf81f;
      &::placeholder {
        color: #fdf81f;
        text-align: center;
      }
    }
  }
  &_colos {
    position: absolute;
    right: 5px;
    top: 5px;
    color: #fd351f;
    cursor: pointer;
  }
  &_setHead {
    .avatar-uploader .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .avatar-uploader .el-upload {
      border: 1px solid red;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .avatar-uploader .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
      background-color: #fd351f;
    }
  }
}
</style>
