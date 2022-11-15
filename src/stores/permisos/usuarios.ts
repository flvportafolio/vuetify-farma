import { MainState } from "../types/MainStore.interface";

export default {
  canListarUsuarios(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.usuarios) ?? false;
    return (item.listar === 1); // si item es undefined igual devolvera false
  },
  canCrearUsuarios(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.usuarios) ?? false;
    return (item.crear === 1);
  },
  canEditarUsuarios(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.usuarios) ?? false;
    return (item.editar === 1);
  },
  canEliminarUsuarios(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.usuarios) ?? false;
    return (item.eliminar === 1);
  },
  canImprimirUsuarios(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.usuarios) ?? false;
    return (item.imprimir === 1);
  },
};
