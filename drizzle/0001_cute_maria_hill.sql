CREATE TABLE `vendors` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`vendor_id` text NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`rating` integer NOT NULL,
	`description` text NOT NULL,
	`image_id` text NOT NULL,
	`image_url` text NOT NULL,
	`image_hint` text NOT NULL,
	`image_description` text NOT NULL,
	`created_at` text DEFAULT '2025-11-25T05:05:14.194Z' NOT NULL,
	`updated_at` text DEFAULT '2025-11-25T05:05:14.194Z' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `vendors_vendor_id_unique` ON `vendors` (`vendor_id`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_blogs` (
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
	`created_at` text DEFAULT '2025-11-25T05:05:14.193Z' NOT NULL,
	`updated_at` text DEFAULT '2025-11-25T05:05:14.194Z' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_blogs`("id", "slug", "title", "category", "excerpt", "content", "author", "date", "image_id", "image_url", "image_hint", "image_description", "featured", "created_at", "updated_at") SELECT "id", "slug", "title", "category", "excerpt", "content", "author", "date", "image_id", "image_url", "image_hint", "image_description", "featured", "created_at", "updated_at" FROM `blogs`;--> statement-breakpoint
DROP TABLE `blogs`;--> statement-breakpoint
ALTER TABLE `__new_blogs` RENAME TO `blogs`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `blogs_slug_unique` ON `blogs` (`slug`);