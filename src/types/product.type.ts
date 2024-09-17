export interface IProduct {
  _id: string | number;
  name: string;
  image: string;
  category: string;
  price: number | string;
  key?: string | number;
}
