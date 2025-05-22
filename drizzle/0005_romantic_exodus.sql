CREATE TABLE `classes` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`class_level` integer NOT NULL,
	`required_honor` integer NOT NULL,
	`description` text NOT NULL,
	`hp` integer NOT NULL,
	`mp` integer NOT NULL,
	`attack` integer NOT NULL,
	`defense` integer NOT NULL,
	`magic` integer NOT NULL,
	`magic_defense` integer NOT NULL,
	`evasion` integer NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`updated_at` text DEFAULT (current_timestamp) NOT NULL,
	`job_id` text NOT NULL,
	FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
DROP TABLE `honor_classes`;