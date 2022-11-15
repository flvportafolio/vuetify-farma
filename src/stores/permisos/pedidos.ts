import { MainState } from "../types/MainStore.interface";

export default {
  canListarPedidos(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.pedidos) ?? false;
    return (item.listar === 1);
  },
  canCrearPedidos(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.pedidos) ?? false;
    return (item.crear === 1);
  },
  canEditarPedidos(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.pedidos) ?? false;
    return (item.editar === 1);
  },
  canEliminarPedidos(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.pedidos) ?? false;
    return (item.eliminar === 1);
  },
  canImprimirPedidos(state: MainState) {
    const item = state.permisos.find((el) => el.modulo === state.slugModulos.pedidos) ?? false;
    return (item.imprimir === 1);
  },
};
