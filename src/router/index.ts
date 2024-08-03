import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import LandingPage from '@/views/LandingPage.vue'
import ShortCut from '@/views/ShortCut.vue'
import MainView from '@/views/MainView.vue'
import TextToImage from '@/views/TextToImage.vue';
import ImageToImage from '@/views/ImageToImage.vue';
// import MainLayout from '../layouts/MainLayout.vue';
import TaskDetails from '../views/TaskDetail.vue';

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
      },
      {
        path: 'TaskDetails/:taskId',
        component: TaskDetails
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});
export default router
