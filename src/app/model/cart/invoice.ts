import {Product} from "../product/product";
import {Payment} from "./payment";

export interface Invoice {
  id: number;
  quantity: number;
  product: Product;
  payment: Payment;
}
