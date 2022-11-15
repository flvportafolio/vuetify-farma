import axios, { AxiosInstance } from 'axios';
import showNotify, { TypeNotification } from '@/utils/notifications';
import { StatusCodes } from '@/utils/statusCodes';
import { useMainStore } from '@/stores/index';

const axiosConfig: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === StatusCodes.unAuthorized) {
      const store = useMainStore();
      store.logout();
    }
    if (error.response.status === StatusCodes.forbidden) {
      showNotify('por favor recarga la página', 'No tienes privilegios para realizar esa acción.', TypeNotification.Error);
    }
    return Promise.reject(error);
  },
);
export default axiosConfig;