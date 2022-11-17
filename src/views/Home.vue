<template>
  <div>
    <v-row class="mb-3">
      <v-col cols="12" class="text-center">
        <h4 class="text-h5">Bienvenido al Menu principal</h4>
      </v-col>
    </v-row>
    <v-card>
      <template v-slot:title>
        La app usa vuetify y es solo para pruebas
      </template>
      <template v-slot:text>
        <h4>Detalles</h4>
        <ul class="px-4">
          <li>
            Hay Cambios importantes con respecto al proyecto original para aprovechar nuevas funcionalidades.
          </li>
        </ul>
      </template>
    </v-card>
  </div>
</template>