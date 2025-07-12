import { mysqlTable, int, timestamp, float } from "drizzle-orm/mysql-core";
import { laptop } from "./laptop.ts";

export const check = mysqlTable('check', {
    id: int().autoincrement().primaryKey(),
    price: float(),
    fk_laptop: int().notNull().references(() => laptop.id),
    check_at: timestamp().defaultNow().notNull()
})