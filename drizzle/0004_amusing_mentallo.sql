ALTER TABLE `honor_classes` ADD `updated_at` text DEFAULT (current_timestamp) NOT NULL;--> statement-breakpoint
ALTER TABLE `jobs` ADD `updated_at` text DEFAULT (current_timestamp) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `updated_at` text DEFAULT (current_timestamp) NOT NULL;