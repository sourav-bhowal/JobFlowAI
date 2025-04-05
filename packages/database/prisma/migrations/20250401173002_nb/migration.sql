/*
  Warnings:

  - You are about to drop the `blacklisted_tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL;

-- DropTable
DROP TABLE "blacklisted_tokens";
