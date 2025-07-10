import { mysqlTable, int } from "drizzle-orm/mysql-core";
import { laptop } from "./laptop.ts";
import { seller } from "./seller.ts";

export const laptop_seller = mysqlTable('laptop_seller', {
    id: int().autoincrement().primaryKey(),
    fk_laptop: int().notNull().references(() => laptop.id),
    fk_seller: int().notNull().references(() => seller.id)
})