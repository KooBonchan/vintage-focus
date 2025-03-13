export interface ReviewResponse {
  id: number; // Long in Java becomes number in TypeScript
  productId: number;
  memberId: number;
  writer: string; // Unlike BoardDTO, this is a String, so kept as string

  title: string;
  content: string;
  images: string[]; // List<String> becomes string array
  writeDate: string; // LocalDate typically serializes to ISO string (e.g., "2025-02-24")
  updateDate: string; // Same assumption as writeDate

  secured: boolean; // Boolean maps to boolean
}