export interface IProduct {
  name: string;
  category: string;
  brand?: string;
  images?: string[];
  image: string;
  price: string;
  _id: string;
  key?: string;
  from?: string;
  quantity?: number;
}
