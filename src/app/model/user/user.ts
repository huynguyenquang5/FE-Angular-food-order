import {Role} from "./role";

export interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  phone: string;
  email: string;
  wallet: number;
  status: number;
  role: Role;
}
