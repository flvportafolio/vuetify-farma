import { MainState } from "../types/MainStore.interface";

export default {
  canListarInventario(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.inventario) ?? false;
    return (item.listar === 1);
  },
  canCrearInventario(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.inventario) ?? false;
    return (item.crear === 1);
  },
  canEditarInventario(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.inventario) ?? false;
    return (item.editar === 1);
  },
  canEliminarInventario(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.inventario) ?? false;
    return (item.eliminar === 1);
  },
  canImprimirInventario(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.inventario) ?? false;
    return (item.imprimir === 1);
  },
};
