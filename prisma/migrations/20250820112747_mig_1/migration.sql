/*
  Warnings:

  - The `priceWithDiscount` column on the `Produtos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `oldPrice` column on the `Produtos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `price` on the `Produtos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Produtos" DROP COLUMN "price",
ADD COLUMN     "price" MONEY NOT NULL,
DROP COLUMN "priceWithDiscount",
ADD COLUMN     "priceWithDiscount" MONEY,
DROP COLUMN "oldPrice",
ADD COLUMN     "oldPrice" MONEY;
