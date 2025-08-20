-- CreateTable
CREATE TABLE "public"."Enderecos" (
    "id" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "cep" VARCHAR(10) NOT NULL,
    "logradouro" VARCHAR(100) NOT NULL,
    "numero" VARCHAR(10),
    "complemento" VARCHAR(50),
    "bairro" VARCHAR(50) NOT NULL,
    "cidade" VARCHAR(60) NOT NULL,
    "uf" CHAR(2) NOT NULL,
    "identificacao" VARCHAR(20) NOT NULL,

    CONSTRAINT "Enderecos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Produtos" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "friendlyName" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" MONEY NOT NULL,
    "priceWithDiscount" MONEY,
    "oldPrice" MONEY,
    "discountPercentage" SMALLINT,

    CONSTRAINT "Produtos_pkey" PRIMARY KEY ("id")
);
