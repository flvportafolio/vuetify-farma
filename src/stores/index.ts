import { MainState, User, slugModulos } from "./types/MainStore.interface";
import { defineStore } from 'pinia';
import { StatusCodes } from '../utils/statusCodes';
import axios from '../axiosConfig';
import gettersUsuarios from './permisos/usuarios';
import gettersProductos from './permisos/productos';
import gettersProveedores from './permisos/proveedores';
import gettersPedidos from './permisos/pedidos';
import gettersReportes from './permisos/reportes';
import gettersInventario from './permisos/inventario';




// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useMainStore = defineStore('main', {
  state(): MainState {
    return {
      // all these properties will have their type inferred automatically
      token: localStorage.getItem('token') || '',
      user: null,
      permisos: [],
      slugModulos: null,
      navigationTitle: '',
    }
  },
  getters: {
    /* loggedIn(state) {
      return !!state.token;
    }, */
    ...gettersUsuarios,
    ...gettersProductos,
    ...gettersProveedores,
    ...gettersPedidos,
    ...gettersReportes,
    ...gettersInventario,
  },
  actions: {
    setUserData(data: User) {
      this.user = data;
    },
    setPermisos(data: Array<any>) {
      this.permisos = data;
    },
    setSlugModulos(data: slugModulos) {
      this.slugModulos = data;
    },
    setNavigationTitle(data: string) {
      this.navigationTitle = data;
    },

    logout() {      
      this.clearToken();
    },
    clearToken() {
      localStorage.removeItem('token');
      window.location.reload();
    },
    async getPrivilegiosAPI() {
      try {
        const response = await axios.get('privilegios');
        this.setUserData(response.data.usuario);
        this.setPermisos(response.data.permisos);
        this.setSlugModulos(response.data.slug_modulos);
      } catch (error: any) {
        if (error.response.status === StatusCodes.unAuthorized) {
          this.logout();
        }
      }
    },

  },
})