export interface IReview {
  product: string;
  user: {
    _id: string;
    email: string;
    name: string;
  };
  rating: number;
  comment: string;
  _id?: string;
}
