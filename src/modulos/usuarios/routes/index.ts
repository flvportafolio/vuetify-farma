import { RouteRecordRaw  } from 'vue-router';
import { useMainStore } from '@/stores/index';
import { redirectIfHavePermissions } from '@/utils/permisos';

const title = 'Usuarios';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'usuario',
    name: 'usuario-index',
    component: () => import('../views/Index.vue'),
    beforeEnter: (to, from, next) => {
      const store = useMainStore();
      redirectIfHavePermissions(store.canListarUsuarios, next);
    },
    meta: { title },
  },
  {
    path: 'usuario/create',
    name: 'usuario-create',
    component: () => import('../views/Create.vue'),
    beforeEnter: (to, from, next) => {
      const store = useMainStore();
      redirectIfHavePermissions(store.canCrearUsuarios, next);
    },
    meta: { title: `${title} - nuevo` },
  },
  {
    path: 'usuario/edit/:id',
    name: 'usuario-edit',
    component: () => import('../views/Edit.vue'),
    beforeEnter: (to, from, next) => {
      const store = useMainStore();
      redirectIfHavePermissions(store.canEditarUsuarios, next);
    },
    meta: { title: `${title} - editar` },
  },

];

export default routes;
