<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import moment from 'moment';
import { getUser, updateUser } from "@/services/userApi";
import showNotify, { TypeNotification } from '@/utils/notifications';
import InterfaceLoader from '@/components/InterfaceLoader.vue';
onMounted(()=> {
  getReferences();
});

const router = useRouter();
const route = useRoute();
const id = ref(decodeBase64(route.params.id));
const interfaceIsReady = ref(false);
const isDisabledUpdateButton = ref(false);
const nombre = ref('');
const apellidoPaterno = ref('');
const apellidoMaterno = ref('');
const telefono = ref('');
const numeroCarnet = ref('');
const direccion = ref('');
const correo = ref('');
const nombreUsuario = ref('');
const password = ref('');
const fechaNacimiento = ref<any>(null);
const sexoSelected = ref<any>(null);
const listaGeneros = [
  { id: 'M', nombre: 'Hombre' },
  { id: 'F', nombre: 'Mujer' },
];
const cargoSelected = ref<any>(null);
const listaCargos = ref<any[]>([]);
const rolSelected = ref<any>(null);
const listaRoles = ref<any[]>([]);
const paisTelefonoSelected = ref<any>(null);
const listaPaises = ref<any[]>([]);


function decodeBase64(data: any) {
  try {
    return window.atob(data);
  } catch (error) {
    showNotify('Error con la URL', 'Verifique que la URL sea la correcta', TypeNotification.Error);
    return null;
  }
}

function goToIndex() {
  if (route.name !== 'usuario-index') {
    router.push({ name: 'usuario-index' });
  }
}

async function updateForm() {
  isDisabledUpdateButton.value = true;
  if (id.value === null) {
    return;
  }
  let fechaNacValidada = null;
  if (fechaNacimiento.value !== null) {
    fechaNacValidada = moment(fechaNacimiento.value).format('YYYY/MM/DD');
  }
  const payload = {
    nombre: nombre.value,
    apellido_paterno: apellidoPaterno.value,
    apellido_materno: apellidoMaterno.value,
    numero_carnet: numeroCarnet.value,
    direccion: direccion.value,
    fecha_nacimiento: fechaNacValidada,
    sexo: sexoSelected.value?.id ?? null,
    pais_id_telefono: paisTelefonoSelected.value?.id ?? null,
    telefono: telefono.value,
    cargo_id: cargoSelected.value?.id ?? null,
    role_id: rolSelected.value?.id ?? null,
    nombre_usuario: nombreUsuario.value,
    correo: correo.value,
    password: password.value,
  };
  try {
    const response = await updateUser(id.value, payload);
    showNotify('Se modifico el registro', response.data.message, TypeNotification.Ok);
    goToIndex();
  } catch (error: any) {
    Object.entries(error.response.data.validations).forEach(([, value]) => {
      const tempList = value as Array<string>;
      tempList.forEach((el: string) => {
        showNotify('Error de validación', el, TypeNotification.Warn);
      });
    });
    isDisabledUpdateButton.value = false;
  }
}

async function getReferences() {
  if (id.value === null) {
    return;
  }
  try {
    const response = await getUser(id.value);
    listaPaises.value = response.data.paises;
    listaCargos.value = response.data.cargos;
    listaRoles.value = response.data.roles;
    nombre.value = response.data.usuario.nombre;
    apellidoPaterno.value = response.data.usuario.apellido_paterno;
    apellidoMaterno.value = response.data.usuario.apellido_materno;
    numeroCarnet.value = response.data.usuario.numero_carnet;
    fechaNacimiento.value = moment(response.data.usuario.fecha_nacimiento, 'YYYY-MM-DD').toDate();
    cargoSelected.value = listaCargos.value.find((el) => (
      el.id === response.data.usuario.cargo_id
    ));
    rolSelected.value  = listaRoles.value.find((el) => (
      el.id === response.data.usuario.role_id
    ));
    paisTelefonoSelected.value = listaPaises.value.find((el) => (
      el.id === response.data.usuario.pais_id_telefono
    ));
    telefono.value = response.data.usuario.telefono;
    direccion.value = response.data.usuario.direccion;
    sexoSelected.value = listaGeneros.find((el) => (
      el.id === response.data.usuario.sexo
    ));
    correo.value = response.data.usuario.correo;
    nombreUsuario.value = response.data.usuario.nombre_usuario;
    interfaceIsReady.value = true;
  } catch (error) {
    console.log(error);
  }
}

function disableFutureDates(date: any) {
  return date > new Date(new Date().setHours(0, 0, 0, 0));
}

const getPrefijoLlamada = computed(() => {
  if (paisTelefonoSelected.value === null) {
    return '';
  }
  return `+${paisTelefonoSelected.value.prefijo_llamada}`;
});
</script>

