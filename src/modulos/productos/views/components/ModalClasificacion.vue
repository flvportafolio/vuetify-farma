<!-- <script>
import {
  getClasifications,
  createClasification,
  updateClasification,
  deleteClasification,
} from "@/services/clasificationApi";
import showNotify, { TypeNotification } from '@/utils/notifications';
import { StatusCodes } from '@/utils/statusCodes';

export default {
  name: 'ModalClasificacion',
  props: ['modelValue'],
  emits: ['update:modelValue', 'onUpdate'],
  data() {
    return {
      textButton: 'Guardar',
      selectedId: null,
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
      items: [],
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
      } catch (error) {
        Object.entries(error.response.data.validations).forEach(([, value]) => {
          value.forEach((el) => {
            showNotify('Error de validación', el, TypeNotification.Warn);
          });
        });
      } finally {
        this.isDisabledButton = false;
      }
    },
    editarItem(item) {
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
      } catch (error) {
        Object.entries(error.response.data.validations).forEach(([, value]) => {
          value.forEach((el) => {
            showNotify('Error de validación', el, 'warn');
          });
        });
      } finally {
        this.isDisabledButton = false;
      }
    },
    async deleteItem(id) {
      this.clearFields();
      try {
        this.items = this.items.filter((el) => el.id !== id);
        const response = await deleteClasification(id);
        if (response.status === StatusCodes.deleted) {
          showNotify('Registro Eliminado', 'Se elimino el registro correctamente.', TypeNotification.Ok);
        } else {
          showNotify('No se pudo eliminar el registro', response.data.message, TypeNotification.Error);
          this.getClasificacionesApi();
        }
      } catch (error) {
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
      set(value) {
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
  },
};
</script>
<template>
  <va-modal
    v-model="modal"
    size="large"
    hide-default-actions
    title="Clasificación"
    @open="onOpenModal"
  >
    <div class="row mx-0 mb-3">
      <div class="flex md5 pr-3">        
        <va-input
          v-model="nombre"
          label="Nombre:"
          required-mark
          placeholder="Escriba un nombre"
        />
      </div>
      <div class="flex md5 pr-3">
        <va-input
          v-model="descripcion"
          :disabled="isDisabledButton"
          @keyup.enter="handleStoreOrUpdate"
          label="Descripción:"
          placeholder="Escriba una descripción"
        />
      </div>
      <div class="flex md2">
        <va-button
          color="success"
          :disabled="isDisabledButton"
          @click="handleStoreOrUpdate"
        >
          {{textButton}}
        </va-button>
      </div>
    </div>
    <div class="row mx-0 table-responsive">
      <va-data-table
        no-data-html="No hay datos"
        striped
        :items="items"
        :columns="fields"
        :loading="isLoadingTable"
      >
        <template #cell(editar)="{ rowData }">
          <va-icon
            name="edit"
            color="secondary"
            @click="editarItem(rowData)"
          />
        </template>
        <template #cell(eliminar)="{ rowData }">
          <va-icon
            @click="deleteItem(rowData.id)"
            name="delete_outline"
            color="danger"
          />
        </template>
      </va-data-table>
    </div>
    <div class="row mt-3">
      <div class="flex offset--md6 md6 pl-0">
        <va-pagination
          v-model="currentPage"
          :pages="getPagesPagination"
          :visible-pages="3"
          direction-links
        />
      </div>
    </div>
  </va-modal>
</template> -->
<template>
  <div>Modal Clasificacion</div>
</template>