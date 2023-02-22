import {ProductMethod} from "./product-method";
import {Store} from "../store/store";

export interface Product {

  id: number;
  name: string;
  productMethod: ProductMethod;
  status: number;
  store: Store;

}
