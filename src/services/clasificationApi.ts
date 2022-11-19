import axios from '@/axiosConfig';

export function getClasifications(params: unknown) {
  return axios.get('clasificaciones', { params });
}

export function createClasification(payload: unknown) {
  return axios.post('clasificaciones', payload);
}

export function updateClasification(id: string, payload: unknown) {
  return axios.put(`clasificaciones/${id}`, payload);
}

export function deleteClasification(id: string) {
  return axios.delete(`clasificaciones/${id}`);
}