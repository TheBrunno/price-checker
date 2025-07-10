import { mysqlTable, int, varchar, timestamp } from "drizzle-orm/mysql-core";
import { laptop } from "./laptop.ts";

export const check = mysqlTable('check', {
    id: int().autoincrement().primaryKey(),
    price: varchar({ length: 20 }).notNull(),
    fk_laptop: int().notNull().references(() => laptop.id),
    check_at: timestamp().defaultNow().notNull()
})