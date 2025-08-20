/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order_Payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order_Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product_Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_parentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order_Payments" DROP CONSTRAINT "Order_Payments_orderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order_Product" DROP CONSTRAINT "Order_Product_orderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Product_Image" DROP CONSTRAINT "Product_Image_productId_fkey";

-- DropTable
DROP TABLE "public"."Address";

-- DropTable
DROP TABLE "public"."Category";

-- DropTable
DROP TABLE "public"."Order";

-- DropTable
DROP TABLE "public"."Order_Payments";

-- DropTable
DROP TABLE "public"."Order_Product";

-- DropTable
DROP TABLE "public"."Product";

-- DropTable
DROP TABLE "public"."Product_Image";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."users" (
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

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."addresses" (
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

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."products" (
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

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categories" (
    "id" SERIAL NOT NULL,
    "parentId" INTEGER,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."product_images" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "size" "public"."Size" NOT NULL,
    "url" TEXT NOT NULL,
    "position" SMALLINT NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."orders" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP NOT NULL,
    "status" SMALLINT NOT NULL,
    "statusDescription" VARCHAR(30) NOT NULL,
    "totalValue" DECIMAL(65,30) NOT NULL,
    "deliveryTime" TIMESTAMP NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."order_products" (
    "id" SERIAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "quantity" SMALLINT NOT NULL DEFAULT 1,

    CONSTRAINT "order_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."order_payments" (
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

    CONSTRAINT "order_payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "public"."users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."addresses" ADD CONSTRAINT "addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."categories" ADD CONSTRAINT "categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product_images" ADD CONSTRAINT "product_images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_products" ADD CONSTRAINT "order_products_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_payments" ADD CONSTRAINT "order_payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
