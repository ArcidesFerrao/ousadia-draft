-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_productSizeId_fkey";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productSizeId_fkey" FOREIGN KEY ("productSizeId") REFERENCES "ProductSize"("id") ON DELETE CASCADE ON UPDATE CASCADE;
