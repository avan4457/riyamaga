CREATE TYPE "public"."membership_role" AS ENUM('owner', 'admin', 'dispatcher', 'driver');--> statement-breakpoint
CREATE TYPE "public"."membership_status" AS ENUM('active', 'invited', 'suspended');--> statement-breakpoint
ALTER TABLE "memberships" ALTER COLUMN "role" SET DEFAULT 'dispatcher'::"public"."membership_role";--> statement-breakpoint
ALTER TABLE "memberships" ALTER COLUMN "role" SET DATA TYPE "public"."membership_role" USING "role"::"public"."membership_role";--> statement-breakpoint
ALTER TABLE "memberships" ALTER COLUMN "status" SET DEFAULT 'active'::"public"."membership_status";--> statement-breakpoint
ALTER TABLE "memberships" ALTER COLUMN "status" SET DATA TYPE "public"."membership_status" USING "status"::"public"."membership_status";