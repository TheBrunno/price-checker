import { mysqlTable, int } from "drizzle-orm/mysql-core";
import { laptop } from "./laptop.ts";
import { seller } from "./seller.ts";

export const laptop_seller = mysqlTable('laptop_seller', {
    id: int().autoincrement().primaryKey(),
    fkLaptop: int().notNull().references(() => laptop.id),
    fkSeller: int().notNull().references(() => seller.id)
})