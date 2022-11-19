import { RouteRecordRaw  } from 'vue-router';
/* import store from '@/store';
import { redirectIfHavePermissions } from '@/utils/permisos'; */

const title = 'Reportes';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'reportes',
    name: 'reportes-index',
    component: () => import('../views/Index.vue'),
    /* beforeEnter: (to, from, next) => {
      redirectIfHavePermissions(store.getters.canListarReportes, next);
    }, */
    meta: { title: `${title} - listar` },
  },
];

export default routes;