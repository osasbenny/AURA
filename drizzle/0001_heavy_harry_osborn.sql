CREATE TABLE `campaigns` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(96) NOT NULL,
	`creatorId` int NOT NULL,
	`title` varchar(160) NOT NULL,
	`story` text NOT NULL,
	`category` varchar(64) NOT NULL,
	`beneficiaryName` varchar(160) NOT NULL,
	`relationship` varchar(120) NOT NULL,
	`goalAmountMinor` bigint NOT NULL,
	`raisedAmountMinor` bigint NOT NULL DEFAULT 0,
	`currency` varchar(3) NOT NULL DEFAULT 'NGN',
	`status` enum('DRAFT','SUBMITTED','VERIFICATION_PENDING','UNDER_REVIEW','APPROVED','PUBLISHED','SUSPENDED','COMPLETED','CANCELLED','REJECTED') NOT NULL DEFAULT 'DRAFT',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `campaigns_id` PRIMARY KEY(`id`),
	CONSTRAINT `campaigns_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE INDEX `campaigns_creator_idx` ON `campaigns` (`creatorId`);--> statement-breakpoint
CREATE INDEX `campaigns_status_idx` ON `campaigns` (`status`);