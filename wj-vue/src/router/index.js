import Vue from 'vue';
import Router from 'vue-router';
import login from '@/components/HelloWorld';
import AppIndex from '@/components/home/AppIndex'
import home from '@/components/home'
import labrary from '@/components/labrary/LibraryIndex'
import register from '@/components/register'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
    },{
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect: '/index',
      meta: {
        requireAuth: true
      },
      children: [{
        path: '/index',
        name: 'index',
        component: AppIndex,
        meta: {
          requireAuth: true
        }
      },
      {
        path:'/library',
        name:'labrary',
        component:labrary,
        meta: {
          requireAuth: true
        }
      }
      
      ],
    },
  ],
});
