export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  cart?: string[];
  orders?: string[];
  reviews?: string[];
}
