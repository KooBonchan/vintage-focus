import useAuthStore from "@/stores/authStore"
import axios from "axios"

export const setupAxiosInterceptors = () => {

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