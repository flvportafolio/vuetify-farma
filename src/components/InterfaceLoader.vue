<template>
  <div class="my-10">
    <v-row class="justify-center" no-gutters>    
      <v-progress-circular
        :size="50"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-row>

    <v-row class="justify-center" no-gutters>
      <div class="flex pt-2">
        <strong class="text-h5"> Cargando...</strong>
      </div>
    </v-row>
  </div>
</template>