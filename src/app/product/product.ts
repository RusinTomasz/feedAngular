export interface Product {
  id: string | null;
  title: string | null;
  description: string | null;
  productLink: string | null;
  imageLink: string | null;
  price: string | null;
}

export interface ProductApiResponse {
  count: number;
  rows: Product[];
  nextPage?: { page: number; limit: number };
  prevPage?: { page: number; limit: number };
}
