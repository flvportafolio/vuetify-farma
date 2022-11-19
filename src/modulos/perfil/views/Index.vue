<script setup lang="ts">
import moment from 'moment';
import { ref } from 'vue';
import $axios from '@/axiosConfig';
import showNotify, { TypeNotification } from '@/utils/notifications';

const id = ref<string | null>(null);
const nombre = ref('');
const apellidoPaterno = ref('');
const apellidoMaterno = ref('');
const correo = ref('');
const numeroCarnet = ref('');
const fechaNacimiento = ref('');
const cargo = ref('');
const currentPassword = ref('');
const newPassword = ref('');
const isVisibleCurrentPassword = ref(false);
const isVisibleNewPassword = ref(false);


async function getInfoApi() {
  try {
    const response = await $axios.post('me');
    id.value = response.data.usuario.usuario_id;
    nombre.value = response.data.usuario.nombre;
    apellidoPaterno.value = response.data.usuario.apellido_paterno;
    apellidoMaterno.value = response.data.usuario.apellido_materno;
    correo.value = response.data.usuario.correo;
    numeroCarnet.value = response.data.usuario.numero_carnet;
    fechaNacimiento.value = moment(response.data.usuario.fecha_nacimiento).format('DD/MM/YYYY');
    cargo.value = response.data.usuario.cargo;
  } catch (error) {
    console.log(error);
  }
}

async function updateKeys() {
  if (id.value === null) {
    return;
  }
  const payload = {
    actual: currentPassword.value,
    nuevo: newPassword.value,
  };
  try {
    const response = await $axios.post(`usuarios/${id.value}/update-password`, payload);
    showNotify('Modificación de Credenciales', response.data.message, TypeNotification.Ok);
    currentPassword.value = '';
    newPassword.value = '';
  } catch (error: any) {
    Object.entries(error.response.data.validations).forEach(([, value]) => {
      const tempList = value as Array<string>;
      tempList.forEach((el: string) => {
        showNotify('Error de validación', el, TypeNotification.Warn);
      });
    });
  }
}
//created hook of vue2
getInfoApi();

</script>

<template>
  <v-row no-gutters>
    <v-col cols="3"></v-col>
    <v-col cols="6">
      <v-row class="mb-3">
        <v-col cols="12" class="text-center">
          <h4 class="text-h5">Mi Perfil</h4>
        </v-col>
      </v-row>
      <v-card class="px-3 py-3">
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="nombre"
              label="Nombre"
              readonly
              density="compact"
            />
            <v-text-field
              v-model="apellidoPaterno"
              label="Apellido Paterno"
              readonly
              density="compact"
            />
            <v-text-field
              v-model="apellidoMaterno"
              label="Apellido Materno"
              readonly
              density="compact"
            />
            <v-text-field
              v-model="correo"
              label="Correo"
              readonly
              density="compact"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="numeroCarnet"
              label="Numero de Carnet"
              readonly
              density="compact"
            />
            <v-text-field
              v-model="fechaNacimiento"
              label="Fecha de Nacimiento"
              readonly
              density="compact"
            />
            <v-text-field
              v-model="cargo"
              label="Cargo"
              readonly
              density="compact"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <fieldset class="border px-2 py-2">
              <legend class="px-2 text-h6">Cambiar contraseña</legend>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="currentPassword"
                    :type="isVisibleCurrentPassword ? 'text': 'password'"
                    :append-icon="isVisibleCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="isVisibleCurrentPassword = !isVisibleCurrentPassword"
                    label="Contraseña Actual"
                    density="compact"
                    counter
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="newPassword"
                    :type="isVisibleNewPassword  ? 'text': 'password'"
                    :append-icon="isVisibleNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="isVisibleNewPassword = !isVisibleNewPassword"
                    label="Nueva Contraseña"
                    density="compact"
                    counter
                  />
                </v-col>
                <v-col cols="12" class="pt-0">
                  <v-btn
                    rounded="pill"
                    color="primary"
                    block
                    @click="updateKeys"
                  >Actualizar</v-btn>
                </v-col>
              </v-row>
            </fieldset>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
