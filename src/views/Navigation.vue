<script setup lang="ts">
import $axios from '@/axiosConfig';
import { useMainStore } from '@/stores/index';

const store = useMainStore();

function logout() {
  $axios.post('logout');
  store.logout();
}

</script>

<template>
  <v-navigation-drawer
    expand-on-hover
    rail
  >
    <v-list>
      <v-list-item
        prepend-icon="mdi-account-circle"
        title="Sandra Adams"
        subtitle="sandra_a88@gmailcom"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-home" title="Dashboard" value="myfiles"></v-list-item>
      <v-list-item prepend-icon="mdi-account-multiple" title="Usuarios" value="users"></v-list-item>
      <v-list-item prepend-icon="mdi-package" title="Productos" value="products"></v-list-item>
      <v-list-item prepend-icon="mdi-logout" title="Cerrar sesión" value="logout" @click="logout"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>