CREATE TABLE `jobs` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`weapon` text NOT NULL,
	`description` text NOT NULL,
	`hp` integer NOT NULL,
	`mp` integer NOT NULL,
	`attack` integer NOT NULL,
	`defense` integer NOT NULL,
	`evasion` integer NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL
);
