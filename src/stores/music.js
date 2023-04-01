//定义关于counter的store
import { defineStore } from 'pinia';
const useMusic = defineStore('music', {
  state: () => ({
    isShow: false,
    url: '',
    songName: '',
    singerName: '',
    Lyric: ''
  }),
  getters: {},
  actions: {}
});

//暴露这个useMessage模块
export default useMusic;
