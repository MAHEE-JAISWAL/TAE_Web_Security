import { Request } from "express";
import { IUser } from "./user.interface";

export interface DataStoredInToken {
  id: number;
  userId: number;
}

export interface TokenData {
  token: string;
  expiresIn: string;
}

export interface RequestWithUser extends Request {
  user: IUser;
}
