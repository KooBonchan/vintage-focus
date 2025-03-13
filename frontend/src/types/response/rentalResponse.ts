import { MemberResponse } from './memberResponse';
import { ProductResponse } from './productResponse';

export interface RentalResponse {
  member: MemberResponse; // Nested MemberDTO
  product: ProductResponse; // Nested ProductDTO

  rentalFee: number; // Integer maps to number
  totalPrice: number;
  paymentTimestamp: string; // Instant typically serializes to ISO string (e.g., "2025-02-24T10:00:00Z")
  rentalTimestamp: string;
  returnTimestamp: string;

  isDelayed: boolean;
}