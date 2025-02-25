import { ProductResponse } from './productResponse';

export type CartProductResponse = {
  product: ProductResponse; // Nested ProductDTO
  quantity: number; // Integer maps to number
  price: number;
  subtotal: number;
};

export type CartResponse = {
  id: string; // UUID typically serializes to string (e.g., "123e4567-e89b-12d3-a456-426614174000")
  memberId: number; // Long maps to number

  sumProduct: number; // Integer maps to number
  deliveryFee: number;
  totalPrice: number;
  expireDate: string; // Assuming a date string (e.g., "2025-02-24" or custom format)

  products: CartProductResponse[]; // List<CartProductDTO> becomes array
};