<template>
  <v-navigation-drawer
    expand-on-hover
    rail
  >
    <v-list>
      <v-list-item
        prepend-icon="mdi-account-circle"
        :title="getUserName"
        subtitle="Farmacia FABIO"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <template v-for="(route, idx) in routes" :key="idx">
        <v-list-item
          :to="{ name: route.name}"
          :active="isRouteActive(route.name)"
          :prepend-icon="route.icon"
          :title="route.text"
          :value="route.name"
        ></v-list-item>
      </template>
      <v-menu :location="'end'">
        <template v-slot:activator="{ props }">
          <v-list-item
            prepend-icon="mdi-cog"
            append-icon="mdi-chevron-right"
            title="Configuración"
            value="config"
            v-bind="props"
          ></v-list-item>
        </template>

        <v-list>
          <v-list-item
            :to="{ name: 'profile'}"
            :active="isRouteActive('profile')"
            title="Mi perfil"
            value="profile"
          ></v-list-item>
        </v-list>
      </v-menu>
      <v-list-item prepend-icon="mdi-logout" title="Cerrar sesión" value="logout" @click="logout"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import $axios from '@/axiosConfig';
import { useRoute } from 'vue-router';
import { useMainStore } from '@/stores/index';

const route = useRoute();
const store = useMainStore();

function logout() {
  $axios.post('logout');
  store.logout();
}

const getUserName = computed(() => {
  return store.user?.nombre_usuario ?? '';
});

const routes = reactive([
  { 
    name: 'dashboard',
    text: 'Inicio',
    icon: 'mdi-home',
    haveAccess: true,
    disabled: false,
  },
  {
    name: 'usuario-index',
    text: 'Usuarios',
    icon: 'mdi-account-multiple',
    haveAccess: computed(() => store.canListarUsuarios),
    disabled: false,
  },
  {
    name: 'producto-index',
    text: 'Productos',
    icon: 'mdi-package',
    haveAccess: computed(() => store.canListarProductos),
    disabled: false,
  },
  {
    name: 'proveedor-index',
    text: 'Proveedores',
    icon: 'mdi-account-group',
    haveAccess: true,
    disabled: true,
  },
  {
    name: 'pedido-index',
    text: 'Pedidos',
    icon: 'mdi-book-open-variant',
    haveAccess: true,
    disabled: true,
  },
  {
    name: 'inventario-index',
    text: 'Inventario',
    icon: 'mdi-archive',
    haveAccess: true,
    disabled: true,
  },
  {
    name: 'reportes-index',
    text: 'Reportes',
    icon: 'mdi-file-chart',
    haveAccess: true,
    disabled: true,
  },
]);

function isRouteActive (actualRouteName: string) {
  return route.name === actualRouteName;
}
</script>