-- AlterTable
ALTER TABLE "public"."products" ADD COLUMN     "maxInstallment" VARCHAR(30);

-- CreateTable
CREATE TABLE "public"."offers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "referenceBanner" TEXT NOT NULL,
    "startsAt" TIMESTAMP NOT NULL,
    "endsAt" TIMESTAMP NOT NULL,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."offer_products" (
    "hashCode" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "offerId" INTEGER NOT NULL,
    "price" MONEY NOT NULL,
    "priceWithDiscount" MONEY NOT NULL,
    "discountPercentage" SMALLINT NOT NULL,
    "quantityAvailable" SMALLINT NOT NULL,

    CONSTRAINT "offer_products_pkey" PRIMARY KEY ("hashCode")
);

-- AddForeignKey
ALTER TABLE "public"."offer_products" ADD CONSTRAINT "offer_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."offer_products" ADD CONSTRAINT "offer_products_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "public"."offers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
