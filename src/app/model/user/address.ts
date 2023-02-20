import {User} from "./user";

export interface Address {
  id: number;
  name: string;
  user: User;
}
