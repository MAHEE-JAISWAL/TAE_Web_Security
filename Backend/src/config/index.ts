import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` })

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { PORT, NODE_ENV } = process.env;
export const { DB_USER, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_PORT, DB_SYNC } = process.env;
export const { JWT_EXPIRY, JWT_SECRET, SALT, SECURE_COOKIE } = process.env;