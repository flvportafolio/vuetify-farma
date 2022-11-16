import { nextTick } from 'vue';
import { createWebHistory, createRouter, RouteRecordRaw  } from 'vue-router';
import { useMainStore } from '../stores/index';

import Login from '@/views/pages/Login.vue';
import Home from '@/views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { title: 'Login' },
  },
  {
    path: '/',
    meta: { requiresAuth: true },
    async beforeEnter(to, from, next) {
      const store = useMainStore();
      
      await store.getPrivilegiosAPI();
      next();
    },
    component: () => import('@/views/Root.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: Home,
        meta: { title: 'Dashboard' },
      },
      /* ...*/
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = !!localStorage.getItem('token');
  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    // si no esta logeado redirige a la pagina de login.
    next({ name: 'login' });
  } else {
    if (to.name === 'login' && loggedIn) {
      next({ name: 'dashboard' });
      return;
    }
    next();
  }
});

router.afterEach((to) => {
  nextTick(() => {
    document.title = to.meta.title as string || 'Farmacia Fabio';
  });
});


export default router;