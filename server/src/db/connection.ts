import { drizzle } from "drizzle-orm/mysql2";
import { env } from "../env.ts";

export const db = drizzle(env.DATABASE_URL);
