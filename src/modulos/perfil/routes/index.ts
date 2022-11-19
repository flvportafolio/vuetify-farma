import { RouteRecordRaw  } from 'vue-router';

const title = 'Mi perfil';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'profile',
    name: 'profile',
    component: () => import('../views/Index.vue'),
    meta: { title },
  },
];

export default routes;