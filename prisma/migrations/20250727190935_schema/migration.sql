/*
  Warnings:

  - The `content` column on the `Document` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `content` on the `DocumentVersion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "content",
ADD COLUMN     "content" BYTEA;

-- AlterTable
ALTER TABLE "DocumentVersion" DROP COLUMN "content";
