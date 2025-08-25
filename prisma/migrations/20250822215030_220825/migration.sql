/*
  Warnings:

  - Added the required column `thumbnail` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."products" ADD COLUMN     "ratingCount" SMALLINT NOT NULL DEFAULT 0,
ADD COLUMN     "thumbnail" TEXT NOT NULL;
