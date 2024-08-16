import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import LandingPage from '@/views/LandingPage.vue'
import ShortCut from '@/views/ShortCut.vue'
import MainView from '@/views/MainView.vue'
import TextToImage from '@/views/TextToImage.vue';
import ImageToImage from '@/views/ImageToImage.vue';

const routes = [
  {
    path: '/',
    redirect: '/main/ShortCut'
  },  
  {
     path: '/login',
     name: 'login',
    component: Login
  },
   {
   path: '/home',
   name: 'home',
   component: LandingPage  
   },
  {
    path: '/main',
    name: 'main',
    component: MainView,
    children: [
      {
        path: 'ShortCut',
        name: 'ShortCut',
        component: ShortCut
      },
      {
        path: 'TextToImage',
        name: 'TextToImage',
        component: TextToImage
      },
      {
        path: 'ImageToImage',
        name: 'ImageToImage',
        component: ImageToImage
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (!token && to.name !== 'login') {
    // 如果没有token并且要去的不是登录页，重定向到登录页
    next({ name: 'login' });
  } else {
    // 如果有token或目标页是登录页，放行
    next();
  }
});


export default router
