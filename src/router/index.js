import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/home/homeV.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'index',
          meta: { tit: '首页' },

          component: () => import('@/views/home/index/indexV.vue')
        },
        {
          meta: { tit: '音乐' },
          path: 'music',
          name: 'music',
          component: () => import('@/views/home/music/musicV.vue')
        },
        {
          path: 'my',
          name: 'my',
          meta: { tit: '我的笔记', isAuth: true },
          component: () => import('@/views/home/my/myV.vue')
        },
        {
          path: 'mDown/:tit',
          name: 'mDown',
          meta: { tit: '文章' },
          component: () => import('@/components/mDown.vue')
        },
        {
          path: 'resumes',
          name: 'resumes',
          meta: { tit: '文章' },
          component: () => import('@/views/home/resumes/resumesV.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: { tit: '登录' },
      component: () => import('@/views/login/indexV.vue')
    }

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
});
router.afterEach((to) => {
  document.title = to.meta.tit;
});

export default router;
