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
    price: string;
    content: string;
    author: Author;
    rental?: RentalInfo;
    locked: boolean;
    password?: string;
    tag: string;
    date:string;
    views:number;
  }
  