ALTER TABLE "Product" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Product" ADD COLUMN "image_url" varchar;