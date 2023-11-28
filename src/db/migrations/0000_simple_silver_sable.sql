CREATE TABLE `locations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text,
	`latitude` real,
	`longitude` real,
	`altitude` real,
	`battery_state` text,
	`device_id` text,
	`horizontal_accuracy` real,
	`speed` real,
	`unique_id` text,
	`vertical_accuracy` real,
	`wifi` text
);
--> statement-breakpoint
CREATE TABLE `motions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`location_id` integer,
	`type` text
);
--> statement-breakpoint
CREATE TABLE `properties` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`location_id` integer,
	`key` text,
	`value` text
);
