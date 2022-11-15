import { MainState } from "../types/MainStore.interface";

export default {
  canListarProveedores(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.proveedores) ?? false;
    return (item.listar === 1);
  },
  canCrearProveedores(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.proveedores) ?? false;
    return (item.crear === 1);
  },
  canEditarProveedores(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.proveedores) ?? false;
    return (item.editar === 1);
  },
  canEliminarProveedores(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.proveedores) ?? false;
    return (item.eliminar === 1);
  },
  canImprimirProveedores(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.proveedores) ?? false;
    return (item.imprimir === 1);
  },
};
