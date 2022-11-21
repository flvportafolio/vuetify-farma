import { nextTick } from 'vue';
import { createWebHistory, createRouter, RouteRecordRaw  } from 'vue-router';
import { useMainStore } from '../stores/index';

import Error403 from '@/views/pages/Error403.vue';
import Error404 from '@/views/pages/Error404.vue';
import Login from '@/views/pages/Login.vue';
import Home from '@/views/Home.vue';
import ProfileRoutes from '../modulos/perfil/routes';
import UsuarioRoutes from '../modulos/usuarios/routes';
import ProductoRoutes from '../modulos/productos/routes';
import ProveedorRoutes from '../modulos/proveedores/routes';
import PedidoRoutes from '../modulos/pedidos/routes';
import InventarioRoutes from '../modulos/inventario/routes';
import ReporteRoutes from '../modulos/reportes/routes';

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
      ...ProfileRoutes,
      ...UsuarioRoutes,
      ...ProductoRoutes,
      ...ProveedorRoutes,
      ...PedidoRoutes,
      ...InventarioRoutes,
      ...ReporteRoutes,
    ]
  },
  {
    path: '/403',
    name: 'unauthorized',
    component: Error403,
    meta: { title: 'Error 403' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error-404',
    component: Error404,
    meta: { title: 'Error 404' },
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