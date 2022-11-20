<script lang="ts">
import { defineComponent } from 'vue';
import { getProducts, deleteProduct, getProductsPdf } from "@/services/productApi";
import showNotify, { TypeNotification } from '@/utils/notifications';
import { StatusCodes } from '@/utils/statusCodes';
import { openPdfNewTab } from '@/utils/pdf';
import ModalClasificacion from './components/ModalClasificacion.vue';

export default defineComponent({
  name: 'Index',
  components: {
    ModalClasificacion,
  },
  created() {
    this.getProductosApi();
  },
  data() {
    return {
      selectedId: null,
      search: '',
      filterState: true,
      isLoadingTable: true,
      fields: [
        {
          key: 'editar', label: ' ', width: '3%',
        },
        {
          key: 'eliminar', label: ' ', width: '3%',
        },
        {
          key: 'id', label: 'Id', sortable: true, width: '5%',
        },
        {
          key: 'nombre', label: 'Nombre', sortable: true, width: '17%',
        },
        {
          key: 'codigo_barra', label: 'Código de Barra', width: '12%',
        },
        {
          key: 'foto', label: 'Foto', width: '10%',
        },
        {
          key: 'empresa', label: 'Empresa', sortable: true, width: '15%',
        },
        {
          key: 'stock_minimo', label: 'Stock mínimo', width: '11%',
        },
        {
          key: 'descripcion', label: 'Descripción', width: '24%',
        },
      ],
      items: [] as Array<any>,
      selectedRadio: '1',
      optionsRadio: [
        { text: 'Todos', value: '1' },
        { text: 'Medicamentos', value: '2' },
        { text: 'Varios', value: '3' },
      ],
      perPage: 10,
      currentPage: 1,
      totalRows: 0,
      searchTimeOut: null as any,
      isLoadingPDF: false,
      modalEliminar: false,
      modalClasificacion: false,
    };
  },
  methods: {
    goToCreateRoute() {
      if (this.$route.name !== 'producto-create') {
        this.$router.push({ name: 'producto-create' });
      }
    },
    encodeBase64(data: string) {
      return window.btoa(data);
    },
    searchFromInput() {
      clearTimeout(this.searchTimeOut);
      this.searchTimeOut = setTimeout(this.getProductosApi, 500);
    },
    onChangeTipoVista() {
      if (this.selectedRadio === '2') {
        this.fields = [
          {
            key: 'editar', label: '', width: '3%',
          },
          {
            key: 'eliminar', label: '', width: '3%',
          },
          {
            key: 'id', label: 'Id', sortable: true, width: '5%',
          },
          {
            key: 'nombre', label: 'Nombre', sortable: true, width: '15%',
          },
          {
            key: 'foto', label: 'Foto', width: '10%',
          },
          {
            key: 'presentacion', label: 'Presentación', width: '15%',
          },
          {
            key: 'empresa', label: 'Empresa', sortable: true, width: '15%',
          },
          {
            key: 'clasificaciones', label: 'Clasificaciones', width: '22%',
          },
          {
            key: 'es_controlado', label: 'Es Controlado', sortable: true, width: '12%',
          },
        ];
      } else {
        this.fields = [
          {
            key: 'editar', label: '', width: '3%',
          },
          {
            key: 'eliminar', label: '', width: '3%',
          },
          {
            key: 'id', label: 'Id', sortable: true, width: '5%',
          },
          {
            key: 'nombre', label: 'Nombre', sortable: true, width: '17%',
          },
          {
            key: 'codigo_barra', label: 'Codigo de Barra', width: '12%',
          },
          {
            key: 'foto', label: 'Foto', width: '10%',
          },
          {
            key: 'empresa', label: 'Empresa', sortable: true, width: '15%',
          },
          {
            key: 'stock_minimo', label: 'Stock mínimo', width: '11%',
          },
          {
            key: 'descripcion', label: 'Descripción', width: '24%',
          },
        ];
      }
      this.getProductosApi();
    },
    openModalEliminar(id: any) {
      this.selectedId = id;
      this.modalEliminar = true;
    },
    async deleteItem() {
      this.modalEliminar = false;
      if (this.selectedId === null) {
        return;
      }
      try {
        this.items = this.items.filter((el: any) => el.id !== this.selectedId);
        const response = await deleteProduct(this.selectedId);
        this.selectedId = null;
        if (response.status === StatusCodes.deleted) {
          showNotify('Registro Eliminado', 'Se elimino el registro correctamente.', TypeNotification.Ok);
        } else {
          showNotify('No se pudo eliminar el registro', response.data.message, TypeNotification.Error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.getProductosApi();
      }
    },
    async getProductosApi() {
      this.isLoadingTable = true;
      const params = {
        type: this.selectedRadio,
        filter: this.search,
        page: this.currentPage,
        state: this.filterState,
      };
      try {
        const response = await getProducts(params);
        this.items = response.data.productos.data;
        this.totalRows = response.data.productos.total;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoadingTable = false;
      }
    },
    async generarPDF() {
      if (this.isLoadingPDF) {
        return;
      }
      this.isLoadingPDF = true;
      try {
        const response = await getProductsPdf();
        openPdfNewTab(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoadingPDF = false;
      }
    },
  },
  computed: {
    getPagesPagination(){
      return Math.ceil(this.totalRows/this.perPage);
    },
  },
  watch: {
    selectedRadio(newVal,oldVal) {
      this.onChangeTipoVista();      
    },
    currentPage(newVal,oldVal) {
      this.getProductosApi();
    },
  },
});
</script>


<template>
  <div>
    <v-row class="mb-0">
      <v-col cols="12">
        <h4 class="text-h5">Lista de Productos</h4>
      </v-col>
    </v-row>
    <v-card>
      <v-row no-gutters class="pb-1">
        <v-col cols="9">
          <v-row no-gutters>
            <v-col cols="2" class="pt-2" style="text-align: center">
              <v-btn
                rounded="pill"
                color="primary"
                class="mr-2"
                @click="goToCreateRoute"
              >Nuevo</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn-toggle
                rounded="0"
                color="secondary"
                variant="outlined"
              >
                <v-btn @click="modalClasificacion = !modalClasificacion">
                  Clasificación
                </v-btn>
                <v-btn>
                  Presentacion
                </v-btn>
                <v-btn>
                  Lote
                </v-btn>
              </v-btn-toggle>
            </v-col>
            <v-col cols="1" class="pt-2">
              <img
                @click="generarPDF"
                title="lista de productos"
                height="36"
                src="@/assets/pdf_icon.svg"
                :style="isLoadingPDF? 'cursor:wait':'cursor:pointer'"
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="mt-0">
        <v-col cols="3" class="ml-3">
          <v-text-field
            v-model="search"
            @keyup="searchFromInput"
            label="Buscar"
            placeholder="Escriba un nombre"
            prepend-icon="mdi-magnify"
            variant="underlined"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-radio-group inline density="compact" v-model="selectedRadio" class="d-flex justify-center pt-3">
            <v-radio
              class="px-1"
              v-for="(option, index) in optionsRadio"
              :key="index"
              :label="option.text"
              :value="option.value"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
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
                <th colspan="9">
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
                    <router-link
                      v-if="filterState"
                      :to="{ name: 'producto-edit', params: { id: encodeBase64(item.id) } }"
                    >
                      <v-icon icon="mdi-pencil" color="secondary" />
                    </router-link>
                  </td>
                  <td>
                    <v-icon
                      v-if="filterState"
                      @click="openModalEliminar(item.id)"
                      icon="mdi-trash-can-outline"
                      color="error"
                      style="cursor:pointer"
                    ></v-icon>
                  </td>
                  <td>{{ item.id }}</td>
                  <td>{{ item.nombre }}</td>
                  <td v-if="fields.some((e) => e.key === 'codigo_barra')">
                    {{ item.codigo_barra }}
                  </td>
                  <td>
                    <img
                      v-if="item.foto !== null"
                      :src="item.foto"
                      :alt="item.foto"
                      width="48"
                    >     
                  </td>
                  <td v-if="fields.some((e) => e.key === 'presentacion')">
                    {{ item.presentacion }}
                  </td>
                  <td>{{ item.empresa }}</td>
                  <td v-if="fields.some((e) => e.key === 'clasificaciones')">
                    {{ item.clasificaciones }}
                  </td>
                  <td v-if="fields.some((e) => e.key === 'stock_minimo')">
                    {{ item.stock_minimo }}
                  </td>
                  <td v-if="fields.some((e) => e.key === 'descripcion')">
                    {{ item.descripcion }}
                  </td>
                  <td v-if="fields.some((e) => e.key === 'es_controlado')">
                    {{item.es_estupefaciente || item.es_psicotropico? 'Si': 'No'}}
                  </td>
                </tr>
              </template>
              <tr v-if="items.length === 0 && isLoadingTable === false">
                <th colspan="9">
                  No hay datos
                </th>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8"></v-col>
        <v-col cols="4">
          <v-pagination
            v-model="currentPage"
            @update:model-value="getProductosApi"
            :total-visible="3"
            :length="getPagesPagination"
          ></v-pagination>
        </v-col>
      </v-row>
      <v-dialog
        v-model="modalEliminar"
        max-width="450px"
      >
        <v-card>
          <template v-slot:prepend>
            <v-icon icon="mdi-alert" color="warning"></v-icon>
          </template>
          <template v-slot:title>
            ¿Desea eliminar el registro con Id: <b>{{selectedId}}</b> ?
          </template>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" @click="modalEliminar = false">Cancelar</v-btn>
            <v-btn color="error" @click="deleteItem">Eliminar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <ModalClasificacion v-model="modalClasificacion" @onUpdate="getProductosApi"/>
    </v-card>
  </div>
</template>