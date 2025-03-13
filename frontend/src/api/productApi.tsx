import { ProductResponse } from "@/types/response";
import axios from "axios"

const apiRoot = import.meta.env.VITE_API_ROOT;
export const readProductList= (limit = 200) => (
  axios.get(`${apiRoot}/product`, {
    params: { limit }, // Add the limit query parameter
  })
  .then(response => response.data)
  .catch(error => {
    console.log(error);
    return [];
  })
);

export const readProductDetail: (id:number) => Promise<ProductResponse> = (id) => (
  axios.get(`${apiRoot}/product/${id}`)
  .then(response => response.data)
  .catch(console.error)
);