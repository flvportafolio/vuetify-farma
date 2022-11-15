import { MainState } from "../types/MainStore.interface";

export default {
  canListarReportes(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.reportes) ?? false;
    return (item.listar === 1);
  },
  canCrearReportes(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.reportes) ?? false;
    return (item.crear === 1);
  },
  canEditarReportes(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.reportes) ?? false;
    return (item.editar === 1);
  },
  canEliminarReportes(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.reportes) ?? false;
    return (item.eliminar === 1);
  },
  canImprimirReportes(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.reportes) ?? false;
    return (item.imprimir === 1);
  },
};
