import axios from '@/axiosConfig';

export function getUsers(params: unknown) {
  return axios.get('usuarios', { params });
}

export function getUser(id: string) {
  return axios.get(`usuarios/${id}/edit`);
}

export function updateUser(id: string, payload: unknown) {
  return axios.put(`usuarios/${id}`, payload);
}

export function getCreateReferences() {
  return axios.get('usuarios/create');
}

export function createUser(payload: unknown) {
  return axios.post('register', payload);
}

export function deleteUser(id: string) {
  return axios.delete(`usuarios/${id}`);
}

export function getUsersPdf() {
  return axios.get('usuarios/print', { responseType: 'blob' });
}