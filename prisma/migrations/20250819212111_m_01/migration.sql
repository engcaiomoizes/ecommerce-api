-- CreateTable
CREATE TABLE "public"."Clientes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "dataNascimento" VARCHAR(10) NOT NULL,
    "telefone" VARCHAR(15) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("id")
);
