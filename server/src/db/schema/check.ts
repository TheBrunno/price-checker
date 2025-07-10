import { mysqlTable, int, varchar, timestamp } from "drizzle-orm/mysql-core";
import { laptop } from "./laptop.ts";

export const check = mysqlTable('check', {
    id: int().autoincrement().primaryKey(),
    price: varchar({ length: 20 }).notNull(),
    fkLaptop: int().notNull().references(() => laptop.id),
    checkAt: timestamp().defaultNow().notNull()
})