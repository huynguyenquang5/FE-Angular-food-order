import {User} from "../user/user";
import {Store} from "../store/store";
import {Delivery} from "../store/delivery";

export interface Payment {
  id?: number;
  user?: User;
  store?: Store;
  date?: string;
  price?: number;
  delivery?: Delivery;
  status?: number;
}
