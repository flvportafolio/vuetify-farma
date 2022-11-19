import { RouteRecordRaw  } from 'vue-router';
/* import store from '@/store';
import { redirectIfHavePermissions } from '@/utils/permisos'; */

const title = 'Inventario';
const routes: Array<RouteRecordRaw> =[
  {
    path: 'inventario',
    name: 'inventario-index',
    component: () => import('../views/Index.vue'),
    /* beforeEnter: (to, from, next) => {
      redirectIfHavePermissions(store.getters.canListarInventario, next);
    }, */
    meta: { title: `${title} - listar` },
  },
];

export default routes;