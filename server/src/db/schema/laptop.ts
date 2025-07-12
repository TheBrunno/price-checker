import { mysqlTable, int, varchar, float } from "drizzle-orm/mysql-core";

export const laptop = mysqlTable('laptop', {
    id: int().autoincrement().primaryKey(),
    model: varchar({ length: 500 }).notNull(),
    processor: varchar({ length: 20 }).notNull(),
    ram: int().notNull(),
    img: varchar({ length: 500 }),
    expected_price: float().notNull()
})