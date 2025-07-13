ALTER TABLE `seller` ADD `product_html_attribute_price` varchar(500) NOT NULL;--> statement-breakpoint
ALTER TABLE `seller` ADD `product_html_attribute_value_price` varchar(500) NOT NULL;--> statement-breakpoint
ALTER TABLE `seller` DROP COLUMN `product_class_price`;