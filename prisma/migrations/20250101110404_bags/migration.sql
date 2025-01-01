-- CreateTable
CREATE TABLE `bags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NULL,
    `title` VARCHAR(191) NULL,
    `price` VARCHAR(191) NULL,
    `brand` VARCHAR(191) NULL,
    `size` VARCHAR(191) NULL,
    `color` VARCHAR(191) NULL,
    `quantity` VARCHAR(191) NULL,
    `features` VARCHAR(191) NULL,
    `manufacturedBy` VARCHAR(191) NULL,
    `materialCare` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `terms` VARCHAR(191) NULL,
    `categoty` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
