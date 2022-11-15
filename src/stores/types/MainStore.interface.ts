export interface User {
  nombre_usuario: string;
}

export interface slugModulos {
  inventario: string,
  pedidos: string,
  productos: string,
  proveedores: string,
  reportes: string,
  usuarios: string,
}

export type MainState = {
  token:        string;
  user:         null | User;
  permisos:     Array<any>;
  slugModulos:  any;
  navigationTitle: string;
}