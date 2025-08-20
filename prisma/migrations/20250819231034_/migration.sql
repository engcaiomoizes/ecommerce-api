/*
  Warnings:

  - You are about to alter the column `price` on the `Produtos` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(65,30)`.
  - You are about to alter the column `priceWithDiscount` on the `Produtos` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(65,30)`.
  - You are about to alter the column `oldPrice` on the `Produtos` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "public"."Produtos" ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "priceWithDiscount" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "oldPrice" SET DATA TYPE DECIMAL(65,30);
