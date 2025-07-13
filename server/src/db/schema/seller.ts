import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";

export const seller = mysqlTable('seller', {
    id: int().autoincrement().primaryKey(),
    seller: varchar({ length: 100 }).notNull(),
    product_tag_price: varchar({ length: 10 }).notNull(),
    product_html_attribute_price: varchar({ length: 500 }).notNull(),
    product_html_attribute_value_price: varchar({ length: 500 }).notNull(),
    captcha_page_identifier: varchar({ length: 500 }).notNull(),
})