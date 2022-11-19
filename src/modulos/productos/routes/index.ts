import { RouteRecordRaw  } from 'vue-router';
import { useMainStore } from '@/stores/index';
import { redirectIfHavePermissions } from '@/utils/permisos';

const title = 'Productos';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'producto',
    name: 'producto-index',
    component: () => import('../views/Index.vue'),
    beforeEnter: (to, from, next) => {
      const store = useMainStore();
      redirectIfHavePermissions(store.canListarProductos, next);
    },
    meta: { title },
  },
  {
    path: 'producto/create',
    name: 'producto-create',
    component: () => import('../views/Create.vue'),
    beforeEnter: (to, from, next) => {
      const store = useMainStore();
      redirectIfHavePermissions(store.canCrearProductos, next);
    },
    meta: { title: `${title} - nuevo` },
  },
  {
    path: 'producto/edit/:id',
    name: 'producto-edit',
    component: () => import('../views/Edit.vue'),
    beforeEnter: (to, from, next) => {
      const store = useMainStore();
      redirectIfHavePermissions(store.canEditarProductos, next);
    },
    meta: { title: `${title} - editar` },
  },


];

export default routes;