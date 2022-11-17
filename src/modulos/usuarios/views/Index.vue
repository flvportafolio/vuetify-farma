<script setup lang="ts">
import { ref, reactive } from 'vue';
import { getUsers, deleteUser, getUsersPdf } from "@/services/userApi";
import { useRouter, useRoute } from 'vue-router';
import showNotify, { TypeNotification } from '@/utils/notifications';
import { StatusCodes } from '@/utils/statusCodes';
import { openPdfNewTab } from '@/utils/pdf';

const router = useRouter();
const route = useRoute();

const selectedId = ref<string|null>(null);
const walink = 'https://api.whatsapp.com/send?phone=';
const filterState = ref(true);
const search = ref('');
const isLoadingTable = ref(true);
/* const fields = reactive([]); */
const items = ref<any[]>([]);
const perPage = ref(10);
const currentPage = ref(1);
const totalRows = ref(0);
const searchTimeOut = ref<any>(null);
const isLoadingPDF = ref(false);
const modalEliminar = ref(false);

function goToCreateRoute() {
  if ( route.name !== 'usuario-create') {
    router.push({ name: 'usuario-create' });
  }
}

function openModalEliminar(id:string) {
  selectedId.value = id;
  modalEliminar.value = true;
}

async function generarPDF() {
  if (isLoadingPDF.value) {
    return;
  }
  isLoadingPDF.value = true;
  try {
    const response = await getUsersPdf();
    openPdfNewTab(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    isLoadingPDF.value = false;
  }
}

async function getUsuariosApi() {
  isLoadingTable.value = true;
  const params = {
    filter: search.value,
    page: currentPage.value,
    state: filterState.value,
  };
  try {
    const response = await getUsers(params);
    items.value = response.data.usuarios.data;
    totalRows.value = response.data.usuarios.total;
  } catch (error) {
    console.log(error);
  } finally {
    isLoadingTable.value = false;
  }
}

async function deleteItem() {
  modalEliminar.value = false;
  if (selectedId.value === null) {
    return;
  }
  try {
    items.value = items.value.filter((el) => el.usuario_id !== selectedId.value);
    const response = await deleteUser(selectedId.value);
    selectedId.value = null;
    if (response.status === StatusCodes.deleted) {
      showNotify('Registro Eliminado', 'Se elimino el registro correctamente.', TypeNotification.Ok);
    } else {
      showNotify('No se pudo eliminar el registro', response.data.message, TypeNotification.Error);
    }
  } catch (error) {
    console.log(error);
  } finally {
    getUsuariosApi();
  }
}

function encodeBase64(data: string) {
  return window.btoa(data);
}

function searchFromInput() {
  clearTimeout(searchTimeOut.value);
  searchTimeOut.value = setTimeout(getUsuariosApi, 500);
}

getUsuariosApi();
</script>

<template>
  <div>
    <v-row class="mb-0">
      <v-col cols="12">
        <h4 class="text-h5">Lista de usuarios</h4>
      </v-col>
    </v-row>
    <v-card>
      <v-row no-gutters>
        <v-col cols="9">
          <v-row no-gutters>
            <v-col cols="2" class="pt-2" style="text-align: center">
              <v-btn
                color="primary"
                class="mr-2"
                @click="goToCreateRoute"
              >Nuevo</v-btn>
            </v-col>
            <v-col cols="5">
              <v-btn-toggle
                rounded="0"
                color="secondary"
                variant="outlined"
              >
                <v-btn>
                  Cargos
                </v-btn>
                <v-btn>
                  Roles
                </v-btn>
                <v-btn>
                  Permisos
                </v-btn>
              </v-btn-toggle>
            </v-col>
            <v-col cols="1" class="pt-2">
              <img
                @click="generarPDF"
                title="lista de usuarios"
                height="36"
                src="@/assets/pdf_icon.svg"
                :style="isLoadingPDF? 'cursor:wait':'cursor:pointer'"
              >
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="1"></v-col>
        <v-col cols="2">
          <v-switch
            v-model="filterState"
            @update:modelValue="getUsuariosApi"
            :label="filterState? 'Activos' : 'Inactivos'"
            color="primary"
            hide-details
          ></v-switch>
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
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-table>
            <thead>
              <tr>
                <th width="3%"></th>
                <th width="3%"></th>
                <th width="5%">
                  Id
                </th>
                <th width="20%">
                  Nombre Completo
                </th>
                <th width="19%">
                  Cargo
                </th>
                <th width="19%">
                  Rol
                </th>
                <th width="10%">
                  Teléfono
                </th>
                <th width="21%">
                  Correo
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoadingTable">
                <th colspan="8">
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
                  :key="item.usuario_id"
                >
                  <td>
                    <router-link
                      v-if="filterState"
                      style="text-decoration: none;"
                      :to="{ name: 'usuario-edit', params: { id: encodeBase64(item.usuario_id) } }"
                    >
                      <v-icon icon="mdi-pencil" color="secondary"></v-icon>
                    </router-link>
                  </td>
                  <td>
                    <v-icon
                      v-if="filterState"
                      @click="openModalEliminar(item.usuario_id)"
                      icon="mdi-trash-can-outline"
                      color="error"
                      style="cursor:pointer"
                    ></v-icon>
                  </td>
                  <td>{{ item.usuario_id }}</td>
                  <td>{{ item.full_name }}</td>
                  <td>{{ item.cargo }}</td>
                  <td>{{ item.rol }}</td>
                  <td>
                    <a
                      :href="walink+item.prefijo_llamada+item.telefono"
                      target="_blank"
                    >{{item.telefono}}</a>
                  </td>
                  <td>{{ item.correo }}</td>
                </tr>
              </template>
              <tr v-if="items.length === 0 && isLoadingTable === false">
                <th colspan="8">
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
            @update:model-value="getUsuariosApi"
            :total-visible="3"
            :length="Math.ceil(totalRows/perPage)"
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
    </v-card>
  </div>
</template>