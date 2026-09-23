CREATE TABLE `whatsapp_conversations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`waId` varchar(32) NOT NULL,
	`displayName` varchar(160),
	`state` enum('IDLE','COLLECTING_CAMPAIGN','AWAITING_REVIEW','HUMAN_HANDOFF') NOT NULL DEFAULT 'IDLE',
	`stateData` text,
	`lastMessageAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `whatsapp_conversations_id` PRIMARY KEY(`id`),
	CONSTRAINT `whatsapp_conversations_waId_unique` UNIQUE(`waId`)
);
--> statement-breakpoint
CREATE TABLE `whatsapp_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`eventId` varchar(191) NOT NULL,
	`phoneNumberId` varchar(64),
	`payload` text NOT NULL,
	`receivedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `whatsapp_events_id` PRIMARY KEY(`id`),
	CONSTRAINT `whatsapp_events_eventId_unique` UNIQUE(`eventId`)
);
--> statement-breakpoint
CREATE TABLE `whatsapp_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`messageId` varchar(191) NOT NULL,
	`waId` varchar(32) NOT NULL,
	`direction` enum('INBOUND','OUTBOUND') NOT NULL,
	`messageType` varchar(32) NOT NULL,
	`body` text,
	`payload` text NOT NULL,
	`receivedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `whatsapp_messages_id` PRIMARY KEY(`id`),
	CONSTRAINT `whatsapp_messages_messageId_unique` UNIQUE(`messageId`)
);
--> statement-breakpoint
CREATE INDEX `whatsapp_conversations_updated_idx` ON `whatsapp_conversations` (`updatedAt`);--> statement-breakpoint
CREATE INDEX `whatsapp_events_received_idx` ON `whatsapp_events` (`receivedAt`);--> statement-breakpoint
CREATE INDEX `whatsapp_messages_wa_idx` ON `whatsapp_messages` (`waId`,`receivedAt`);