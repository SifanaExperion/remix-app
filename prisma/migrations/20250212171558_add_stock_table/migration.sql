-- CreateTable
CREATE TABLE "ProductStock" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shopifyProductId" TEXT NOT NULL,
    "shopifyVariantId" TEXT NOT NULL,
    "sku" TEXT,
    "inventoryItemId" TEXT,
    "availableStock" INTEGER NOT NULL,
    "locationId" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductStock_shopifyProductId_key" ON "ProductStock"("shopifyProductId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductStock_shopifyVariantId_key" ON "ProductStock"("shopifyVariantId");
