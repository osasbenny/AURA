ALTER TABLE `users` CHANGE COLUMN `openId` `authSubject` varchar(128) NOT NULL;
--> statement-breakpoint
ALTER TABLE `users` DROP INDEX `users_openId_unique`;
--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_authSubject_unique` UNIQUE(`authSubject`);
