//定义关于counter的store
import { defineStore } from 'pinia';

/*defineStore 是需要传参数的，其中第一个参数是id，就是一个唯一的值，
简单点说就可以理解成是一个命名空间.
第二个参数就是一个对象，里面有三个模块需要处理，第一个是 state，
第二个是 getters，第三个是 actions。
*/
const useMessage = defineStore('msg', {
  state: () => ({
    msg: '',
    type: '',
    isShow: false,
    isShowLoding: false
  }),
  getters: {},
  actions: {
    setMsgstate(opint) {
      this.msg = opint.msg;
      this.type = opint.type;
      this.isShow = opint.isShow;
      setTimeout(() => {
        this.$reset();
      }, 3000);
    }
  }
});

//暴露这个useMessage模块
export default useMessage;
