import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";

export const laptop = mysqlTable('laptop', {
    id: int().autoincrement().primaryKey(),
    link: varchar({ length: 500 }).notNull(),
    model: varchar({ length: 500 }).notNull(),
    processor: varchar({ length: 20 }).notNull(),
    ram: int().notNull()
})