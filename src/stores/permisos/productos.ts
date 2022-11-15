import { MainState } from "../types/MainStore.interface";

export default {
  canListarProductos(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.productos) ?? false;
    return (item.listar === 1);
  },
  canCrearProductos(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.productos) ?? false;
    return (item.crear === 1);
  },
  canEditarProductos(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.productos) ?? false;
    return (item.editar === 1);
  },
  canEliminarProductos(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.productos) ?? false;
    return (item.eliminar === 1);
  },
  canImprimirProductos(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.productos) ?? false;
    return (item.imprimir === 1);
  },
};
