/*
  Warnings:

  - You are about to drop the column `categoty` on the `bags` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `bags` table. All the data in the column will be lost.
  - Made the column `username` on table `bags` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `bags` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `bags` required. This step will fail if there are existing NULL values in that column.
  - Made the column `brand` on table `bags` required. This step will fail if there are existing NULL values in that column.
  - Made the column `size` on table `bags` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color` on table `bags` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quantity` on table `bags` required. This step will fail if there are existing NULL values in that column.
  - Made the column `features` on table `bags` required. This step will fail if there are existing NULL values in that column.
  - Made the column `manufacturedBy` on table `bags` required. This step will fail if there are existing NULL values in that column.
  - Made the column `materialCare` on table `bags` required. This step will fail if there are existing NULL values in that column.
  - Made the column `terms` on table `bags` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `bags` DROP COLUMN `categoty`,
    DROP COLUMN `image`,
    MODIFY `username` VARCHAR(255) NOT NULL,
    MODIFY `title` VARCHAR(255) NOT NULL,
    MODIFY `price` VARCHAR(50) NOT NULL,
    MODIFY `brand` VARCHAR(255) NOT NULL,
    MODIFY `size` VARCHAR(50) NOT NULL,
    MODIFY `color` VARCHAR(50) NOT NULL,
    MODIFY `quantity` VARCHAR(50) NOT NULL,
    MODIFY `features` TEXT NOT NULL,
    MODIFY `manufacturedBy` VARCHAR(255) NOT NULL,
    MODIFY `materialCare` TEXT NOT NULL,
    MODIFY `terms` TEXT NOT NULL;
