-- CreateEnum
CREATE TYPE "ApiKeyEnvironment" AS ENUM ('DEV', 'PROD');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'failed', 'success');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('momo');

-- CreateEnum
CREATE TYPE "PaymentOperator" AS ENUM ('mtn', 'airteltigo', 'vodafone');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" VARCHAR(100) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "key" VARCHAR(32) NOT NULL,
    "env" "ApiKeyEnvironment" NOT NULL,
    "expired" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "apiKeyId" UUID,
    "status" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "ref" VARCHAR(16) NOT NULL,
    "externalRef" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "operator" "PaymentOperator" NOT NULL,
    "account" VARCHAR(30) NOT NULL,
    "reversed" TIMESTAMP(3),
    "request" JSONB,
    "response" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_key_key" ON "ApiKey"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_ref_key" ON "Payment"("ref");

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
