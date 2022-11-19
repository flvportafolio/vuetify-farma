import { RouteRecordRaw  } from 'vue-router';
/* import store from '@/store';
import { redirectIfHavePermissions } from '@/utils/permisos'; */

const title = 'Pedidos';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'pedido',
    name: 'pedido-index',
    component: () => import('../views/Index.vue'),
    /* beforeEnter: (to, from, next) => {
      redirectIfHavePermissions(store.getters.canListarPedidos, next);
    }, */
    meta: { title },
  },
  /* {
    path: 'pedido/create',
    name: 'pedido-create',
    component: () => import('../views/Create.vue'),
    beforeEnter: (to, from, next) => {
      redirectIfHavePermissions(store.getters.canCrearPedidos, next);
    },
    meta: { title: `${title} - nuevo` },
  },
  {
    path: 'pedido/edit/:id',
    name: 'pedido-edit',
    component: () => import('../views/Edit.vue'),
    beforeEnter: (to, from, next) => {
      redirectIfHavePermissions(store.getters.canEditarPedidos, next);
    },
    meta: { title: `${title} - editar` },
  }, */
];

export default routes;