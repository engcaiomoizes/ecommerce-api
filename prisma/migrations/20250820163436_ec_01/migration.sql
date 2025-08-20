/*
  Warnings:

  - You are about to drop the `Clientes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Enderecos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Produtos` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('M', 'F');

-- CreateEnum
CREATE TYPE "public"."Type" AS ENUM ('F', 'J');

-- CreateEnum
CREATE TYPE "public"."Size" AS ENUM ('original', 'p', 'm', 'g', 'gg');

-- CreateEnum
CREATE TYPE "public"."PaymentMethod" AS ENUM ('PIX', 'BOLETO', 'CARTAO', 'CARTAO_PARCELADO', 'PAYPAL', 'OUTROS');

-- DropTable
DROP TABLE "public"."Clientes";

-- DropTable
DROP TABLE "public"."Enderecos";

-- DropTable
DROP TABLE "public"."Produtos";

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "celphone" VARCHAR(15) NOT NULL,
    "gender" "public"."Gender" NOT NULL,
    "birth" VARCHAR(10) NOT NULL,
    "type" "public"."Type" NOT NULL,
    "credit" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "receiveNewsletter" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Address" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "main" BOOLEAN NOT NULL DEFAULT false,
    "identification" VARCHAR(50) NOT NULL,
    "zipCode" VARCHAR(10) NOT NULL,
    "street" VARCHAR(100) NOT NULL,
    "number" VARCHAR(10),
    "complement" VARCHAR(50),
    "district" VARCHAR(50) NOT NULL,
    "reference" VARCHAR(100),
    "city" VARCHAR(50) NOT NULL,
    "state" CHAR(2) NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" MONEY NOT NULL,
    "priceWithDiscount" MONEY,
    "oldPrice" MONEY,
    "discountPercentage" SMALLINT,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" SERIAL NOT NULL,
    "parentId" INTEGER,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product_Image" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "size" "public"."Size" NOT NULL,
    "url" TEXT NOT NULL,
    "position" SMALLINT NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Product_Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP NOT NULL,
    "status" SMALLINT NOT NULL,
    "statusDescription" VARCHAR(30) NOT NULL,
    "totalValue" DECIMAL(65,30) NOT NULL,
    "deliveryTime" TIMESTAMP NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order_Product" (
    "id" SERIAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "quantity" SMALLINT NOT NULL DEFAULT 1,

    CONSTRAINT "Order_Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order_Payments" (
    "id" SERIAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "paymentDate" TIMESTAMP NOT NULL,
    "paymentMethod" "public"."PaymentMethod" NOT NULL,
    "paymentDescription" VARCHAR(30) NOT NULL,
    "boletoId" TEXT,
    "referenceId" TEXT,
    "emv" TEXT,
    "txid" TEXT,
    "paymentExpired" BOOLEAN NOT NULL DEFAULT false,
    "paymentExpirationDate" TIMESTAMP NOT NULL,

    CONSTRAINT "Order_Payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "public"."User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product_Image" ADD CONSTRAINT "Product_Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order_Product" ADD CONSTRAINT "Order_Product_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order_Payments" ADD CONSTRAINT "Order_Payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
