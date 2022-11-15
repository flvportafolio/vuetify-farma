import { NavigationGuardNext } from "vue-router";

const enum ACCIONES {
  listar = 'listar',
  crear = 'crear',
  editar = 'editar',
  eliminar = 'eliminar',
  imprimir = 'imprimir',
}

function redirectIfHavePermissions(tienePermisos: boolean, next: NavigationGuardNext) {
  if (tienePermisos) {
    next();
  } else {
    next({ name: 'unauthorized' });
  }
}

export {
  ACCIONES,
  redirectIfHavePermissions,
};
