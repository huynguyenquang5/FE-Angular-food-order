import {User} from "../user/user";
import {Product} from "../product/product";

export interface Cart {
  id?: number;
  quantity?: number;
  user?: User;
  product?: Product;
}
