import { RouteRecordRaw  } from 'vue-router';
/* import store from '@/store';
import { redirectIfHavePermissions } from '@/utils/permisos';
 */

const title = 'Proveedores';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'proveedor',
    name: 'proveedor-index',
    component: () => import('../views/Index.vue'),
    /* beforeEnter: (to, from, next) => {
      redirectIfHavePermissions(store.getters.canListarProveedores, next);
    }, */
    meta: { title },
  },
  /* {
    path: 'proveedor/create',
    name: 'proveedor-create',
    component: () => import('../views/Create.vue'),
    beforeEnter: (to, from, next) => {
      redirectIfHavePermissions(store.getters.canCrearProveedores, next);
    },
    meta: { title: `${title} - nuevo` },
  },
  {
    path: 'proveedor/edit/:id',
    name: 'proveedor-edit',
    component: () => import('../views/Edit.vue'),
    beforeEnter: (to, from, next) => {
      redirectIfHavePermissions(store.getters.canEditarProveedores, next);
    },
    meta: { title: `${title} - editar` },
  }, */
];

export default routes;