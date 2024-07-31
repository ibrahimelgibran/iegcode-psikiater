/*
  Warnings:

  - You are about to drop the column `iamge` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "iamge",
ADD COLUMN     "imageUrl" TEXT DEFAULT '';
