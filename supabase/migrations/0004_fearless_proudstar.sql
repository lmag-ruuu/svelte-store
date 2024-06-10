ALTER TABLE "Orders" ADD COLUMN "postal_code" text NOT NULL;--> statement-breakpoint
ALTER TABLE "Orders" ADD COLUMN "city" text NOT NULL;--> statement-breakpoint
ALTER TABLE "Orders" ADD COLUMN "country" text NOT NULL;--> statement-breakpoint
ALTER TABLE "Orders" ADD COLUMN "state" text NOT NULL;--> statement-breakpoint
ALTER TABLE "Orders" ADD COLUMN "status" text DEFAULT 'pending' NOT NULL;