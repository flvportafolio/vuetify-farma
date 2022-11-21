<template>
  <v-row class="pt-5">
    <v-col cols="4"></v-col>
    <v-col cols="4" class="text-center">
      <h1 class="title-403">403</h1>
    </v-col>
    <v-col cols="12" class="error-content mt-5">
      <h2 class="text-h5">No tienes privilegios para acceder a esa página.</h2>
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
.title-403 {
  font-size: 6rem;
  font-weight: 300;
  line-height: 1.2;
}
.error-content {
  font-family:"Nunito Sans";
  text-align: center;
}
</style>