/*
  Warnings:

  - You are about to drop the column `firebaseToken` on the `createuser` table. All the data in the column will be lost.
  - You are about to drop the column `verificationCode` on the `createuser` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Createuser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Createuser` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Createuser_phone_key` ON `createuser`;

-- AlterTable
ALTER TABLE `createuser` DROP COLUMN `firebaseToken`,
    DROP COLUMN `verificationCode`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Createuser_email_key` ON `Createuser`(`email`);
