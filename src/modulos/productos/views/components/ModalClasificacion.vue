<script lang="ts">
import { defineComponent } from 'vue';
import {
  getClasifications,
  createClasification,
  updateClasification,
  deleteClasification,
} from "@/services/clasificationApi";
import showNotify, { TypeNotification } from '@/utils/notifications';
import { StatusCodes } from '@/utils/statusCodes';

export default defineComponent({
  name: 'ModalClasificacion',
  props: ['modelValue'],
  emits: ['update:modelValue', 'onUpdate'],
  data() {
    return {
      textButton: 'Guardar',
      selectedId: null as any,
      nombre: '',
      descripcion: '',
      isDisabledButton: false,
      fields: [
        {
          key: 'editar', label: ' ', width: '5%',
        },
        {
          key: 'eliminar', label: ' ', width: '5%',
        },
        {
          key: 'id', label: 'Id', width: '6%',
        },
        {
          key: 'nombre', label: 'Clasificación', width: '35%',
        },
        {
          key: 'descripcion', label: 'Descripción', width: '49%',
        },
      ],
      items: [] as Array<any>,
      isLoadingTable: true,
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
    };
  },
  methods: {
    onOpenModal() {
      this.getClasificacionesApi();
    },
    clearFields() {
      this.selectedId = null;
      this.textButton = 'Guardar';
      this.nombre = '';
      this.descripcion = '';
    },
    async getClasificacionesApi() {
      this.isLoadingTable = true;
      const params = {
        page: this.currentPage,
      };
      try {
        const response = await getClasifications(params);
        this.items = response.data.clasificaciones.data;
        this.totalRows = response.data.clasificaciones.total;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoadingTable = false;
      }
    },
    async guardarItem() {
      this.isDisabledButton = true;
      const payload = {
        nombre: this.nombre,
        descripcion: this.descripcion,
      };
      try {
        const response = await createClasification(payload);
        showNotify('Registro exitoso!', response.data.message, TypeNotification.Ok);
        this.clearFields();
        this.getClasificacionesApi();
      } catch (error: any) {
        Object.entries(error.response.data.validations).forEach(([, value]: any) => {
          value.forEach((el: string) => {
            showNotify('Error de validación', el, TypeNotification.Warn);
          });
        });
      } finally {
        this.isDisabledButton = false;
      }
    },
    editarItem(item: any) {
      this.textButton = 'Modificar';
      this.selectedId = item.id;
      this.nombre = item.nombre;
      this.descripcion = item.descripcion;
    },
    async actualizarItem() {
      this.isDisabledButton = true;
      const payload = {
        nombre: this.nombre,
        descripcion: this.descripcion,
      };

      try {
        const response = await updateClasification(this.selectedId, payload);
        showNotify('Se modifico el registro', response.data.message, TypeNotification.Ok);
        this.clearFields();
        this.getClasificacionesApi();
        this.$emit('onUpdate');
      } catch (error: any) {
        Object.entries(error.response.data.validations).forEach(([, value]: any) => {
          value.forEach((el: string) => {
            showNotify('Error de validación', el, TypeNotification.Warn);
          });
        });
      } finally {
        this.isDisabledButton = false;
      }
    },
    async deleteItem(id: string) {
      this.clearFields();
      try {
        this.items = this.items.filter((el: any) => el.id !== id);
        const response = await deleteClasification(id);
        if (response.status === StatusCodes.deleted) {
          showNotify('Registro Eliminado', 'Se elimino el registro correctamente.', TypeNotification.Ok);
        } else {
          showNotify('No se pudo eliminar el registro', response.data.message, TypeNotification.Error);
          this.getClasificacionesApi();
        }
      } catch (error: any) {
        if (error.response.status === StatusCodes.notFound) {
          showNotify('No se pudo eliminar el registro', 'Recargue la página e intente nuevamente.', TypeNotification.Error);
        }
        this.getClasificacionesApi();
      }
    },
    handleStoreOrUpdate() {
      if (this.selectedId === null) {
        this.guardarItem();
        return;
      }
      this.actualizarItem();
    },
  },
  computed: {
    modal: {
      get() {
        return this.modelValue;
      },
      set(value: any) {
        this.$emit('update:modelValue', value);
      }
    },
    getPagesPagination(){
      return Math.ceil(this.totalRows/this.perPage);
    },
  },
  watch: {
    currentPage(newVal,oldVal) {
      this.getClasificacionesApi();
    },
    modal(val: boolean) {
      if (val === true) {
        this.onOpenModal();
      }
    },
  },
});
</script>
<template>
  <v-dialog
    v-model="modal"
    :open-on-click="false"
    max-width="700px"
  >
    <v-card>
      <template v-slot:title>
        Clasificación
      </template>
      <v-row class="mx-0">
        <v-col cols="5">
          <v-text-field
            v-model="nombre"
            label="Nombre:"
            density="compact"
            placeholder="Escriba un nombre"
          >
            <!-- <template v-slot:label>
              <span>
                Nombre: <span class="text-error">*</span>
              </span>
            </template> -->
          </v-text-field>
        </v-col>
        <v-col cols="5">
          <v-text-field
            v-model="descripcion"
            :disabled="isDisabledButton"
            @keyup.enter="handleStoreOrUpdate"
            label="Descripción:"
            placeholder="Escriba una descripción"
            density="compact"
          />
        </v-col>
        <v-col cols="2" class="pl-0 pr-3">
          <v-btn
            rounded="pill"
            color="success"
            :disabled="isDisabledButton"
            @click="handleStoreOrUpdate"
          >
            {{textButton}}
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="mx-0">
        <v-col cols="12">
          <v-table>
            <thead>
              <tr>
                <th
                  v-for="(item, index) in fields"
                  :key="index"
                  :width="item.width"
                >
                  {{item.label}}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoadingTable">
                <th colspan="5" class="text-center">
                  <v-progress-circular
                    class="mr-2"
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                  Cargando...
                </th>
              </tr>
              <template v-else>
                <tr
                  v-for="item in items"
                  :key="item.id"
                >
                  <td>
                    <v-icon
                      @click="editarItem(item)"
                      icon="mdi-pencil"
                      color="secondary"
                    />
                  </td>
                  <td>
                    <v-icon
                      @click="deleteItem(item.id)"
                      icon="mdi-trash-can-outline"
                      color="error"
                      style="cursor:pointer"
                    ></v-icon>
                  </td>
                  <td>{{ item.id }}</td>
                  <td>{{ item.nombre }}</td>
                  <td>{{ item.descripcion }}</td>
                </tr>
              </template>
              <tr v-if="items.length === 0 && isLoadingTable === false">
                <th colspan="5">
                  No hay datos
                </th>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6"></v-col>
        <v-col cols="6">
          <v-pagination
            v-model="currentPage"
            @update:model-value="getClasificacionesApi"
            :total-visible="3"
            :length="getPagesPagination"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>