CREATE TABLE `blogs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`excerpt` text NOT NULL,
	`content` text NOT NULL,
	`author` text NOT NULL,
	`date` text NOT NULL,
	`image_id` text NOT NULL,
	`image_url` text NOT NULL,
	`image_hint` text NOT NULL,
	`image_description` text NOT NULL,
	`featured` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT '2025-11-25T04:46:49.792Z' NOT NULL,
	`updated_at` text DEFAULT '2025-11-25T04:46:49.792Z' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blogs_slug_unique` ON `blogs` (`slug`);