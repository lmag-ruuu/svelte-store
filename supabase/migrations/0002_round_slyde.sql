ALTER TABLE "Product" ADD COLUMN "supplier_id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "Supplier" ADD COLUMN "password" varchar NOT NULL;