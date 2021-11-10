import { User } from "./user.interface";

export class Session {
  public token!: string;
  public user!: User;
}