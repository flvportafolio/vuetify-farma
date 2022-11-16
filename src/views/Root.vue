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