import {Category} from "./category";

export interface ProductMethod {
  id: number
  price: number
  quantity: number
  description: string
  category: Category
}
