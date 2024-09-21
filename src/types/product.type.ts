export const categories = [
  "Kitchen",
  "Home Decor",
  "Stationery",
  "Jewelry",
] as const;
export const brands = [
  "CraftyHands",
  "WeaveWonders",
  "ArtisanClay",
  "LeatherCraft",
  "NatureJewels",
] as const;

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  category: (typeof categories)[number];
  brand: (typeof brands)[number];
  price: number;
  quantity?: number;
  images: string[];
  reviews?: object;
  visitors: number;
  from?: string;
}
