<template>  
  <v-row class="pt-5">
    <v-col cols="4"></v-col>
    <v-col cols="4">
      <img src="/img/404-not-found.svg" class="w-100">
    </v-col>
    <v-col cols="12" class="error-content mt-5">
      <h2 class="text-h5">Página no encontrada</h2>
      <v-btn
        to="/"
        rounded="pill"
        color="info"
        class="mt-3"
      >Volver al Inicio</v-btn>
    </v-col>
  </v-row>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Nunito+Sans');
.error-content {
  font-family:"Nunito Sans";
  text-align: center;
}
</style>