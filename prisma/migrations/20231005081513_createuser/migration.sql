-- CreateTable
CREATE TABLE `Createuser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `verificationCode` INTEGER NOT NULL,
    `firebaseToken` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Createuser_username_key`(`username`),
    UNIQUE INDEX `Createuser_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;



