import { ProductResponse } from "@/types/response";
import axios from "axios"

const apiRoot = import.meta.env.VITE_API_ROOT;
export const readProductList:() => Promise<ProductResponse[]> = () => (
  axios.get(`${apiRoot}/product`)
  .then(response => response.data)
  .catch(console.error)
);

export const readProductDetail: (id:number) => Promise<ProductResponse> = (id) => (
  axios.get(`${apiRoot}/product/${id}`)
  .then(response => response.data)
  .catch(console.error)
);