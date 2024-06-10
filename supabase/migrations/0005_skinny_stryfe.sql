ALTER TABLE "Orders" ADD COLUMN "supplier_id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "Order_Product" DROP COLUMN IF EXISTS "quantity";