export interface Game {
  _id: string;
  name: string;
  type: string;
  description: string;
  platform: string;
  languages: string;
  price: number;
  generalRating: number;
  reviews: [string];
  imageUrl: string;
  otherImages?: [String];
  videoLink?: string;
}
