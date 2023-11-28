CREATE TABLE `locations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`latitude` real NOT NULL,
	`longitude` real NOT NULL,
	`created_at` text NOT NULL,
	`altitude` integer NOT NULL,
	`speed` integer NOT NULL,
	`horizontal_accuracy` integer NOT NULL,
	`vertical_accuracy` integer NOT NULL,
	`battery_state` text NOT NULL,
	`battery_level` real NOT NULL,
	`wifi` text NOT NULL,
	`device_id` text NOT NULL,
	`unique_id` text
);
--> statement-breakpoint
CREATE TABLE `motions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`location_id` integer,
	`type` text
);
--> statement-breakpoint
CREATE TABLE `tracking_stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`location_id` integer,
	`pauses` integer,
	`activity` text,
	`desired_accuracy` integer,
	`deferred` integer,
	`significant_change` text,
	`locations_in_payload` integer
);
