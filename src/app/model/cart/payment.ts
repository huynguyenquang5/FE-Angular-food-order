import {User} from "../user/user";
import {Store} from "../store/store";
import {Delivery} from "../store/delivery";
import {Address} from "../user/address";

export interface Payment {
  id: number;
  user: User;
  store: Store;
  date: string;
  code: string;
  price: number;
  delivery: Delivery;
  address:Address;
  status: number;
}
