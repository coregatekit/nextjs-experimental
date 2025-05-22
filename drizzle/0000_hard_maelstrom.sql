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
CREATE TABLE `jobs` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`weapon` text NOT NULL,
	`description` text NOT NULL,
	`hp` integer NOT NULL,
	`mp` integer NOT NULL,
	`attack` integer NOT NULL,
	`defense` integer NOT NULL,
	`magic` integer NOT NULL,
	`magic_defense` integer NOT NULL,
	`evasion` integer NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`updated_at` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`sex` text DEFAULT 'Prefer Not To Say' NOT NULL,
	`email` text NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`updated_at` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);