<template>
  <div>
    <v-row class="mb-0">
      <v-col cols="12">
        <h4 class="text-h5">Modificar usuario Id: {{id}}</h4>
      </v-col>
    </v-row>
    <v-card>
      <v-row class="ma-0">
        <v-col cols="9">
          <v-btn
            rounded="pill"
            color="secondary"
            class="mr-2"
            @click="goToIndex"
          >Atrás</v-btn>
          <v-btn
            rounded="pill"
            color="success"
            class="mr-2"
            :disabled="isDisabledUpdateButton"
            @click="updateForm"
          >Modificar</v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <div v-if="interfaceIsReady">
        <v-row class="mx-0 my-7 mb-0">
          <v-col cols="2" class="text-right pr-0">
            Nombre(s): <span class="text-error">*</span>
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="nombre" density="compact"></v-text-field>
          </v-col>
          <v-col cols="2" class="text-right pr-0">
            Fecha de nacimiento: <span class="text-error">*</span>
          </v-col>
          <v-col cols="2">
            <date-picker
              class="flex w-100"
              v-model:value="fechaNacimiento"
              :disabled-date="disableFutureDates"
              format="DD/MM/YYYY"
              type="date"
              placeholder="Seleccionar Fecha"
            ></date-picker>
          </v-col>
          <v-col cols="1" class="text-right pr-0">
            Sexo: <span class="text-error">*</span>
          </v-col>
          <v-col cols="2">
            <v-combobox
              v-model="sexoSelected"
              :items="listaGeneros"
              item-title="nombre"
              density="compact"
              placeholder="Seleccionar"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row class="mx-0">
          <v-col cols="2" class="text-right pr-0">
            Apellido paterno: <span class="text-error">*</span>
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="apellidoPaterno" density="compact"></v-text-field>
          </v-col>
          <v-col cols="2" class="text-right pr-0">
            Cargo: <span class="text-error">*</span>
          </v-col>
          <v-col cols="2">
            <v-combobox
              v-model="cargoSelected"
              :items="listaCargos"
              item-title="nombre"
              density="compact"
              placeholder="Seleccionar"
            ></v-combobox>
          </v-col>
          <v-col cols="1" class="text-right pr-0">
            Rol: <span class="text-error">*</span>
          </v-col>
          <v-col cols="2">
            <v-combobox
              v-model="rolSelected"
              :items="listaRoles"
              item-title="nombre"
              density="compact"
              placeholder="Seleccionar"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row class="mx-0">
          <v-col cols="2" class="text-right pr-0">
            Apellido materno: <span class="text-error">*</span>
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="apellidoMaterno" density="compact"></v-text-field>
          </v-col>
          <v-col cols="2" class="text-right pr-0">
            Telefono: <span class="text-error">*</span>
          </v-col>
          <v-col cols="3">
            <v-row>
              <v-col cols="4" class="pr-2">
                <multiselect
                  label="nombre"
                  track-by="id"
                  v-model="paisTelefonoSelected"
                  :options="listaPaises"
                  :searchable="false"
                  placeholder=""
                  selectLabel=""
                  selectedLabel=""
                  deselectLabel="X"
                >
                  <template #noOptions>No hay paises registrados</template>
                  <template #singleLabel="props">
                    <img class="option__image" :src="props.option.imagen" width="32">
                  </template>
                  <template #option="props">
                    <img class="option__image" :src="props.option.imagen" width="32">
                  </template>
                </multiselect>
              </v-col>
              <v-col cols="8" class="pl-0">
                <v-text-field
                  v-model="telefono"
                  placeholder="numero celular"
                  density="compact"
                >
                  <template #prepend-inner>
                    {{getPrefijoLlamada}}
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="mx-0 mb-10">
          <v-col cols="2" class="text-right pr-0">
            Numero de carnet: <span class="text-error">*</span>
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="numeroCarnet" density="compact"></v-text-field>
          </v-col>
          <v-col cols="2" class="text-right pr-0">
            Dirección: <span class="text-error">*</span>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="direccion" density="compact"></v-text-field>
          </v-col>
        </v-row>

        <v-row class="mx-0">
          <v-col cols="2" class="text-right pr-0">
            <label class="font-weight-bold">
              Correo: <span class="text-error">*</span>
            </label>
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="correo"
              name="email"
              type="email"
              density="compact"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mx-0">
          <v-col cols="2" class="text-right pr-0">
            <label class="font-weight-bold">
              Nombre de usuario: <span class="text-error">*</span>
            </label>
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="nombreUsuario" density="compact" ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mx-0">
          <v-col cols="2" class="text-right pr-0">
            <label class="font-weight-bold">
              Contraseña: <span class="text-error">*</span>
            </label>
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="password"
              density="compact"
              name="password"
              type="password"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
      <InterfaceLoader v-else/>
    </v-card>
  </div>
</template>