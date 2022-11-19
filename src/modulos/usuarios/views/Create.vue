<script lang="ts">
import { defineComponent } from 'vue';
import showNotify, { TypeNotification } from '@/utils/notifications';
import moment from 'moment';
import { createUser, getCreateReferences } from "@/services/userApi";
import InterfaceLoader from '@/components/InterfaceLoader.vue';

export default defineComponent({
  name: 'Create',
  components: {
    InterfaceLoader,
  },
  created() {
    this.getReferences();
  },
  data(): any {
    return {
      interfaceIsReady: false,
      isDisabledSaveButton: false,
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      telefono: '',
      numeroCarnet: '',
      direccion: '',
      correo: '',
      nombreUsuario: '',
      password: '',
      fechaNacimiento: null,
      sexoSelected: null,
      listaGeneros: [
        { id: 'M', nombre: 'Hombre' },
        { id: 'F', nombre: 'Mujer' },
      ],
      cargoSelected: null,
      listaCargos: [],
      rolSelected: null,
      listaRoles: [],
      paisTelefonoSelected: null,
      listaPaises: [],
    };
  },
  methods: {
    goToIndex() {
      if (this.$route.name !== 'usuario-index') {
        this.$router.push({ name: 'usuario-index' });
      }
    },
    async saveForm() {
      this.isDisabledSaveButton = true;
      let fechaNacValidada = null;
      if (this.fechaNacimiento !== null) {
        fechaNacValidada = moment(this.fechaNacimiento).format('YYYY/MM/DD');
      }
      const payload = {
        nombre: this.nombre,
        apellido_paterno: this.apellidoPaterno,
        apellido_materno: this.apellidoMaterno,
        numero_carnet: this.numeroCarnet,
        direccion: this.direccion,
        fecha_nacimiento: fechaNacValidada,
        sexo: this.sexoSelected?.id ?? null,
        pais_id_telefono: this.paisTelefonoSelected?.id ?? null,
        telefono: this.telefono,
        cargo_id: this.cargoSelected?.id ?? null,
        role_id: this.rolSelected?.id ?? null,
        nombre_usuario: this.nombreUsuario,
        correo: this.correo,
        password: this.password,
      };
      try {
        const response = await createUser(payload);
        showNotify('Registro exitoso!', response.data.message, TypeNotification.Ok);
        this.$router.push({ name: 'usuario-index' });
      } catch (error: any) {
        Object.entries(error.response.data.validations).forEach(([, value]: any) => {
          value.forEach((el: string) => {
            showNotify('Error de validación', el, TypeNotification.Warn);
          });
        });
        this.isDisabledSaveButton = false;
      }
    },
    async getReferences() {
      try {
        const response = await getCreateReferences();
        this.listaPaises = response.data.paises;
        this.listaCargos = response.data.cargos;
        this.listaRoles = response.data.roles;
        this.interfaceIsReady = true;
      } catch (error) {
        console.log(error);
      }
    },
    disableFutureDates(date: Date) {
      return date > new Date(new Date().setHours(0, 0, 0, 0));
    },
  },
  computed: {
    getPrefijoLlamada() {
      if (this.paisTelefonoSelected === null) {
        return '';
      }
      return `+${this.paisTelefonoSelected.prefijo_llamada}`;
    },
  },
});
</script>

<template>
  <div>
    <v-row class="mb-0">
      <v-col cols="12">
        <h4 class="text-h5">Crear nuevo usuario</h4>
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
            :disabled="isDisabledSaveButton"
            @click="saveForm"
          >Guardar</v-btn>
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