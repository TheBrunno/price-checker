CREATE TABLE `check` (
	`id` int AUTO_INCREMENT NOT NULL,
	`price` varchar(20) NOT NULL,
	`fk_laptop` int NOT NULL,
	`check_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `check_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `laptop_seller` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fk_laptop` int NOT NULL,
	`fk_seller` int NOT NULL,
	CONSTRAINT `laptop_seller_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `laptop` (
	`id` int AUTO_INCREMENT NOT NULL,
	`link` varchar(500) NOT NULL,
	`model` varchar(500) NOT NULL,
	`processor` varchar(20) NOT NULL,
	`ram` int NOT NULL,
	CONSTRAINT `laptop_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `seller` (
	`id` int AUTO_INCREMENT NOT NULL,
	`seller` varchar(100) NOT NULL,
	`product_tag_price` varchar(10) NOT NULL,
	`product_class_price` varchar(500) NOT NULL,
	CONSTRAINT `seller_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `check` ADD CONSTRAINT `check_fk_laptop_laptop_id_fk` FOREIGN KEY (`fk_laptop`) REFERENCES `laptop`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `laptop_seller` ADD CONSTRAINT `laptop_seller_fk_laptop_laptop_id_fk` FOREIGN KEY (`fk_laptop`) REFERENCES `laptop`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `laptop_seller` ADD CONSTRAINT `laptop_seller_fk_seller_seller_id_fk` FOREIGN KEY (`fk_seller`) REFERENCES `seller`(`id`) ON DELETE no action ON UPDATE no action;