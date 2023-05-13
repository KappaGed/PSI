import { Game } from "./game";

export interface User {
  _id: string;
  username: string;
  password: string;
  profilePicture?: string;
  cart: Game[];
}
