import useAuthStore from "@/stores/authStore"
import axios from "axios"

export const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const accessToken = useAuthStore.getState().accessToken;
      if(accessToken){
        config.headers['Authorization'] = accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if(error.response?.status === 401){
        useAuthStore.getState().clearAuth();
        window.location.href = '/';
      }
      return Promise.reject(error);
    }
  )
}

setupAxiosInterceptors();
export default axios;