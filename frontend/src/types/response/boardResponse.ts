export type BoardResponse = {
  id: number; // Long in Java becomes number in TypeScript
  memberId: number;
  writer: number; // Assuming writer is a member ID or similar numeric identifier

  title: string;
  content: string;
  category: string;
  writeDate: string; // LocalDate typically serializes to ISO string (e.g., "2025-02-24")
  updateDate: string; // Same assumption as writeDate

  secured: boolean; // Boolean in Java maps directly to boolean in TypeScript
};