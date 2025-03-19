// response.ts

export interface ProductResponse {
  id: number; // Long in Java becomes number in TypeScript (JavaScript doesn’t have a direct Long equivalent)

  // 상품명 (Product Info)
  code: string;
  modelName?: string;
  productName: string;

  // 상품분류 (Product Classification)
  company?: string;
  country?: string;
  category?: string;
  category1?: string;
  category2?: string;
  category3?: string;


  // 상품상세 (Product Details)
  condition?: 'POOR' | 'FAIR' | 'GOOD' | 'EXCELLENT' | 'MINT';
  stock?: number; // Integer in Java, -1 indicates "not applicable"
  consumerPrice?: number;
  sellingPrice: number;
  rentalPrice?: number;
  productImages?: string[]; // List<String> becomes string array
  detailImages?: string[]; // List<String> becomes string array

  reviewCount?: number;
  likeCount?: number;
  viewCount?: number;
}