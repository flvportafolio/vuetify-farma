<script setup lang="ts">
import Navigation from './Navigation.vue';

</script>

<template>
  <v-layout>
    <Navigation />
    <v-main>
      <v-container>
        <router-view v-slot="{ Component }">
          <Transition name="fade">
            <component :is="Component" />
          </Transition>
        </router-view>
      </v-container>
    </v-main>
  </v-layout>
</template>

<style>
body { background: #d2d6de94; }
a {
  text-decoration: none;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>