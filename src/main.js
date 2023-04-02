import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
// 样式重置
// import 'normalize.css';
import '@/assets/css/reset.css';
// 全局样式
import '@/assets/font/iconfont.css';
import '@/assets/font/iconfont';
import '@/assets/css/public.css';

// 动画库
import 'animate.css';
// 模拟数据
import '@/mock/index.js';
// md
// 预览组件以及样式
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// VuePress主题以及样式（这里也可以选择github主题）
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// Prism
import Prism from 'prismjs';
// 代码高亮
// 选择使用主题
VMdPreview.use(vuepressTheme, {
  Prism
});
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(VMdPreview);
app.mount('#app');
