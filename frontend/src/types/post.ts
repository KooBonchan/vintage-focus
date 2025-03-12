export interface Author {
    name: string;
    avatar?: string;
  }
  
  export interface RentalInfo {
    rentalLocation: string;
    startDate: string; // ISO 형식의 날짜 또는 null
    startTime: string; // ISO 형식의 시간 또는 null
  }
  
  export interface Post {
    id: number;
    title: string;
    content: string;
    date: string;
    views: number;
    author: { name: string; avatar?: string };
    tag: string;
    locked: boolean;
    password?: string;
    images: string[]; // Array of Base64 strings
    contact: string;
    accountHolder: string;
    bankName: string;
    accountNumber: string;
  }