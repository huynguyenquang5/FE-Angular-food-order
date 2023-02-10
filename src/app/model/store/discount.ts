import {Store} from "./store";

export interface Discount {
  id?: number;
  name?: string;
  discount?: number;
  store?: Store;
}
