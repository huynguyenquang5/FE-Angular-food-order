import {User} from "../user/user";

export interface Store {
  id?: number;
  nameStore?: string;
  phoneStore?: string;
  addressStore?: string;
  logo?: string;
  description?: string;
  wallet?: number;
  user?: User;
}
