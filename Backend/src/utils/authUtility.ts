import { JWT_EXPIRY, JWT_SECRET, SALT, SECURE_COOKIE } from "@/config";
import { DataStoredInToken, TokenData } from "@/interface/auth.interface";
import { IUser } from "@/interface/user.interface";
import { sign } from 'jsonwebtoken';
import { scryptSync } from 'node:crypto'

export const hashPassword = (password: string) => {
  // generate salt value
  // const salt = randomBytes(16).toString('hex');

  const hash = scryptSync(password, SALT, 32).toString("hex");
  return { hash };
};

// Verify password
export function verifyPassword(password: string, originalHash: string) {
  // const salt = crypto.randomBytes(16).toString('hex');
  // const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  const hash = hashPassword(password).hash;
  return hash === originalHash;
}
export const createToken = (user: IUser): TokenData => {
  const datInToken: DataStoredInToken = {
    id: user.userId,
    userId: user.userId,
  };
  const secretKey: string = JWT_SECRET;
  const expiresIn: string = JWT_EXPIRY;

  return {
    expiresIn,
    token: sign({ ...datInToken }, secretKey, { expiresIn }),
  };
};
  